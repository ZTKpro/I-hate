import React, { useState, useEffect } from "react";
import Link from "next/link";

import styled from "styled-components";
import Image from "next/image";
import Karyna from "../components/assets/karyna.png";

const StyledWrapper = styled.h4`
  padding: 35px;
  text-align: center;
`;
const StyledImage = styled(Image)`
  margin-top: 50px;
  height: 240px;
  width: 240px;
  border: 3px solid #1aaffc;
  border-radius: 50%;
  img {
    height: 140px;
    width: 140px;
  }
`;

const StyledText = styled.h2`
  margin-top: 50px;
`;
const StyledTextp = styled.h3`
  margin-top: 50px;
`;
const StyledTextLink = styled.h1`
  margin-top: 50px;
  cursor: pointer;
  color: #1aaffc;
`;

function Odpisz() {
  return (
    <StyledWrapper>
      <h1>Droga Karyno</h1>
      <StyledImage src={Karyna} alt="Karyna" />
      <StyledText>Ile można czekać aby pani odpisała?</StyledText>
      <StyledTextp>
        Czekam już: `Tu miał byc licznik ale coś mi nie wychodzi dodanie jego`
      </StyledTextp>
      <StyledTextp>
        Proszę o niezwłoczne jak najszybsze odpowiadanie mi na instagramie
      </StyledTextp>
      <StyledTextLink>
        <Link href="https://www.instagram.com/direct/inbox/">
          Instagram
        </Link>
      </StyledTextLink>
    </StyledWrapper>
  );
}

export default Odpisz;
