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

  margin-bottom: 20px;
`;

const Category = styled.div`
  margin: 12px 6px;
  padding: 6px 12px;
  background-color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: ${({ isSelected }) => (isSelected ? "black" : "#E5E5E5")};
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "black")};
  transition: all 0.3s ease;
`;

const CategoryText = styled.p`
  text-transform: capitalize;
  font-size: 14px;
`;

const TopCategories = ({ setCategory, selectedCategory }) => {
  return (
    <Container>
      {categories?.map((category) => (
        <Category
          key={category}
          onClick={() => setCategory(category)}
          isSelected={selectedCategory === category}
        >
          <CategoryText>{category}</CategoryText>
        </Category>
      ))}
    </Container>
  );
};

export default TopCategories;
