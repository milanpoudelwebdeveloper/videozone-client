import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ParentWrapper from "../../components/ParentWrapper";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../../components/Comments";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axiosConfig";
import moment from "moment";
import { useSelector } from "react-redux";
import Link from "next/link";
import Playlists from "../../components/VideoDetails/Playlists";
import PlaylistVideos from "../../components/PlayLists/PlaylistVideos";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const Recommendation = styled.div`
  flex: 3;
`;

const VideoWrapper = styled.div`
  transition: all 0.5s ease;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const SideWrapper = styled.div`
  padding: 0px 50px;
`;

const Playlist = ({ setDarkMode, darkMode }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDisLikes] = useState(0);
  const [likedByMe, setLikedByMe] = useState(undefined);
  const [subscribed, setSubscribed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      getPlaylistVideos(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedVideoId) {
      getVideoDetails(selectedVideoId);
    }
  }, [selectedVideoId]);

  const getPlaylistVideos = async (playlistId) => {
    try {
      const res = await axiosInstance.get(`/playlists/videos/${playlistId}`);
      setPlaylistVideos(res?.data?.videos);
      setSelectedVideoId(res?.data?.videos[0]?.videoid);
    } catch (e) {
      console.log("Something went wrong while getting playlist videos", e);
      toast.error("Something went wrong while getting playlist videos");
    }
  };

  const getVideoDetails = async (id) => {
    try {
      const res = await axiosInstance.get("/videos/find/" + id);
      setVideoDetails(res?.data?.video);
      setLikes(Number(res?.data?.video?.likedcount));
      setDisLikes(Number(res?.data?.video?.dislikecount));
      setLikedByMe(res?.data?.video?.likedbyme);
      setSubscribed(res?.data?.video?.subscribedbyme);
      setRecommendations(res?.data?.recommendations);
    } catch (e) {
      console.log("Something went wrong while getting video details", e);
      toast.error("Something went wrong while getting video details");
    }
  };

  const handleLike = async (id) => {
    if (!isLoggedIn) {
      toast.error("You need to login to like a video");
      return;
    }
    if (likedByMe) {
      toast.success("You have already liked this video");
      return;
    }

    try {
      await axiosInstance.put(`/videos/like/${id}`);
      setLikes((prev) => prev + 1);
      if (likedByMe === false) {
        setDisLikes((prev) => prev - 1);
      }
      setLikedByMe(true);
      toast.success("Liked video successfully");
    } catch (e) {
      console.log("Something went wrong while liking video", e);
      toast.error(e.response.data.message);
    }
  };

  const handleDisLike = async (id) => {
    if (!isLoggedIn) {
      toast.error("You need to login to dislike a video");
      return;
    }
    if (likedByMe === false) {
      toast.success("You have already disliked this video");
      return;
    }
    try {
      await axiosInstance.put(`/videos/dislike/${id}`);
      if (likedByMe) {
        setLikes((prev) => prev - 1);
      }
      setDisLikes((prev) => prev + 1);
      setLikedByMe(false);
      toast.success("Disliked video successfully");
    } catch (e) {
      console.log("Something went wrong while disliking video", e);
      toast.error(e.response.data.message);
    }
  };

  const subscribeHandler = async () => {
    const path = `users/subscribe/${videoDetails?.channelid}`;
    try {
      if (subscribed) {
        await axiosInstance.delete(path);
        setSubscribed(false);
      } else {
        await axiosInstance.post(path);
        setSubscribed(true);
      }
    } catch (e) {
      console.log("Something went wrong while performing the action", e);
      toast.error(e.response.data.message);
    }
  };

  const fallBackSrc =
    "https://img.freepik.com/free-photo/beautiful-flowers-bouquet-with-copy-space_23-2149053793.jpg?w=2000";

  const nextHandler = () => {
    const index = playlistVideos.findIndex(
      (video) => video.videoid === selectedVideoId
    );
    if (index < playlistVideos.length - 1) {
      setSelectedVideoId(playlistVideos[index + 1].videoid);
    }
  };
  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode} padding="30px">
      <Container>
        <Content>
          <VideoWrapper>
            <VideoFrame
              src={videoDetails?.videourl}
              controls
              muted={false}
              onEnded={nextHandler}
            />
          </VideoWrapper>
          <Title>{videoDetails?.title}</Title>
          <Details>
            <Info>
              {videoDetails?.videoviews} views •{" "}
              {moment(videoDetails?.createdat).fromNow()}
            </Info>
            <Buttons>
              <Button onClick={() => handleLike(videoDetails?.id)}>
                <ThumbUpOutlinedIcon
                  style={{ color: likedByMe ? "red" : "black" }}
                />
                {likes}
              </Button>
              <Button onClick={() => handleDisLike(videoDetails?.id)}>
                <ThumbDownOffAltOutlinedIcon
                  style={{ color: likedByMe === false ? "red" : "black" }}
                />
                {dislikes}
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <div style={{ position: "relative" }}>
                <Button onClick={() => setModalIsOpen(true)}>
                  <AddTaskOutlinedIcon /> Save
                </Button>
                {modalIsOpen && (
                  <Playlists
                    videoId={videoDetails?.id}
                    thumbnail={videoDetails?.thumbnail}
                    isOpen={modalIsOpen}
                    closeModal={() => setModalIsOpen(false)}
                  />
                )}
              </div>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image
                src={
                  videoDetails?.channelimage
                    ? videoDetails?.channelimage
                    : fallBackSrc
                }
                alt="channel-image"
              />
              <ChannelDetail>
                <Link href={`/channel/${videoDetails?.channelid}`}>
                  <ChannelName>{videoDetails?.channelname}</ChannelName>
                </Link>
                <ChannelCounter>{videoDetails?.subscribecount}</ChannelCounter>
                <Description>{videoDetails?.descp}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={subscribeHandler}>
              {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
            </Subscribe>
          </Channel>
          <Hr />
          <Comments videoId={id} />
        </Content>
        <SideWrapper>
          <PlaylistVideos
            videos={playlistVideos}
            selectedVideoId={selectedVideoId}
            setSelectedVideoId={setSelectedVideoId}
          />
          <Recommendation>
            {recommendations?.map((item) => (
              <Card key={item.id} type="sm" video={item} />
            ))}
          </Recommendation>
        </SideWrapper>
      </Container>
    </ParentWrapper>
  );
};

export default Playlist;
