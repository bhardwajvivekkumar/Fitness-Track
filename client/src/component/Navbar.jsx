import { React, useState } from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImg from "../utils/Images/Logo.png";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
`;

const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 42px;
`;

const IconMenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;

const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: none;

  @media screen and (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    position: absolute;
    top: 40px;
    right: -180px;
    width: 180px;
    background: ${({ theme }) => theme.bg};
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    flex-direction: column;
    z-index: 1000;
  }
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <IconMenuWrapper>
          <Mobileicon onClick={() => setisOpen((prev) => !prev)}>
            <MenuRounded sx={{ color: "inherit" }} />
          </Mobileicon>

          <MobileMenu $isOpen={isOpen}>
            <Navlink to="/" onClick={() => setisOpen(false)}>
              Dashboard
            </Navlink>
            <Navlink to="/workouts" onClick={() => setisOpen(false)}>
              Workouts
            </Navlink>
            <Navlink to="/tutorials" onClick={() => setisOpen(false)}>
              Tutorials
            </Navlink>
            <Navlink to="/blogs" onClick={() => setisOpen(false)}>
              Blogs
            </Navlink>
            <Navlink to="/contact" onClick={() => setisOpen(false)}>
              Contact
            </Navlink>
          </MobileMenu>
        </IconMenuWrapper>

        <NavLogo to="/">
          <Logo src={LogoImg} />
          Fittrack
        </NavLogo>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/tutorials">Tutorials</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar src={currentUser?.img}>
            {currentUser?.name ? currentUser.name[0] : ""}
          </Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
