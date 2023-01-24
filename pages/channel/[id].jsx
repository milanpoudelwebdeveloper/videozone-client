import React, { useState } from "react";
import styled from "styled-components";
import ChannelAbout from "../../components/Channels/ChannelAbout";
import ChannelPlaylist from "../../components/Channels/ChannelPlaylist";
import ChannelVideos from "../../components/Channels/ChannelVideos";
import Tabs from "../../components/Channels/Tabs";

import ParentWrapper from "../../components/ParentWrapper";

const Container = styled.div`
  padding: 50px;
`;

const ChannelCover = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ChannelImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelName = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 5px;
`;

const ChannelDetails = () => {
  const [selectedMenu, setSelectedMenu] = useState("Videos");
  const menus = ["Videos", "Playlists", "About"];
  const content = [<ChannelVideos />, <ChannelPlaylist />, <ChannelAbout />];

  const channel = {
    id: 1,
    name: "Channel Name",
    image: "https://picsum.photos/200/300",
    cover: "https://picsum.photos/200/300",
    subscriberCount: 100,
    videosCount: 100,
  };

  return (
    <ParentWrapper padding="0px">
      <ChannelCover src={channel?.cover} />
      <Container>
        <ChannelInfo>
          <ChannelImage src={channel?.image} />
          <ChannelDetail>
            <ChannelName>{channel?.name}</ChannelName>
            <p>@Milan Poudel</p>
            <p>{channel?.subscriberCount} subscribers</p>
          </ChannelDetail>
        </ChannelInfo>
        <Tabs
          menus={menus}
          selectedMenu={selectedMenu}
          setSelectedMenu={(menu) => setSelectedMenu(menu)}
        />
        {content[menus.indexOf(selectedMenu)]}
      </Container>
    </ParentWrapper>
  );
};

export default ChannelDetails;
