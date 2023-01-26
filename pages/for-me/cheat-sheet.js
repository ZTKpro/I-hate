import { useState, useEffect } from "react";
import Link from "next/link";

import styled from "styled-components";

import Content from "../../components/content";
import Tile from "../../components/tile";
import { en, pl, link, git } from "../../components/data/textToCopy";

const StyledRow = styled.div`
  display: flex;
`;

const StyledH2 = styled.h2`
  margin: 20px 10px;
  font-size: 32px;
`;

const StyledCopy = styled.p`
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

const StyledInfo = styled.div`
  z-index: 10;
  position: absolute;
  display: ${({ display }) => (display ? "block" : "none")};
  left: 50%;
  top: 1%;
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

export default function CheatSheet() {
  const [info, setInfo] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setInfo(`Copied the text to the clipboard`);
  };

  return (
    <Content>
      <StyledInfo display={info !== null} onClick={() => setInfo(null)}>
        <Tile>{info}</Tile>
      </StyledInfo>
      <StyledRow>
        <Tile>
          <h1>Stock</h1>
        </Tile>
        <Tile>
          <h1>Last 7 day</h1>
        </Tile>
        <Tile>
          <h1>To do:</h1>
        </Tile>
      </StyledRow>
      <StyledH2>Copier</StyledH2>
      <StyledRow>
        <Tile padding="12px">
          <div>
            <Tile padding="12px">
              <StyledCopy onClick={() => copyToClipboard(pl)}>Pl</StyledCopy>
            </Tile>
            <Tile padding="12px">
              <StyledCopy onClick={() => copyToClipboard(en)}>En</StyledCopy>
            </Tile>
          </div>
          <div>
            <Tile padding="12px">
              <StyledCopy onClick={() => copyToClipboard(link)}>
                Link
              </StyledCopy>
            </Tile>
            <Tile padding="12px">
              <StyledCopy onClick={() => copyToClipboard(git)}>Git</StyledCopy>
            </Tile>
          </div>
        </Tile>
        <Tile>
          <Link
            href="https://github.com/ZTKpro/ds-code.netlify.app/blob/main/components/assets/Damian_Szmurło_CV.pdf"
            target="_blank"
          >
            <StyledCopy>CV</StyledCopy>
          </Link>
        </Tile>
      </StyledRow>
    </Content>
  );
}
