import styled, { keyframes } from "styled-components";

const fade = keyframes`
  to {
    transform: -webkit-linear-gradient(#0696ff, #4ef9fe);
    rotate: (360deg);
    opacity: 0.9;
  }
`;

const StyledWrappr = styled.div`
  z-index: ${({ zIndex }) => zIndex || "0"};
  position: ${({ position }) => position || "relative"};
  top: ${({ top }) => top || "0"};
  left: ${({ left }) => left || "0"};
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  transition: ${({ transition }) => transition || "0.3s"};
  opacity: ${({ animate }) => (animate ? 0.8 : 1)};

  display: flex;
  align-items: center;
  justify-content: center;
  background: -webkit-linear-gradient(#4ef9fe, #0696ff);
  border-radius: 50%;

  &:hover {
    cursor: ${({ animate }) => (animate ? "pointer" : "default")};
    opacity: 1;
  }
`;

const StyledInside = styled.div`
  height: 90%;
  width: 90%;
  background-color: black;
  border-radius: 50%;
`;

export default function Bubble(props) {
  return (
    <StyledWrappr {...props}>{props.inside && <StyledInside />}</StyledWrappr>
  );
}
