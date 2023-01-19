import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Login from "./Login";
import SignUp from "./SignUp";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "max-content",
    backgroundColor: "transparent",
  },
};

Modal.setAppElement("#modals");

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignUpModal = ({ modalIsOpen, closeModal }) => {
  const [logInMode, setLogInMode] = useState(true);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName="overlay"
      className="modal"
    >
      <Container>
        <Wrapper>
          {logInMode ? (
            <Login
              setSignUp={() => setLogInMode(false)}
              closeModal={closeModal}
            />
          ) : (
            <SignUp setLogIn={() => setLogInMode(true)} />
          )}
        </Wrapper>
        <More>
          English(USA)
          <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
          </Links>
        </More>
      </Container>
    </Modal>
  );
};

export default SignUpModal;
