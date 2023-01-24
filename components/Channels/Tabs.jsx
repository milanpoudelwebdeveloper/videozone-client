import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 40px;
`;

const Tabs = ({ selectedMenu, setSelectedMenu, menus }) => {
  return (
    <Container>
      {menus?.map((menu) => (
        <div onClick={() => setSelectedMenu(menu)}>{menu}</div>
      ))}
    </Container>
  );
};

export default Tabs;
