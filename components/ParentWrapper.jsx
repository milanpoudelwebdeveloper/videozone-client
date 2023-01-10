import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Navbar from "./Navbar";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;
const ParentWrapper = ({ children, setDarkMode, darkMode }) => {
  return (
    <Container>
      <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
      <Main>
        <Navbar />
        <Wrapper>{children}</Wrapper>
      </Main>
    </Container>
  );
};

export default ParentWrapper;
