import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosConfig";
import { toast } from "react-toastify";

const Playlists = ({ isOpen, videoId }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = async () => {
    try {
      const res = await axiosInstance.get("/users/playlists");
      setPlaylists(res?.data?.playlists);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const addToPlaylist = async (playlistId) => {
    try {
      const res = await axiosInstance.put(`/users/playlists/${playlistId}`, {
        videoId,
      });
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        width: "200px",
        background: "white",
        padding: "20px",
      }}
    >
      {playlists.map((playlist) => (
        <div key={playlist}>
          <input
            type="checkbox"
            value={playlist?.id}
            onChange={(e) => addToPlaylist(e.target.value)}
          />
          <label>{playlist?.title}</label>
        </div>
      ))}
    </div>
  );
};

export default Playlists;
