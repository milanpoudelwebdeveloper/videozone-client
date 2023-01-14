import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: red;
  margin: 10px auto;
`;

const ErrorText = ({ error }) => {
  return <Text>{error}</Text>;
};

export default ErrorText;
