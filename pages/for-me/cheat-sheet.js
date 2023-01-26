import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Link from "next/link";

import styled from "styled-components";

import Content from "../../components/content";
import Tile from "../../components/tile";
import { en, pl, link, git } from "../../components/data/textToCopy";

const StyledRow = styled.div`
  display: flex;
`;

const StyledH2 = styled.h2`
  margin: 20px 10px;
  font-size: 32px;
`;

const StyledCopy = styled.p`
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

const StyledInfo = styled.div`
  z-index: 10;
  position: absolute;
  display: ${({ isShow }) => (isShow ? "block" : "none")};
  left: 50%;
  top: 1%;
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

const StyledStockText = styled.p`
  margin: 10px 0;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

const StyledToDoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

const StyledInput = styled.input`
  padding: 5px 15px;
  font-size: 20px;
  border-radius: 12px;
  width: 89%;
  background-color: #ffffff80;
  color: white;
`;

const StyledAddBtn = styled.div`
  background-color: #ffffff80;
  height: max-content;
  padding: 0 14px;
  font-size: 32px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

const StyledToDoList = styled.div`
  padding: 20px 10px;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 600px;
`;

const StyledToDoItem = styled.div`
  cursor: pointer;

  &:hover {
    color: #1aaffc;
  }
`;

