import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { axiosInstance } from "../axiosConfig";
import ErrorText from "./ErrorText";

import { toast } from "react-toastify";

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

const SignUp = ({ setLogIn }) => {
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setServerError("");
    }, 3000);
    return () => clearTimeout(timeId);
  }, [serverError]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res?.data?.message);
      reset();
    } catch (e) {
      console.log("Something went wrong while registering", e);
      setServerError(e?.response?.data?.message);
    }
  };
  return (
    <>
      <Title>Sign Up</Title>
      <SubTitle>to continue to LamaTube</SubTitle>
      <Input
        placeholder="Name"
        {...register("name", {
          required: "Name is required",
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

      <Text>Already have an account?</Text>
      <Text1 onClick={setLogIn}>Log In</Text1>
    </>
  );
};

export default SignUp;
