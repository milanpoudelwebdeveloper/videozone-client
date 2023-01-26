import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import PlayListCard from "../PlayLists/PlayListCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChannelPlaylist = ({ channelId }) => {
  const [playlists, setPlaylists] = useState([]);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id || channelId) {
      axiosInstance
        .get(`/playlists/${id || channelId}`)
        .then((res) => setPlaylists(res?.data?.playlists))
        .catch((e) => {
          console.log("Something went wrong while getting playlists", e);
        });
    }
  }, [id || channelId]);

  return (
    <Container>
      {playlists?.map((playlist) => (
        <PlayListCard key={playlist?.id} playlist={playlist} />
      ))}
    </Container>
  );
};

export default ChannelPlaylist;
