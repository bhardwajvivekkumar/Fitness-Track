import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { CheckCircle, XCircle } from "lucide-react";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import ShowChart from "@mui/icons-material/ShowChart";
import DirectionsRun from "@mui/icons-material/DirectionsRun";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import HikingIcon from "@mui/icons-material/Hiking";
import RowingIcon from "@mui/icons-material/Rowing";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  position: relative;
  overflow: hidden;
  height: 100vh;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    overflow-y: scroll;
    padding: 40px 16px;
  }
`;

const BackgroundIcon = styled.div`
  position: absolute;
  font-size: 140px;
  opacity: 0.1;
  z-index: 0;
  color: #3b82f6;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  background: white;
  border-radius: 24px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px;
    gap: 24px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 280px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #444;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 15px;
  color: #666;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 20px;
  border: none;
  border-radius: 10px;
  background-color: #f3f6fa;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  max-width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 20px;
  border: none;
  border-radius: 10px;
  background-color: #f3f6fa;
  font-size: 14px;
  color: #333;
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;
  max-width: 100%;
`;

const Button = styled.button`
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  color: #fff;
  border: none;
  padding: 14px 24px;
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 18px;
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 13px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    align-items: flex-start;
    text-align: left;
  }
`;

const IconWrapper = styled.div`
  font-size: 100px;
  color: #3b82f6;
  margin-top: 115px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-5px);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 0;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
`;

const MessageBox = styled.div`
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 15px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ success }) => (success ? "#0f9d58" : "#d93025")};
  background-color: ${({ success }) => (success ? "#e6f4ea" : "#fce8e6")};
  border: 1px solid ${({ success }) => (success ? "#0f9d58" : "#d93025")};
  margin-bottom: 20px;
`;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        USER_ID
      )
      .then(
        () => {
          setStatus({
            success: true,
            message: "Thanks for contacting us! We'll get back to you soon.",
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Email error:", error);
          setStatus({
            success: false,
            message: "Failed to send message. Try again later.",
          });
        }
      );
  };

  return (
    <Container>
      <BackgroundIcon style={{ top: "5%", left: "2%" }}>
        <FitnessCenter fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ top: "-2%", right: "1%" }}>
        <ShowChart fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ bottom: "5%", left: "8%" }}>
        <DirectionsRun fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ top: "-1%", left: "20%" }}>
        <SportsMartialArtsIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ bottom: "-5%", right: "5%" }}>
        <SelfImprovementIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ bottom: "-6%", right: "65%" }}>
        <DirectionsBikeIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ bottom: "10%", left: "45%" }}>
        <PoolIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ top: "25%", right: "10%" }}>
        <SportsGymnasticsIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ top: "-1%", right: "22%" }}>
        <SportsMmaIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ top: "45%", left: "5%" }}>
        <HikingIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ bottom: "78%", right: "50%" }}>
        <RowingIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ top: "82%", right: "30%" }}>
        <SportsTennisIcon fontSize="inherit" />
      </BackgroundIcon>
      <BackgroundIcon style={{ bottom: "20%", right: "3%" }}>
        <SportsKabaddiIcon fontSize="inherit" />
      </BackgroundIcon>

      <Wrapper>
        <FormSection>
          <Title>Let's talk</Title>
          <Description>
            Want to know more about fitness , Let's have a chat , Contact us for
            any fitness related query , We'll get back to you as soon as
            possible.
          </Description>

          {status && (
            <MessageBox success={status.success}>
              {status.success ? (
                <CheckCircle size={18} />
              ) : (
                <XCircle size={18} />
              )}
              {status.message}
            </MessageBox>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextArea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
        </FormSection>

        <RightSection>
          <IconWrapper>
            <EmailIcon style={{ fontSize: "100px" }} />
          </IconWrapper>
          <Info>
            <LocationOnIcon /> Chawla colony , Ballabgarh , Faridabad.
            <Tooltip className="tooltip">Our office address</Tooltip>
          </Info>
          <Info>
            <PhoneIcon /> 8368572500
            <Tooltip className="tooltip">Call us</Tooltip>
          </Info>
          <Info>
            <AlternateEmailIcon /> vk3411381@gmail.com
            <Tooltip className="tooltip">Send us an email</Tooltip>
          </Info>
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Contact;
