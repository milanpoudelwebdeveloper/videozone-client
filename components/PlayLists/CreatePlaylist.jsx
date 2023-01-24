import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig";
import ErrorText from "./ErrorText";
import { categories } from "../constants/category";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    position: "relative",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "700px",
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
`;

const CreatePlaylist = ({ modalIsOpen, closeModal }) => {
  const createPlayList = async () => {
    try {
      const res = await axiosInstance.post("/playlist", data);
      toast.success(res?.data?.message);
      closeModal();
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        <Select
          {...register("visibility", { required: "Privacy is required" })}
        >
          <option value="">Select visibility</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
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
