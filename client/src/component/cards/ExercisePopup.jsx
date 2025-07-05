import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Popup = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin: 16px 0;
`;

const Tag = styled.div`
  font-size: 12px;
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  width: fit-content;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary + 30};
  }
`;

const ExercisePopup = ({ exercise, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <Title>{exercise.name}</Title>
        <Description>{exercise.desc}</Description>
        <Tag>{exercise.tag}</Tag>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Popup>
    </Overlay>
  );
};

export default ExercisePopup;
