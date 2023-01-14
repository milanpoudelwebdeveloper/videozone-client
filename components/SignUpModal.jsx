import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../axiosConfig";
import { useForm } from "react-hook-form";
import ErrorText from "./ErrorText";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "max-content",
    backgroundColor: "transparent",
  },
};

Modal.setAppElement("#modals");

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignUpModal = ({ modalIsOpen, closeModal }) => {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signUp = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res?.data?.message);
    } catch (e) {
      console.log("Somethign went wrong while registering", e);
      setServerError(e?.response?.data?.message);
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName="overlay"
      className="modal"
    >
      <Container>
        <Wrapper>
          <Title>Sign in</Title>
          <SubTitle>to continue to LamaTube</SubTitle>
          <Input
            placeholder="username"
            {...register("name", {
              required: "Username is required",
            })}
          />
          <Input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Button>Sign in</Button>
          <Title>or</Title>
          <Input
            placeholder="username"
            {...register("name", {
              required: "Username is required",
            })}
          />
          {errors.name && <ErrorText error={errors.name.message} />}
          <Input
            placeholder="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <ErrorText error={errors.email.message} />}
          <Input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <ErrorText error={errors.password.message} />}
          {serverError && <ErrorText error={serverError} />}
          <Button onClick={handleSubmit(signUp)}>Sign up</Button>
        </Wrapper>
        <More>
          English(USA)
          <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
          </Links>
        </More>
      </Container>
    </Modal>
  );
};

export default SignUpModal;
