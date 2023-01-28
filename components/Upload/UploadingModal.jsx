import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

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

const UploadingModal = () => {
  return (
    <Modal
      isOpen={true}
      style={customStyles}
      overlayClassName="overlay"
      className="modal"
    >
      <Container>
        <Wrapper>
          <video
            src={"/animations/uploading.mp4"}
            autoPlay
            loop
            style={{ width: "100%", height: "100%" }}
          />
          <More>Uploading contents...</More>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default UploadingModal;
