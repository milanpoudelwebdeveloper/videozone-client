import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import Card from "../Card";
import VideoSkeleton from "../Common/VideoSkeleton";

import styled from "styled-components";
import { useSelector } from "react-redux";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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

const LikedVideos = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userReducer?.user);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/videos/likedVideos/${user?.id}`)
      .then((res) => {
        setResults(res.data?.likedVideos);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Something went wrong while liking the video", e);
        setLoading(false);
      });
  }, [user]);
  return (
    <Container>
      {loading && <VideoSkeleton />}
      {results?.length < 1 && (
        <NoVidesFound>
          No videos found. Please like some videos to see them here.
        </NoVidesFound>
      )}
      {results?.length > 0 &&
        results?.map((video) => <Card video={video} key={video?.id} />)}
    </Container>
  );
};

export default LikedVideos;
