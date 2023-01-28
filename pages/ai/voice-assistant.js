import React, { useEffect, useState } from "react";
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

  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState(null);

  const argMax = (arr) => {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  };

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    await recognizer.ensureModelLoaded();
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  const recognizeCommand = async () => {
    model?.listen(
      (result) => {
        setInfo(labels[argMax(Object.values(result.scores))]);
      },
      { includeSpectrogram: true, probabilityThreshold: 0.9 }
    );
    setTimeout(() => model?.stopListening(), 10e3);
  };

  useEffect(() => {
    loadModel();
  }, []);

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
        onClick={() => {
          setInfo("Listening...");
          recognizeCommand();
        }}
        opacity={opacityAssistent}
      />
      <StyledInfo>{info !== "" && info}</StyledInfo>
    </Content>
  );
}
