import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import { toast } from "react-toastify";
import ParentWrapper from "../components/ParentWrapper";
import Card from "../components/Card";
import styled from "styled-components";
import VideoSkeleton from "../components/Common/VideoSkeleton";
import ChannelPlaylist from "../components/Channels/ChannelPlaylist";
import { useSelector } from "react-redux";
import Link from "next/link";
import LikedVideos from "../components/Library/LikedVideos";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0px;
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

const Heading = styled.h4``;

const HeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 40px 0px;
`;

const SeeAllButton = styled.div`
  border: none;
  background: none;
  color: blue;
`;

const history = ({ setDarkMode, darkMode }) => {
  const [results, setResults] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/history/all`)
      .then((res) => {
        setResults(res.data?.history);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        setLoading(false);
      });
  }, []);

  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode}>
      <Container>
        <HeadingWrapper>
          <Heading>History</Heading>
          <Link href="/history">
            <SeeAllButton>See all</SeeAllButton>
          </Link>
        </HeadingWrapper>

        <VideoWrapper>
          {loading && <VideoSkeleton />}
          {results?.length < 1 && (
            <NoVidesFound>
              No videos found. Please try another filter or search
            </NoVidesFound>
          )}
          {results?.length > 0 &&
            results?.map((video) => <Card video={video} key={video?.id} />)}
        </VideoWrapper>
      </Container>
      <HeadingWrapper>
        <Heading>Your Playlists</Heading>
        <Link href="/channel/playlists">
          <SeeAllButton>See all</SeeAllButton>
        </Link>
      </HeadingWrapper>
      <ChannelPlaylist channelId={user?.id} />
      <HeadingWrapper>
        <Heading>Liked Videos</Heading>
        <Link href="/channel/playlists">
          <SeeAllButton>See all</SeeAllButton>
        </Link>
      </HeadingWrapper>
      <LikedVideos />
    </ParentWrapper>
  );
};

export default history;
