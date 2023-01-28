import { useState, useEffect } from "react";

import styled from "styled-components";

import Content from "../../components/content";
import Bubble from "../../components/bubble";

const StyledHeight = styled.div`
  position: relative;
  height: 180vh;
`;

const StyledTitle = styled.h4`
  position: absolute;
  text-align: center;
  font-size: 40px;
  top: ${({ top }) => top || "0"};
  left: ${({ left }) => left || "0"};
  transform: translate(-50%, -50%);
`;

const StyledText = styled.p`
  width: 600px;
  position: absolute;
  text-align: center;
  font-size: 25px;
  top: ${({ top }) => top || "0"};
  left: ${({ left }) => left || "0"};
  transform: translate(-50%, -50%);
`;

export default function Parrallax() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxEffect = (startPosition, type, params, limit) => {
    let top = startPosition.top;
    let left = startPosition.left;

    if (type === "horizontal") {
      left = startPosition.left + scrollPosition / params;
      if (!isNegative(params) && left > limit) left = limit;
      if (isNegative(params) && left < limit) left = limit;
    }

    if (type === "vertical") {
      top = startPosition.top + scrollPosition / params;
      if (top > limit) top = limit;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  return (
    <Content padding="0 0 0 10px">
      <StyledHeight>
        <StyledTitle
          {...parallaxEffect({ top: 1450, left: 0 }, "horizontal", 0.4, 900)}
        >
          Parallax
        </StyledTitle>
        <StyledText
          {...parallaxEffect({ top: 1600, left: 1500 }, "horizontal", -1, 910)}
        >
          Parallax is a displacement or difference in the apparent position of
          an object viewed along two different lines of sight and is measured by
          the angle or semi-angle of inclination between those two lines.
        </StyledText>
        <Bubble
          size={200}
          position="absolute"
          transition="1.5s"
          {...parallaxEffect({ top: 140, left: 900 }, "horizontal", 0.5)}
        />
        <Bubble
          size={200}
          position="absolute"
          transition="1.5s"
          {...parallaxEffect({ top: 390, left: 900 }, "vertical", 1, 1600)}
          inside
        />
        <Bubble
          size={200}
          position="absolute"
          transition="1.5s"
          {...parallaxEffect({ top: 630, left: 900 }, "horizontal", -0.5)}
        />
      </StyledHeight>
    </Content>
  );
}
