import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import { toast } from "react-toastify";
import ParentWrapper from "../components/ParentWrapper";
import SideFilters from "../components/History/SideFilters";
import Card from "../components/Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 40px 0px;
`;

const Heading = styled.h4`
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const VideoContainer = styled.div``;

const NoVideosFound = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const history = () => {
  const [results, setResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("today");
  const filters = [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "This week",
      value: "thisweek",
    },
    {
      label: "This month",
      value: "thismonth",
    },
    {
      label: "Older",
      value: "older",
    },
  ];

  useEffect(() => {
    axiosInstance
      .get(`/history/${selectedFilter}`)
      .then((res) => {
        setResults(res.data?.history);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [selectedFilter]);

  return (
    <ParentWrapper>
      <Container>
        <Wrapper>
          <Heading>Watch history</Heading>
          <VideoContainer>
            {results?.length > 0 &&
              results?.map((item) => (
                <div>
                  <Card video={item} type="sm" />
                </div>
              ))}
            {results?.length === 0 && (
              <NoVideosFound>
                No videos found with this filter. Please try another filter
              </NoVideosFound>
            )}
          </VideoContainer>
        </Wrapper>
        <SideFilters
          filters={filters}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
      </Container>
    </ParentWrapper>
  );
};

export default history;
