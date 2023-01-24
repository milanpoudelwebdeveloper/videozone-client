import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ParentWrapper from "../components/ParentWrapper";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import millify from "millify";
import { axiosInstance } from "../axiosConfig";
import Link from "next/link";

const Container = styled.div`
  max-width: 1000px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Heading = styled.h2`
  font-size: 20px;
  margin-bottom: 60px;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelImage = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
`;

const ChannelName = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SubscribeButton = styled.button`
  border: none;
`;

const Subscribe = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CountsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Dot = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;
const subscriptions1 = [
  {
    id: 1,
    channelname: "Channel 1",
    channelimage: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    subscribers: 1000,
    videoscount: 100,
  },
  {
    id: 2,
    channelname: "Channel 1",
    channelimage: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    subscribers: 1000,
    videoscount: 100,
  },
  {
    id: 3,
    channelname: "Channel 1",
    channelimage: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    subscribers: 1000,
    videoscount: 100,
  },
  {
    id: 4,
    channelname: "Channel 1",
    channelimage: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    subscribers: 1000,
    videoscount: 100,
  },
];

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/users/subscriptions")
      .then((res) => setSubscriptions(res?.data?.subscriptions));
  }, []);

  return (
    <ParentWrapper>
      <Heading> Your Subscriptions</Heading>
      <Container>
        {subscriptions?.map((sub) => (
          <Wrapper>
            <Link href={`/channel/${sub.channelid}`}>
              <ChannelImage src={sub.channelimage} alt="" />
            </Link>
            <InfoWrapper>
              <Link href={`/channel/${sub.channelid}`}>
                <ChannelName>{sub.channelname}</ChannelName>
              </Link>
              <p>{sub.description}</p>
              <CountsWrapper>
                <p>{millify(sub?.subscriberscount)} subscribers</p>

                <Dot>.</Dot>
                <p>{sub?.videoscount} videos</p>
              </CountsWrapper>
            </InfoWrapper>
            <Subscribe>
              <NotificationsNoneIcon />
              <SubscribeButton>Subscribed</SubscribeButton>
            </Subscribe>
          </Wrapper>
        ))}
      </Container>
    </ParentWrapper>
  );
};

export default Subscriptions;
