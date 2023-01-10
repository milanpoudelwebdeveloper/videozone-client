import React from "react";
import styled from "styled-components";
import ParentWrapper from "../components/ParentWrapper";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const Recommendation = styled.div`
  flex: 2;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = ({ setDarkMode, darkMode }) => {
  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode}>
      <Container>
        <Content>
          <VideoWrapper>
            <iframe
              width="100%"
              height="520"
              src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </VideoWrapper>
          <Title>Test Video</Title>
          <Details>
            <Info>1.2M views • 2 years ago</Info>
            <Buttons>
              <Button>
                <ThumbUpOutlinedIcon /> 123
              </Button>
              <Button>
                <ThumbDownOffAltOutlinedIcon /> Dislike
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                alt="channel-image"
              />
              <ChannelDetail>
                <ChannelName>Milan dev </ChannelName>
                <ChannelCounter>200K subscribers</ChannelCounter>
                <Description>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda cum qui nam accusamus! Debitis excepturi ea
                  asperiores quae, quidem quis.
                </Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe>SUBSCRIBE</Subscribe>
          </Channel>
          <Hr />
          <Comments />
        </Content>
        <Recommendation>Recommendation part</Recommendation>
      </Container>
    </ParentWrapper>
  );
};

export default Video;
