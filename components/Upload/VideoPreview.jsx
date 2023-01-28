import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 350px;
  padding: 10px;
`;

const PlaceHolderBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`;

const Text = styled.div`
  font-size: 14px;
`;

const VideoPreview = ({ videoPreview }) => {
  console.log("file name is", videoPreview);
  return (
    <Container>
      {videoPreview ? (
        <video
          src={videoPreview}
          controls
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <PlaceHolderBox>
          <Text>Your video preview will appear hear after upload</Text>
        </PlaceHolderBox>
      )}
    </Container>
  );
};

export default VideoPreview;
