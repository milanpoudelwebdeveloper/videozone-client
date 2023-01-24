import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import { toast } from "react-toastify";

const ChannelPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axiosInstance.get("");
  }, []);
  return <div>ChannelPlaylist</div>;
};

export default ChannelPlaylist;
