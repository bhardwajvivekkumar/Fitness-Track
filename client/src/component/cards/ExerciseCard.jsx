import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 4px 16px 0px ${({ theme }) => theme.primary + 15};
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ExerciseName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 90};
  line-height: 1.5;
  text-align: justify;
`;

const Tag = styled.div`
  font-size: 12px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  border-radius: 6px;
  width: fit-content;
`;

const ExerciseCard = ({ exercise, onClick }) => {
  return (
    <Card onClick={onClick}>
      <ExerciseName>{exercise.name}</ExerciseName>
      <Description>{exercise.desc}</Description>
      <Tag>{exercise.tag}</Tag>
    </Card>
  );
};

export default ExerciseCard;
