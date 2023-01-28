import React, { useRef, useState } from "react";
import * as tfjs from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

import styled from "styled-components";

import Content from "../../components/content";
import Bubble from "../../components/bubble";

const StyledInfo = styled.p`
  position: absolute;
  top: 60%;
  left: 50%;
  font-size: 28px;
  transform: translate(-50%, -50%);
`;

export default function VoiceAssistant() {
  const defaultOpacity = 0.7;

  const [opacityAssistent, setOpacityAssistent] = useState(defaultOpacity);
  const [info, setInfo] = useState("");

  return (
    <Content overflow="hidden" padding="0">
      <Bubble
        size={160}
        top="45%"
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
