import React, { useState } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import Link from "next/link";
import SignUpModal from "./SignUpModal";
import { logout } from "../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../axiosConfig";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  overflow: auto;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.div`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ setDarkMode, darkMode }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const authHandler = async () => {
    if (user) {
      await axiosInstance.get("/auth/logout");
      dispatch(logout());
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Link href="/">
            <Logo>
              <Img src="/images/logo.png" alt="logo" />
              VideoZone
            </Logo>
          </Link>
          <Link href="/">
            <Item>
              <HomeIcon />
              Home
            </Item>
          </Link>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
          <Link href="/subscriptions">
            <Item>
              <SubscriptionsOutlinedIcon />
              Subscriptions
            </Item>
          </Link>
          <Hr />
          <Link href="/library">
            <Item>
              <VideoLibraryOutlinedIcon />
              Library
            </Item>
          </Link>
          <Link href="/history">
            <Item>
              <HistoryOutlinedIcon />
              History
            </Item>
          </Link>
          <Hr />
          <Login>
            Sign in to like videos, comment, and subscribe.
            <Button onClick={authHandler}>
              <AccountCircleOutlinedIcon />
              {user ? "SIGN OUT" : "SIGN IN"}
            </Button>
          </Login>
          <Hr />
          <Title>BEST OF VIDEOZONE</Title>
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
          <Item>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
          <Item>
            <MovieOutlinedIcon />
            Movies
          </Item>
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
          <Item>
            <LiveTvOutlinedIcon />
            Live
          </Item>
          <Hr />
          <Item>
            <SettingsOutlinedIcon />
            Settings
          </Item>
          <Item>
            <FlagOutlinedIcon />
            Report
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
          <Item onClick={() => setDarkMode((prev) => !prev)}>
            <SettingsBrightnessOutlinedIcon />
            {darkMode ? "Light " : "Dark "} Mode
          </Item>
        </Wrapper>
      </Container>
      <SignUpModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default Menu;
