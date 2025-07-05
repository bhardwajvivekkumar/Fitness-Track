import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
`;

const Excerpt = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 8px;
`;

const Tag = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  margin-top: auto;
`;

const BlogCard = ({ blog, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{blog.title}</Title>
      <Excerpt>{blog.excerpt}</Excerpt>
      <Tag>{blog.tag}</Tag>
    </Card>
  );
};

export default BlogCard;
