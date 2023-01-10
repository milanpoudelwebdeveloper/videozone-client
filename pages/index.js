import React from "react";
import ParentWrapper from "../components/ParentWrapper";
import Videos from "../components/Videos";

const Home = ({ setDarkMode, darkMode }) => {
  return (
    <ParentWrapper setDarkMode={setDarkMode} darkMode={darkMode}>
      <Videos />
    </ParentWrapper>
  );
};

export default Home;
