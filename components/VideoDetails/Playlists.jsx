import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import { toast } from "react-toastify";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import AddIcon from "@mui/icons-material/Add";
import CreatePlaylist from "../PlayLists/CreatePlaylist";
import styled from "styled-components";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    position: "relative",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "500px",
    backgroundColor: "transparent",
  },
};

const Container = styled.div`
  top: 20px;
  right: 0px;
  width: 350px;
  height: 100%;
  overflow: scroll;
  background: white;
  font-size: 16px;
  border-radius: 10px;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow: scroll;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputCheckBox = styled.input``;

const Label = styled.label``;

const Heading = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const CreateButton = styled.button`
  background: #f9f9f9;
  position: absolute;
  bottom: 0px;
  width: 100%;
  border: none;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Playlists = ({ isOpen, videoId, closeModal, thumbnail }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistsIds, setSelectedPlaylistsIds] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const userId = useSelector((state) => state?.userReducer?.user?.id);

  useEffect(() => {
    if (videoId) {
      getPlaylists();
      getPlaylistsOfaVideo(videoId);
    }
  }, [videoId]);

  const getPlaylists = async () => {
    try {
      const res = await axiosInstance.get(`/playlists/${userId}`);
      setPlaylists((prev) => [...prev, ...res.data.playlists]);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const getPlaylistsOfaVideo = async (videoId) => {
    try {
      const res = await axiosInstance.get(`/playlists/find/${videoId}`);
      let ids = res?.data?.playlists?.map((playlist) => playlist?.id);
      setSelectedPlaylistsIds(ids);
    } catch (e) {
      console.log("Something went wrong while getting videos playlists");
      toast.error(e.response.data.message);
    }
  };

  const addToPlaylist = async (
    playlistId,
    videoId,
    thumbnail = null,
    isNew = false,
    newPlaylist = null
  ) => {
    try {
      const res = await axiosInstance.put(`/playlists/${playlistId}`, {
        videoId,
        thumbnail,
      });
      isNew && setPlaylists((prev) => [...prev, newPlaylist]);
      toast.success(res.data.message);
      setSelectedPlaylistsIds((prev) => [...prev, playlistId]);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const removeFromPlaylist = async (playlistId) => {
    try {
      const res = await axiosInstance.delete(`/playlists/${playlistId}`, {
        data: { videoId },
      });
      toast.success(res.data.message);
      setSelectedPlaylistsIds((prev) => prev.filter((id) => id !== playlistId));
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="overlay"
      className="modal"
      style={customStyles}
    >
      <Container>
        <Wrapper>
          <Heading>Save to...</Heading>
          {playlists?.map((playlist) => (
            <PlaylistWrapper key={playlist?.id}>
              <NameWrapper>
                <InputCheckBox
                  type="checkbox"
                  id={playlist?.id}
                  value={playlist?.id}
                  onChange={() => {
                    if (selectedPlaylistsIds.includes(playlist?.id)) {
                      removeFromPlaylist(playlist?.id);
                    } else {
                      addToPlaylist(playlist?.id, videoId, thumbnail);
                    }
                  }}
                  checked={selectedPlaylistsIds?.includes(playlist?.id)}
                />
                <Label htmlFor={playlist?.id}>{playlist?.title}</Label>
              </NameWrapper>
              {playlist?.private ? <LockIcon /> : <PublicIcon />}
            </PlaylistWrapper>
          ))}
        </Wrapper>
        <CreateButton onClick={() => setModalIsOpen(true)}>
          <AddIcon />
          Create new
        </CreateButton>
        {modalIsOpen && (
          <CreatePlaylist
            modalIsOpen={modalIsOpen}
            closeModal={() => setModalIsOpen(false)}
            addToPlaylist={addToPlaylist}
            videoId={videoId}
            thumbnail={thumbnail}
          />
        )}
      </Container>
    </Modal>
  );
};

export default Playlists;
