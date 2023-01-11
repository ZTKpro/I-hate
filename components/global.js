import Image from "next/image";

import styled from "styled-components";

export const StyledTittle = styled.h2`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};

  font-size: 50px;

  span {
    background: -webkit-linear-gradient(#4ef9fe, #0696ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const StyledSubTittle = styled.h5`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  font-size: 30px;
`;

export const StyledText = styled.p`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  font-size: 25px;
`;

export const StyledFlex = styled.div`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};

  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
`;

export const StyledImage = styled(Image)`
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};

  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
`;
