import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import Card from "../Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
`;
const ChannelVideos = () => {
  const [videos, setVideos] = useState([]);
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      getChannelVideos(id);
    }
  }, [id]);

  const getChannelVideos = async () => {
    try {
      const res = await axiosInstance.get(`/videos/channel/${id}`);
      setVideos(res?.data?.videos);
    } catch (e) {
      console.log("Something went wrong while getting channel videos", e);
    }
  };

  return (
    <Container>
      {videos?.map((video) => (
        <Card video={video} />
      ))}
    </Container>
  );
};

export default ChannelVideos;
