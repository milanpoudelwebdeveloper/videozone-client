import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { axiosInstance } from "../axiosConfig";
import ErrorText from "../components/ErrorText";
import { uploadFile } from "../components/FirebaseUpload";
import { categories } from "../constants/category";
import ParentWrapper from "../components/ParentWrapper";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import VideoPreview from "../components/Upload/VideoPreview";
import ThumbnailsPreview from "../components/Upload/ThumbnailsPreview";
import UploadingModal from "../components/Upload/UploadingModal";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 55%;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  width: 100%;
  height: max-content;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const FileUploadLabel = styled.label`
  padding: 0.5rem;
  font-weight: 500;
  border-radius: 0.3rem;
  cursor: pointer;

  width: max-content;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
`;

const VideoPreviewWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const UploadingText = styled.div`
  font-size: 12px;
`;

const UploadVideoModal = () => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [submitting, setSumbitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (video) {
      uploadFile("video", video, setVideoPercentage).then((videoUrl) => {
        setVideoUrl(videoUrl);
      });
    }
  }, [video]);

  useEffect(() => {
    if (video && videoPercentage === 100) {
      generateVideoThumbnails(video, 10)
        .then((res) => {
          setThumbnails(res);
        })
        .catch(() =>
          toast.error("Something went wrong while generating thumbnails")
        );
      setVideoPreview(URL.createObjectURL(video));
    }
  }, [video, videoPercentage]);

  const uploadVideo = async (data) => {
    let thumbnail = "";
    if (!videoUrl) {
      toast.error("Please select a video file");
      return;
    }
    if (!thumbnailFile) {
      toast.error("Please select a thumbnail for the video");
      return;
    } else {
      setSumbitting(true);
      thumbnail = await uploadFile("image", thumbnailFile);
    }
    try {
      const res = await axiosInstance.post("/videos", {
        ...data,
        videoUrl,
        thumbnail,
      });
      reset();
      router.push(`/video/${res?.data?.video?.id}`);
      setSumbitting(false);
    } catch (e) {
      console.log("Something went wrong while uploading video", e);
      toast.error(e?.response?.data?.message);
      setSumbitting(false);
    }
  };

  return (
    <ParentWrapper>
      <Wrapper>
        <Box>
          <Title>Upload a New Video</Title>
          <VideoPreviewWrapper>
            <Input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && <ErrorText error={errors.title.message} />}
          </VideoPreviewWrapper>
          <Desc
            type="text"
            placeholder="Description"
            rows={8}
            {...register("descp", {
              required: "Description is required",
            })}
          />

          {errors.descp && <ErrorText error={errors.descp.message} />}

          <Label>Video File</Label>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            hidden
            id="videoUpload"
          />
          {videoPercentage > 0 && videoPercentage < 100 ? (
            <UploadingText>Uploading video {videoPercentage}%</UploadingText>
          ) : null}

          <FileUploadLabel htmlFor="videoUpload">
            {videoUrl ? "Change Video" : "Upload Video"}
          </FileUploadLabel>
          <Label>Category</Label>
          <Select
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          {errors.category && <ErrorText error={errors.category.message} />}
          <Label>Thumbnail</Label>
          {!thumbnails && (
            <Note>
              Note: We will give you 5 thumbnails which you can choose from
              after you upload video
            </Note>
          )}
          {thumbnails && (
            <ThumbnailsPreview
              thumbnails={thumbnails}
              setThumbnailFile={setThumbnailFile}
              selectedThumbnail={thumbnailFile}
            />
          )}
          <Button onClick={handleSubmit(uploadVideo)}>Upload</Button>
        </Box>
        <VideoPreview videoPreview={videoPreview} />
      </Wrapper>
      {submitting && <UploadingModal />}
    </ParentWrapper>
  );
};

export default UploadVideoModal;
