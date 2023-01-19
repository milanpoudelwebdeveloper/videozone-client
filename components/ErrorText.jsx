import React from "react";
import styled from "styled-components";

const Text = styled.p`
  color: red;
  margin: 1px auto;
  text-align: left;
`;

const ErrorText = ({ error }) => {
  return <Text>{error}</Text>;
};

export default ErrorText;
