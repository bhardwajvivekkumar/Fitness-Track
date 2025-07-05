import React, { useState } from "react";
import styled from "styled-components";
import ExerciseCard from "../component/cards/ExerciseCard";
import ExercisePopup from "../component/cards/ExercisePopup";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FilterContainer = styled.div`
  padding: 0px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : theme.text_secondary + 20};
  color: ${({ active, theme }) => (active ? "white" : theme.text_primary)};
  cursor: pointer;
  font-size: 14px;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 62px;
  margin-bottom: 40px;
  padding: 0px 16px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 60px;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

const Tutorial = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filterTag, setFilterTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const tags = [
    "All",
    "Upper Body",
    "Lower Body",
    "Core",
    "Full Body",
    "Cardio",
    "Arms",
    "Legs",
    "Back",
    "Glutes",
  ];

  const exercises = [
    {
      name: "Push-ups",
      desc: "Push-ups are a fundamental bodyweight exercise that primarily targets the chest, shoulders, and triceps. They also engage the core and help improve upper body strength and endurance.",
      tag: "Upper Body",
    },
    {
      name: "Squats",
      desc: "Squats are a powerful lower body workout that engages the quadriceps, hamstrings, and glutes. They improve lower body strength, stability, and mobility while also promoting core engagement.",
      tag: "Lower Body",
    },
    {
      name: "Plank",
      desc: "Planks are excellent for building core strength and stability. They also engage the shoulders, arms, and glutes, making them a great isometric exercise for overall body control.",
      tag: "Core",
    },
    {
      name: "Lunges",
      desc: "Lunges work the legs and glutes, enhancing balance, coordination, and flexibility. This unilateral movement is effective for addressing muscle imbalances between legs.",
      tag: "Lower Body",
    },
    {
      name: "Burpees",
      desc: "Burpees are a high-intensity, full-body exercise that boosts cardiovascular fitness, endurance, and overall strength. They combine squats, push-ups, and jumps into one fluid movement.",
      tag: "Full Body",
    },
    {
      name: "Mountain Climbers",
      desc: "Mountain climbers are a cardio-intensive workout that also targets the core, shoulders, and legs. They are effective for burning calories and improving agility.",
      tag: "Cardio",
    },
    {
      name: "Bicycle Crunches",
      desc: "Bicycle crunches are a dynamic abdominal exercise that works the rectus abdominis and obliques. They also improve coordination and core definition.",
      tag: "Core",
    },
    {
      name: "Pull-ups",
      desc: "Pull-ups are a challenging upper body exercise that strengthens the back, biceps, and shoulders. They also require strong grip strength and core stability.",
      tag: "Upper Body",
    },
    {
      name: "Tricep Dips",
      desc: "Tricep dips isolate the triceps and shoulders. They are great for building upper arm strength and can be performed using parallel bars or a sturdy surface like a bench.",
      tag: "Arms",
    },
    {
      name: "Jump Squats",
      desc: "Jump squats are a plyometric variation of squats that improve explosive power and cardiovascular endurance. They target the quads, glutes, and calves.",
      tag: "Lower Body",
    },
    {
      name: "Wall Sit",
      desc: "Wall sits are an isometric exercise that targets the quadriceps, hamstrings, and glutes. They help build endurance and muscle control in the lower body.",
      tag: "Legs",
    },
    {
      name: "Side Plank",
      desc: "Side planks improve core stability and target the obliques. They also engage the shoulders and hips, making them a great balance and strength exercise.",
      tag: "Core",
    },
    {
      name: "Superman",
      desc: "The Superman exercise targets the lower back, glutes, and shoulders. It helps improve posture, spinal stability, and overall back strength.",
      tag: "Back",
    },
    {
      name: "High Knees",
      desc: "High knees are a cardio-intensive movement that increases heart rate, burns calories, and strengthens the legs and core. They also improve coordination and agility.",
      tag: "Cardio",
    },
    {
      name: "Glute Bridges",
      desc: "Glute bridges activate and strengthen the glutes, hamstrings, and lower back. They are effective for improving hip mobility and core stability.",
      tag: "Glutes",
    },
  ];

  const filteredExercises =
    filterTag === "All"
      ? exercises
      : exercises.filter((e) => e.tag === filterTag);

  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleExercises = filteredExercises.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Container>
      <Wrapper>
        <Title>Exercise Tutorials</Title>

        <FilterContainer>
          {tags.map((tag) => (
            <FilterButton
              key={tag}
              active={filterTag === tag}
              onClick={() => {
                setFilterTag(tag);
                setCurrentPage(1);
              }}
            >
              {tag}
            </FilterButton>
          ))}
        </FilterContainer>

        <CardWrapper>
          {visibleExercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              onClick={() => setSelectedExercise(exercise)}
            />
          ))}
        </CardWrapper>

        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      </Wrapper>
      {selectedExercise && (
        <ExercisePopup
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </Container>
  );
};

export default Tutorial;
