import React, { Suspense, useRef, useState, useEffect } from "react";
import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei";
import { proxy, useProxy } from "valtio";

// import styled from "styled-components";

import Content from "../../components/content";

const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
});


function Shoe() {

export default function Configurator() {
  return (
    <Content padding="0 0 0 10px">
      <h1>Configurator</h1>
    </Content>
  );
}
