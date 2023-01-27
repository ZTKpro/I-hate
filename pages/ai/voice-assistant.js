import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";

import styled from "styled-components";

import Content from "../../components/content";
import Bubble from "../../components/bubble";

const WaveVisualizer = dynamic(() => import("wave-visualizer"), {
  ssr: false,
});

export default function VoiceAssistant() {
  return (
    <Content overflow="hidden" minWidth="65%">
      <Bubble size={150} top="40%" left="50%" animate />
      <WaveVisualizer
        width={400} // szerokość wizualizacji
        height={200} // wysokość wizualizacji
        color="#00FF00" // kolor wizualizacji
      />
    </Content>
  );
}

dynamic(() => Promise.resolve(VoiceAssistant), {
  ssr: false,
});
