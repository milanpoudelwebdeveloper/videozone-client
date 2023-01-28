import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border: ${({ isSelected }) => (isSelected ? "2px solid red" : "none")};
`;

const ThumbnailsPreview = ({
  thumbnails,
  selectedThumbnail,
  setThumbnailFile,
}) => {
  return (
    <Wrapper>
      {thumbnails?.length > 0 &&
        thumbnails?.map((data) => (
          <Image
            src={data}
            alt="thumbnail"
            onClick={() => setThumbnailFile(data)}
            isSelected={selectedThumbnail === data}
          />
        ))}
    </Wrapper>
  );
};

export default ThumbnailsPreview;
