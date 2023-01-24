import React from "react";
import styled from "styled-components";
import { categories } from "../constants/category";

const Container = styled.div`
  max-width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 14px;
  margin-bottom: 20px;
`;

const Category = styled.div`
  margin: 12px 6px;
  padding: 6px 12px;
  background-color: #373737;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s ease;
`;

const CategoryText = styled.p`
  text-transform: capitalize;
`;

const TopCategories = ({ setCategory }) => {
  return (
    <Container>
      {categories?.map((category) => (
        <Category key={category} onClick={() => setCategory(category)}>
          <CategoryText>{category}</CategoryText>
        </Category>
      ))}
    </Container>
  );
};

export default TopCategories;
