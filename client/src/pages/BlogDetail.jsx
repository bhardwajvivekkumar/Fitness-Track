import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { blogs } from "../utils/blogData";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text_primary};
`;

const Tag = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

const Content = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  white-space: pre-line;
  padding-bottom: 100px;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary + "CC"};
  }
`;

const BlogDetail = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const blog = blogs[index];

  if (!blog) return <div>Blog not found</div>;

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate(-1)}>Back to Blogs</BackButton>
        <Title>{blog.title}</Title>
        <Tag>Category: {blog.tag}</Tag>
        <Content>{blog.content}</Content>
      </Wrapper>
    </Container>
  );
};

export default BlogDetail;
