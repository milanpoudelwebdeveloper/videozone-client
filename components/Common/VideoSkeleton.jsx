import React from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => props.direction};
  gap: 80px;
`;

const Skeleton = styled.div`
  width: 350px;
  height: 270px;
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 400% 400%;
  animation: loading 1.2s ease-in-out infinite;

  @keyframes loading {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: -135% 50%;
    }
  }
`;

export const VideoSkeleton = ({ direction = "row" }) => {
  const skeletons = Array(10).fill(0);
  return (
    <SkeletonContainer direction={direction}>
      {skeletons.map((_, index) => (
        <Skeleton key={index} />
      ))}
    </SkeletonContainer>
  );
};

export default VideoSkeleton;
