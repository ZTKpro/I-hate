import styled from "styled-components";

import Content from "../../components/content";

const spanShadowColor = "#016194";

const Dtitle = styled.p`
  top: 30%;
  font-size: 80px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191,
    1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191,
    1px 7px 1px #919191, 1px 8px 1px #919191, 1px 9px 1px #919191,
    1px 10px 1px #919191;
  span {
    color: #016194;
    color: #4abefd;
    text-shadow: 1px 1px 1px ${spanShadowColor}, 1px 2px 1px ${spanShadowColor},
      1px 3px 1px ${spanShadowColor}, 1px 4px 1px ${spanShadowColor},
      1px 5px 1px ${spanShadowColor}, 1px 6px 1px ${spanShadowColor},
      1px 7px 1px ${spanShadowColor}, 1px 8px 1px ${spanShadowColor},
      1px 9px 1px ${spanShadowColor}, 1px 10px 1px ${spanShadowColor};
  }
`;

const Ddesc = styled.p`
  top: 48%;
  font-size: 26px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191,
    1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191;
`;

export default function text() {
  return (
    <Content overflow="hidden" minWidth="85%">
      <Dtitle>
        <span>Front end</span> developer
      </Dtitle>
      <Ddesc>
        type of computer programmer that codes and creates the visual front-end
        elements of a software, application or website. He or she creates
        computing components/features that are directly viewable and accessible
        by the end user or client.
      </Ddesc>
    </Content>
  );
}
