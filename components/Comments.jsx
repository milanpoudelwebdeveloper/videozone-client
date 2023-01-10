import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  outline: none;
  background-color: transparent;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://i.ytimg.com/vi/2g811Eo7K8U/maxresdefault.jpg" />
        <Input placeholder="Add Comment" />
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
