import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styled from "styled-components";

import Logo from "./assets/logo.png";
import MenuItems from "./data/menuItems";

const StyledWrapper = styled.main`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  text-align: ${({ align }) => align || "left"};
`;

const StyledMenu = styled.nav`
  min-height: 100%;
  width: 300px;
  box-shadow: 0px 0px 15px 0px rgba(26, 175, 252, 1);
  text-align: center;
`;

const StyledImage = styled(Image)`
  height: 140px;
  width: 140px;
  border: 3px solid #1aaffc;
  padding: 20px;
  border-radius: 50%;
`;

const StyledAboutMe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 50px 0 50px;
`;

const StyledName = styled.p`
  margin-top: 25px;
  font-size: 20px;
  font-weight: bold;
`;

const StyledTitle = styled.p`
  font-size: 18px;

  span {
    background: -webkit-linear-gradient(#4ef9fe, #0696ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StyledContent = styled.section`
  padding: 50px;
`;

const StyledMenuItems = styled.div`
  padding: 25px;
`;

const StyledLinkItem = styled(Link)`
  margin: 10px auto;

  opacity: ${({ item }) => (item ? "0.9" : "1")};
  &:hover {
    cursor: pointer;
    color: #1aaffc;
  }
`;

const StyledCollapse = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCollapseBtn = styled.p`
  margin: 10px auto;
  &:hover {
    cursor: pointer;
    color: #1aaffc;
  }
`;

const StyledBlockMobile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  font-size: large;
  font-size: 40px;
  display: none;

  @media (max-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function MenuItem({ title, items }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <StyledCollapseBtn onClick={() => setIsCollapsed(!isCollapsed)}>
        {title}
      </StyledCollapseBtn>
      {isCollapsed && (
        <StyledCollapse>
          {items.map((item) => (
            <StyledLinkItem item href={item.url} key={item.url}>
              {item.title}
            </StyledLinkItem>
          ))}
        </StyledCollapse>
      )}
    </>
  );
}
export default function Content({ children, align }) {
  return (
    <StyledWrapper align={align}>
      <StyledMenu>
        <StyledAboutMe>
          <StyledImage src={Logo} alt="logo" />
          <StyledName>Damian Szmurło </StyledName>
          <StyledTitle>
            <span>Full Stack</span> Developer
          </StyledTitle>
        </StyledAboutMe>
        <StyledMenuItems>
          {MenuItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </StyledMenuItems>
      </StyledMenu>
      <StyledContent>{children}</StyledContent>
      <StyledBlockMobile>
        The website does not work on phones.
      </StyledBlockMobile>
    </StyledWrapper>
  );
}
