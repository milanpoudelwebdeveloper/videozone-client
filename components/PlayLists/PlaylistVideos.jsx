import React from "react";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  max-height: 400px;
  min-height: 200px;
  overflow: scroll;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px 0px;
  margin-bottom: 40px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const PlayListTitle = styled.h2``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
`;
const IndexNumber = styled.span``;

const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#9DCCC0" : "white")};
  cursor: pointer;
  margin: 10px 0px;
`;

const VideoTitle = styled.p``;

const VideoThumbnail = styled.img`
  width: 100px;
  height: 50px;
  border-radius: 10px;
`;

const PlaylistVideos = ({ videos, selectedVideoId, setSelectedVideoId }) => {
  const [show, setShow] = useState(true);
  return (
    <Container show={show}>
      <TitleWrapper>
        <PlayListTitle>Milan Poudel</PlayListTitle>
        <CloseIcon onClick={() => setShow((prev) => !prev)} />
      </TitleWrapper>
      {videos?.map((video, index) => (
        <VideoWrapper
          key={video?.id}
          isSelected={selectedVideoId === video?.id}
          onClick={() => setSelectedVideoId(video?.id)}
        >
          <IconWrapper>
            {selectedVideoId === video?.id ? (
              <PlayArrowIcon />
            ) : (
              <IndexNumber>{index + 1}</IndexNumber>
            )}
          </IconWrapper>
          <VideoThumbnail src={video?.thumbnail} />
          <VideoTitle>{video?.title}</VideoTitle>
        </VideoWrapper>
      ))}
    </Container>
  );
};

export default PlaylistVideos;
