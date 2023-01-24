import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorText from "../ErrorText";

import { axiosInstance } from "../../axiosConfig";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    position: "relative",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    height: "450px",
    backgroundColor: "transparent",
  },
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px;
  border-radius: 10px;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  text-transform: capitalize;
`;

const CreatePlaylist = ({
  modalIsOpen,
  closeModal,
  addToPlaylist = null,
  videoId = null,
  thumbnail = null,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const visibility = [
    {
      name: "public",
      value: false,
    },
    {
      name: "private",
      value: true,
    },
  ];
  const createPlayList = async (data) => {
    try {
      const res = await axiosInstance.post("/playlists", data);
      toast.success(res?.data?.message);
      addToPlaylist &&
        addToPlaylist(
          res?.data?.playlist?.id,
          videoId,
          thumbnail,
          true,
          res?.data?.playlist
        );
      reset();
      closeModal();
    } catch (e) {
      console.log("Something went wrong while creating playlist", e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
      className="modal"
      style={customStyles}
    >
      <Wrapper>
        <Close onClick={closeModal}>X</Close>
        <Title>Create your playlist</Title>
        <Input
          type="text"
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors.title && <ErrorText error={errors.title.message} />}

        <Label>Category</Label>
        <Select {...register("privacy", { required: "Privacy is required" })}>
          <option value="">Select visibility</option>
          {visibility?.map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
        {errors.visibility && <ErrorText error={errors.visibility.message} />}
        <Button onClick={handleSubmit(createPlayList)}>Create</Button>
      </Wrapper>
    </Modal>
  );
};

export default CreatePlaylist;
