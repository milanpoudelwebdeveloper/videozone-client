import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { axiosInstance } from "../axiosConfig";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slices/user";
import ErrorText from "./ErrorText";

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
  margin: 10px 0px;
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

const Text = styled.span`
  font-size: 14px;
`;

const Text1 = styled.span`
  font-size: 14px;
  color: #3ea6ff;
  cursor: pointer;
`;

const Login = ({ setSignUp, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    try {
      const res = await axiosInstance.post("auth/login", data);
      toast.success(res?.data?.message);
      dispatch(
        setLogin({
          token: res?.data?.accessToken,
          user: res?.data?.user,
        })
      );
      closeModal();
    } catch (e) {
      console.log("Something went wrong while loggin in", e);
      toast.error(e.response?.data?.message);
    }
  };

  return (
    <>
      <Title>Sign in</Title>
      <SubTitle>to continue to LamaTube</SubTitle>
      <Input
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
        })}
      />
      {errors?.email && <ErrorText error={errors?.email?.message} />}
      <Input
        type="password"
        placeholder="password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors?.password && <ErrorText error={errors?.password?.message} />}
      <Button onClick={handleSubmit(loginHandler)}>Sign in</Button>

      <Text>Don't have an account?</Text>
      <Text1 onClick={setSignUp}>Sign up</Text1>
    </>
  );
};

export default Login;
