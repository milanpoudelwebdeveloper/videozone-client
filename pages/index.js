import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import Card from "../components/Card";
import ParentWrapper from "../components/ParentWrapper";
import styled from "styled-components";
import TopCategories from "../components/TopCategories";
import VideoSkeleton from "../components/Common/VideoSkeleton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NoVidesFound = styled.p`
  width: 100%;
  height: calc(100vh - 250px);
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ setDarkMode, darkMode }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    getVideos(category);
  }, [category]);

  const getVideos = async (category) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/videos/${category}`);
      setVideos(res?.data?.videos);
      setLoading(false);
    } catch (e) {
      console.log("Something went wrong while getting videos", e);
      setLoading(false);
    }
  };
  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode}>
      <Container>
        <TopCategories setCategory={setCategory} />
        <VideoWrapper>
          {loading && <VideoSkeleton />}
          {videos?.length < 1 && (
            <NoVidesFound>
              No videos found. Please try another filter or search{" "}
            </NoVidesFound>
          )}
          {videos?.map((video) => (
            <Card video={video} key={video?.id} />
          ))}
        </VideoWrapper>
      </Container>
    </ParentWrapper>
  );
};

export default Home;
