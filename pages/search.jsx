import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import Card from "../components/Card";
import ParentWrapper from "../components/ParentWrapper";
import { toast } from "react-toastify";
import styled from "styled-components";
import VideoSkeleton from "../components/Common/VideoSkeleton";

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 60px;
`;

const Recommendation = styled.div`
  flex: 3;
`;

const search = ({ setDarkMode, darkMode }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const keyword = router.query.keyword;

  useEffect(() => {
    if (!keyword) return;
    setLoading(true);
    axiosInstance
      .get(`/videos/search/${keyword}`)
      .then((res) => {
        setSearchResults(res?.data?.videos);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  }, [keyword]);

  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode} padding="30px">
      <Container>
        <Recommendation>
          {searchResults?.map((item) => (
            <Card key={item.id} type="sm" video={item} />
          ))}
          {loading && <VideoSkeleton direction="column" />}
        </Recommendation>
      </Container>
    </ParentWrapper>
  );
};

export default search;
