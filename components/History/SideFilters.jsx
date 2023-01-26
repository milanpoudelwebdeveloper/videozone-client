import React from "react";
import moment from "moment";
import styled from "styled-components";
import { margin } from "@mui/system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Heading = styled.h4`
  margin-bottom: 20px;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const SideFilters = ({ filters, setSelectedFilter, selectedFilter }) => {
  const handleChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  return (
    <Container>
      <Heading>Filter By Time</Heading>
      <Wrapper>
        {filters?.map((filter) => (
          <RadioContainer>
            <input
              type="radio"
              name="timeFilter"
              value={filter?.value}
              onChange={handleChange}
              checked={selectedFilter === filter?.value}
            />
            <label>{filter?.label}</label>
          </RadioContainer>
        ))}
      </Wrapper>
    </Container>
  );
};

export default SideFilters;
