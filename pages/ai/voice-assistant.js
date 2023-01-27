import React, { useRef, useState } from "react";
import styled from "styled-components";

import Content from "../../components/content";
import Bubble from "../../components/bubble";

export default function VoiceAssistant() {
  return (
    <Content overflow="hidden">
      <Bubble size={150} top="40%" left="30%" animate />
    </Content>
  );
}