export default function CheatSheet() {
  const strK2 = "WtwZ7PtrlPKKa3uJlZYPejPVShG44tgQ";
  const weekAgo = dayjs().subtract(7, "days").format("YYYY-MM-DD");

  const [data, setData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  const toDoInput = useRef(null);
  const [toDoList, setToDoList] = useState([]);

  const [info, setInfo] = useState(null);

  const saveToDo = () => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  };

  const addToDo = () => {
    setToDoList([...toDoList, toDoInput.current.value]);
    toDoInput.current.value = "";
    saveToDo();
  };

  const removeToDo = (itemToRemove) => {
    setToDoList(toDoList.filter((item) => item !== itemToRemove));
    saveToDo();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setInfo(`Copied the text to the clipboard`);
  };

  useEffect(() => {
    const getToDoList = () => {
      const toDoListStorage = JSON.parse(localStorage.getItem("toDoList"));
      if (toDoListStorage) {
        setToDoList(toDoListStorage);
      }
    };

    const fetchData = async () => {
      const result = await axios(
        {
          method: "get",
          url: "https://api.apilayer.com/currency_data/live?source=EUR&currencies=USD,GBP,JPY,CHF,PLN",
          headers: { apikey: strK2 },
        },
        {
          method: "get",
          url: `https://api.apilayer.com/currency_data/historical?date=${weekAgo}?source=EUR&currencies=USD,GBP,JPY,CHF,PLN`,
          headers: { apikey: strK2 },
        }
      );

      setData(result.data);
    };

    // fetchData();
    getToDoList();
  }, []);

  const roundQuotes = (quotes) => {
    if (quotes === undefined) return 0;
    return Math.round(quotes * 100) / 100;
  };

  return (
    <Content overflow="hidden">
      <StyledInfo isShow={info !== null} onClick={() => setInfo(null)}>
        <Tile>{info}</Tile>
      </StyledInfo>
      <StyledH2>Forex</StyledH2>
      <StyledRow>
        <Tile gap="15px" minHeight="250px">
          <div>
            <Link
              href="https://pl.tradingview.com/chart/tswqhFJr/?symbol=FX_IDC%3AEURPLN"
              target="_blank"
            >
              <StyledStockText>
                EUR/PLN: {roundQuotes(data?.quotes?.EURPLN)}
              </StyledStockText>
            </Link>
            <Link
              href="https://pl.tradingview.com/chart/tswqhFJr/?symbol=FX_IDC%3AEURUSD"
              target="_blank"
            >
              <StyledStockText>
                EUR/USD: {roundQuotes(data?.quotes?.EURUSD)}
              </StyledStockText>
            </Link>
            <Link
              href="https://pl.tradingview.com/chart/tswqhFJr/?symbol=FX_IDC%3AEURCHF"
              target="_blank"
            >
              <StyledStockText>
                EUR/CHF: {roundQuotes(data?.quotes?.EURCHF)}
              </StyledStockText>
            </Link>
            <Link
              href="https://pl.tradingview.com/chart/tswqhFJr/?symbol=FX_IDC%EURJPY"
              target="_blank"
            >
              <StyledStockText>
                EUR/JPY: {roundQuotes(data?.quotes?.EURJPY)}
              </StyledStockText>
            </Link>
            <Link
              href="https://pl.tradingview.com/chart/tswqhFJr/?symbol=FX_IDC%EURGBP"
              target="_blank"
            >
              <StyledStockText>
                EUR/GBP: {roundQuotes(data?.quotes?.EURGBP)}
              </StyledStockText>
            </Link>
          </div>
          <div>
            <StyledStockText>
              {roundQuotes(data?.quotes?.EURPLN)}
            </StyledStockText>
            <StyledStockText>
              {roundQuotes(data?.quotes?.EURUSD)}
            </StyledStockText>
            <StyledStockText>
              {roundQuotes(data?.quotes?.EURCHF)}
            </StyledStockText>
            <StyledStockText>
              {roundQuotes(data?.quotes?.EURJPY)}
            </StyledStockText>
            <StyledStockText>
              {roundQuotes(data?.quotes?.EURGBP)}
            </StyledStockText>
          </div>
        </Tile>
        <Tile minHeight="250px" minWidth="600px" display="block">
          <StyledToDoHeader>
            <StyledInput ref={toDoInput} />
            <StyledAddBtn onClick={addToDo}> + </StyledAddBtn>
          </StyledToDoHeader>
          <StyledToDoList>
            {toDoList.map((item) => (
              <StyledToDoItem key={item} onClick={() => removeToDo(item)}>
                {item}
              </StyledToDoItem>
            ))}
          </StyledToDoList>
        </Tile>
      </StyledRow>
      <StyledH2>Copier</StyledH2>
      <StyledRow>
        <Tile padding="12px">
          <Tile padding="12px">
            <StyledCopy onClick={() => copyToClipboard(pl)}>Pl</StyledCopy>
          </Tile>
          <Tile padding="12px">
            <StyledCopy onClick={() => copyToClipboard(en)}>En</StyledCopy>
          </Tile>
          <Tile padding="12px">
            <StyledCopy onClick={() => copyToClipboard(link)}>Link</StyledCopy>
          </Tile>
          <Tile padding="12px">
            <StyledCopy onClick={() => copyToClipboard(git)}>Git</StyledCopy>
          </Tile>
        </Tile>
        <Tile padding="14px">
          <Tile padding="10px">
            <Link
              href="https://github.com/ZTKpro/ds-code.netlify.app/blob/main/components/assets/Damian_Szmurło_CV.pdf"
              target="_blank"
            >
              <StyledCopy>CV</StyledCopy>
            </Link>
          </Tile>
          <Tile padding="10px">
            <StyledCopy
              onClick={() => {
                if (window) {
                  window.open(
                    "https://github.com/ZTKpro/ds-code.netlify.app/blob/main/components/assets/Damian_Szmurło_CV.pdf",
                    "_blank"
                  );
                  window.open("https://linkedin.com/in/dszmurlo/", "_blank");
                }
              }}
            >
              Interview
            </StyledCopy>
          </Tile>
          <Tile padding="10px">
            <StyledCopy
              onClick={() => {
                if (window) {
                  window.open(
                    "https://xstation5.xtb.com/?branch=pl#/real/loggedIn",
                    "_blank"
                  );
                  window.open("https://www.fxstreet.com/news", "_blank");
                  window.open(
                    "https://www.valutrades.com/en/blog/common-chart-patterns-a-forex-cheat-sheet",
                    "_blank"
                  );
                }
              }}
            >
              Forex
            </StyledCopy>
          </Tile>
        </Tile>
      </StyledRow>
    </Content>
  );
}
