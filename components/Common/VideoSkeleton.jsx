import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: center;
  justify-content: center;
`;

const Card = styled.div`
  height: 310px;
  width: 442px;
  background-color: red;
  transform: translate(1%, 9%);
  top: 20%;
  padding: 20px 30px;
  display: inline-block;
  flex-direction: column;
`;

const H1 = styled.h2`
  width: 69%;
  height: 20px;
  float: right;
  margin-right: 55px;
`;

const H2 = styled.h2`
  width: 379px;
  height: 200px;
  justify-content: center;
  text-align: center;
  margin-bottom: 15px;
`;

const Box = styled.div``;

const ThumbNail = styled.div`
  position: relative;
  float: left;
  height: 16%;
  width: 12%;
  border-radius: 50%;
`;

const Paragraph = styled.p`
  width: 59%;
  height: 19px;
  margin-left: 63px;
  margin-top: 50px;
`;
export const VideoSkeleton = () => {
  return (
    <Container>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <Card key={i}>
          <H2 />
          <Box />
          <ThumbNail />
          <H1 />
          <Paragraph />
        </Card>
      ))}
    </Container>
  );
};

export default VideoSkeleton;
