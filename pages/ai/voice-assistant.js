import React, { useRef, useState } from "react";

import styled from "styled-components";

import Content from "../../components/content";
import Bubble from "../../components/bubble";

const StyledInfo = styled.p`
  position: absolute;
  top: 60%;
  left: 51%;
  font-size: 28px;
`;

export default function VoiceAssistant() {
  const defaultOpacity = 0.7;

  const [opacityAssistent, setOpacityAssistent] = useState(defaultOpacity);
  const [info, setInfo] = useState("");

  return (
    <Content overflow="hidden" minWidth="65%">
      <Bubble
        size={150}
        top="38%"
        left="50%"
        cursor="pointer"
        onMouseEnter={() => setOpacityAssistent(1)}
        onMouseLeave={() => setOpacityAssistent(defaultOpacity)}
        onHover={() => setOpacityAssistent(1)}
        onClick={() => setInfo("Listening...")}
        opacity={opacityAssistent}
      />
      <StyledInfo>{info !== "" && info}</StyledInfo>
    </Content>
  );
}
