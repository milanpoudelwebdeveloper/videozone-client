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

const ChannelPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`/playlists/${id}`)
      .then((res) => setPlaylists(res?.data?.playlists))
      .catch((e) => {
        console.log("Something went wrong while getting playlists", e);
      });
  }, [id]);

  return (
    <Container>
      {playlists?.map((playlist) => (
        <PlayListCard key={playlist?.id} playlist={playlist} />
      ))}
    </Container>
  );
};

export default ChannelPlaylist;
