import React from "react";
import ChannelAbout from "./ChannelAbout";
import ChannelPlaylist from "./ChannelPlaylist";
import ChannelVideos from "./ChannelVideos";

const TabContent = ({ menu }) => {
  const menus = ["Videos", "Playlists", "About"];
  const content = [<ChannelVideos />, <ChannelPlaylist />, <ChannelAbout />];
  return <div>{content[menus.indexOf(menu)]}</div>;
};

export default TabContent;
