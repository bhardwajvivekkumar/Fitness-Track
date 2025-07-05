import React from "react";
import styled from "styled-components";
import BlogCard from "../component/cards/BlogCard";
import { blogs } from "../utils/blogData";
import { useNavigate } from "react-router-dom";

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

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 32px;
  margin-bottom: 40px;
  padding: 0px 16px;
`;

const Blogs = () => {
  const navigate = useNavigate();

  const handleNavigate = (index) => {
    navigate(`/blog/${index}`);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blogs</Title>
        <CardWrapper>
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              blog={blog}
              onClick={() => handleNavigate(index)}
            />
          ))}
        </CardWrapper>
      </Wrapper>
    </Container>
  );
};

export default Blogs;
