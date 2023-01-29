import React, { useEffect, useState } from "react";
import * as tfjs from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

import styled from "styled-components";

import Content from "../../components/content";
import Info from "../../components/info";
import Tile from "../../components/tile";
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
    console.log("Model Loaded");
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  const recognizeCommand = async () => {
    model?.listen(
      (result) => {
        setInfo(labels[argMax(Object.values(result.scores))]);
      },
      { includeSpectrogram: true, probabilityThreshold: 0.75 }
    );
    setTimeout(() => model?.stopListening(), 10e3);
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <Content overflow="hidden" padding="0">
      {labels && (
        <Info isShow={labels !== ""} left="22%">
          <Tile flexDirection="column">
            <h3>Commands:</h3>
            <br />
            {labels.map((label, index) => (
              <p key={index}>{label}</p>
            ))}
          </Tile>
        </Info>
      )}
      <Bubble
        size={160}
        top="45%"
        left="50%"
        cursor="pointer"
        opacity={opacityAssistent}
        onHover={() => setOpacityAssistent(1)}
        onClick={() => {
          setInfo("Listening...");
          recognizeCommand();
          setOpacityAssistent(1);
        }}
      />
      <StyledInfo>{info !== "" && info}</StyledInfo>
    </Content>
  );
}
