import styled from "styled-components";
import Tile from "./tile";

const StyledInfo = styled.div`
  z-index: 10;
  position: absolute;
  display: ${({ isShow }) => (isShow ? "block" : "none")};
  left: ${({ left }) => left || "50%"};
  top: ${({ top }) => top || "1%"};
  cursor: pointer;
  transform: translateX(-50%);
  &:hover {
    color: #1aaffc;
  }
`;

export default function Info(props) {
  return (
    <StyledInfo {...props}>
      <Tile>{props.children}</Tile>
    </StyledInfo>
  );
}
