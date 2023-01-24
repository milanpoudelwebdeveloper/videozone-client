import Link from "next/link";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 18%;
  height: 150px;
  border-radius: 10px;
  position: relative;
`;

const PlayListImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const PlayListCard = ({ playlist }) => {
  return (
    <Container>
      <Link href={`/playlist/${playlist?.id}`}>
        <PlayListImage src={playlist?.thumbnail} />
        <div
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
            width: "100px",
            background: "#221E1E",
            opacity: "0.5",
            right: 0,
            zIndex: 100,
            color: "white",
          }}
        >
          <h1>3</h1>
          <h2>See</h2>
        </div>
      </Link>
    </Container>
  );
};

export default PlayListCard;
