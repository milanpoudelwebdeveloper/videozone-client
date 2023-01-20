import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig";
import ErrorText from "./ErrorText";
import { getStorage, ref } from "firebase/storage";
import { uploadFile } from "./FirebaseUpload";
import { useRouter } from "next/router";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    position: "relative",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "600px",
    backgroundColor: "transparent",
  },
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
`;

const Title = styled.h1`
  text-align: center;
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
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
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

const UploadVideoModal = ({ modalIsOpen, closeModal }) => {
  const [video, setVideo] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPercentage, setThumbnailPercentage] = useState(0);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (video) {
      uploadVideoFile(video);
    }
  }, [video]);

  useEffect(() => {
    if (thumbnailFile) {
      uploadThumbnailFile(thumbnailFile);
    }
  }, [thumbnailFile]);

  const uploadVideoFile = (file) => {
    if (!file) return;
    uploadFile("video", file, setVideoPercentage, setVideoUrl);
  };

  const uploadThumbnailFile = () => {
    if (!thumbnailFile) return;
    uploadFile("image", thumbnailFile, setThumbnailPercentage, setThumbnail);
  };

  const uploadVideo = async (data) => {
    if (!videoUrl) {
      toast.error("Please select a video file");
      return;
    }
    if (!thumbnail) {
      toast.error("Please select a thumbnail for the video");
      return;
    }
    try {
      const res = await axiosInstance.post("/videos", {
        ...data,
        videoUrl,
        thumbnail,
      });
      toast.success(res?.data?.message);
      reset();
      closeModal();
      router.push(`/video/${res?.data?.video?.id}`);
    } catch (e) {
      console.log("Something went wrong while uploading video", e);
      toast.error(e?.response?.data?.message);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
      className="modal"
      style={customStyles}
    >
      <Wrapper>
        <Close onClick={closeModal}>X</Close>
        <Title>Upload a New Video</Title>
        <Input
          type="text"
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && <ErrorText error={errors.title.message} />}
        <Desc
          type="text"
          placeholder="Description"
          rows={8}
          {...register("descp", {
            required: "Description is required",
          })}
        />
        {errors.descp && <ErrorText error={errors.descp.message} />}
        <Input type="text" placeholder="Separate tags with commas" />
        <Label>Video File</Label>
        {videoPercentage > 0 ? (
          "Uploading:" + videoPercentage + "%"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Label>Thumbnail</Label>
        {thumbnailPercentage > 0 ? (
          "Uploading:" + thumbnailPercentage + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
          />
        )}
        <Button onClick={handleSubmit(uploadVideo)}>Upload</Button>
      </Wrapper>
    </Modal>
  );
};

export default UploadVideoModal;
