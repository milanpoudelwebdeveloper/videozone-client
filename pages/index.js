import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import Card from "../components/Card";
import ParentWrapper from "../components/ParentWrapper";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Home = ({ setDarkMode, darkMode }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/videos")
      .then((res) => setVideos((prev) => [...prev, ...res?.data?.videos]));
  }, []);
  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode}>
      <Container>
        {videos?.map((video) => (
          <Card video={video} key={video?.id} />
        ))}
      </Container>
    </ParentWrapper>
  );
};

export default Home;
