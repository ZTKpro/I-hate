import { useState, useEffect } from "react";

import styled from "styled-components";

import Content from "../../components/content";
import Tile from "../../components/tile";
import Bubble from "../../components/bubble";

const StyledRow = styled.div`
  display: flex;
`;
const StyledH2 = styled.h2`
  margin: 20px 10px;
  font-size: 32px;
`;

export default function CheatSheet() {
  return (
    <Content>
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
        <Tile padding="10px">
          <div>
            <Tile padding="10px">
              <p>Pl</p>
            </Tile>
            <Tile padding="10px">
              <p>En</p>
            </Tile>
          </div>
          <div>
            <Tile padding="10px">
              <p>Link</p>
            </Tile>
            <Tile padding="10px">
              <p>Git</p>
            </Tile>
          </div>
        </Tile>
        <Tile>
          <h1>CV</h1>
        </Tile>
      </StyledRow>
    </Content>
  );
}
