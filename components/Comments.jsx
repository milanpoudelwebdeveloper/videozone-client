import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../axiosConfig";
import Comment from "./Comment";
import { toast } from "react-toastify";

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
const Comments = ({ videoId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (videoId) {
      axiosInstance
        .get(`/comments/${videoId}`)
        .then((res) => setComments(res?.data?.comments))
        .catch((e) => {
          console.log("Something went wrong while getting comments", e);
          toast.error("Something went wrong while getting comments");
        });
    }
  }, [videoId]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!newComment) {
      return toast.error("Comment cannot be empty");
    }
    try {
      const response = await axiosInstance.post(`/comments/${videoId}`, {
        comment: newComment,
      });
      setComments((prev) => [response?.data?.newComment, ...prev]);
      setNewComment("");
    } catch (e) {
      console.log("Something went wrong while posting comment", e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <Container>
      <form onSubmit={postComment}>
        <NewComment>
          <Avatar src="https://i.ytimg.com/vi/2g811Eo7K8U/maxresdefault.jpg" />
          <Input
            placeholder="Add Comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </NewComment>
      </form>
      {comments?.map((comment) => (
        <Comment comment={comment} key={comment?.id} />
      ))}
    </Container>
  );
};

export default Comments;
