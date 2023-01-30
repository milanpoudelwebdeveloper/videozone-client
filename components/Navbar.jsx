import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Avatar } from "@mui/material";
import SignUpModal from "./SignUpModal";
import { useRouter } from "next/router";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.form`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Navbar = () => {
  const [signIn, setSignIn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?keyword=${keyword}`);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Search onSubmit={searchHandler}>
          <Input
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <SearchOutlinedIcon />
        </Search>
        {user ? (
          <User>
            <Link href="/upload" target="_blank">
              <VideoCallOutlinedIcon />
            </Link>
            <Avatar src={user?.img} />
            {user?.name}
          </User>
        ) : (
          <Button onClick={() => setSignIn(true)}>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        )}
      </Wrapper>

      <SignUpModal modalIsOpen={signIn} closeModal={() => setSignIn(false)} />
    </Container>
  );
};

export default Navbar;
