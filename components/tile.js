import styled from "styled-components";

const StyledWrappr = styled.div`
  margin: ${({ margin }) => margin || "10px"};
  padding: ${({ padding }) => padding || "20px"};
  background-color: #27293d;
  /* border: 1px solid #181a26; */
  border: 1px solid #ffffff30;
  border-radius: 10px;
  height: fit-content;

  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "wrap"};
`;

export default function Tile({ children, ...props }) {
  return <StyledWrappr {...props}>{children}</StyledWrappr>;
}
