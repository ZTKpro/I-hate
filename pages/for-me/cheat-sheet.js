import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import axios from "axios";
import Link from "next/link";

import styled from "styled-components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import Content from "../../components/content";
import Tile from "../../components/tile";
import Info from "../../components/info";
import { en, pl, link, git } from "../../components/data/textToCopy";
import { currencyPair } from "../../components/data/currencyPair";

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

const StyledStockText = styled.p`
  margin: 10px 0;
  font-size: 20px;
  color: ${({ color }) => color || "white"};
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
  width: 82%;
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
  width: 380px;
`;

const StyledToDoItem = styled.div`
  cursor: pointer;
  &:hover {
    color: #1aaffc;
  }
`;

export default function CheatSheet() {
  const strK2 = "edbe64420f274f4cbdca588eba157a24";
  // const strK22 = "161a674625c8421184d1293bc24c5fcf";

  const weekAgo = dayjs().subtract(14, "days").format("YYYY-MM-DD");

  const [data, setData] = useState([]);

  const toDoInput = useRef(null);
  const [toDoList, setToDoList] = useState(["."]);

  const [info, setInfo] = useState("");

  const addToDo = () => {
    if (toDoInput.current.value !== "") {
      setToDoList([...toDoList, toDoInput.current.value]);
      toDoInput.current.value = "";
      localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }
  };

  const removeToDo = (itemToRemove) => {
    setToDoList(toDoList.filter((item) => item !== itemToRemove));
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
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
    getToDoList();

    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.twelvedata.com/time_series?start_date=${weekAgo}&symbol=${currencyPair.join(
          ","
        )}&interval=1day&apikey=${strK2}`,
      });
      setData(result.data);
    };

    fetchData();
  }, []);

  const roundQuotes = (quotes) => {
    if (quotes === undefined) return 0;
    return Math.round(quotes * 100) / 100;
  };

  const stringQuotes = (quotes) => {
    return quotes.replace("/", "");
  };

  const showTodayPrice = (quotes) => {
    return roundQuotes(data[quotes]?.values[0]?.close);
  };

  const showWeekPrice = (quotes) => {
    return roundQuotes(data[quotes]?.values[10]?.close);
  };

  const showPriceDiff = (quotes) => {
    if (data[quotes]?.values[0].close > data[quotes]?.values[10]?.close)
      return "lightGreen";

    return "red";
  };

  const [selecedQuotes, setSelectedQuotes] = useState(currencyPair[0]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: selecedQuotes,
      },
    },
  };

  const chartData = {
    labels: data[selecedQuotes]?.values
      .map((item) => item.datetime.split("-")[2])
      .reverse(),
    datasets: [
      {
        data: data[selecedQuotes]?.values.map((item) => item.close).reverse(),
        label: selecedQuotes,
        borderColor: "white",
        fill: false,
      },
    ],
  };

  return (
    <Content overflow="hidden">
      <Info isShow={info !== ""} onClick={() => setInfo("")}>
        <Tile>{info}</Tile>
      </Info>
      <StyledH2>Forex</StyledH2>
      <StyledRow>
        <Tile gap="15px" minHeight="250px">
          <div>
            {currencyPair.map((item) => (
              <Link
                href={`https://pl.tradingview.com/chart/tswqhFJr/?symbol=${stringQuotes(
                  item
                )}`}
                target="_blank"
                key={item}
              >
                <StyledStockText>
                  {item}: {showTodayPrice(item)}
                </StyledStockText>
              </Link>
            ))}
          </div>
          <div>
            {currencyPair.map((item) => (
              <StyledStockText
                color={showPriceDiff(item)}
                onClick={() => setSelectedQuotes(item)}
                key={item}
              >
                {showWeekPrice(item)}
              </StyledStockText>
            ))}
          </div>
        </Tile>
        <Tile padding="5px" minHeight="250px" minWidth="650px" display="block">
          <Link
            href={`https://pl.tradingview.com/chart/tswqhFJr/?symbol=${stringQuotes(
              selecedQuotes
            )}`}
            target="_blank"
          >
            <Line options={options} data={chartData} />
          </Link>
        </Tile>
        <Tile minHeight="100%" display="block">
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
          <Tile padding="12px">
            <StyledCopy onClick={() => copyToClipboard(CS)}>CS</StyledCopy>
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
                  {
                    currencyPair.map((item) =>
                      window.open(
                        `https://pl.tradingview.com/chart/tswqhFJr/?symbol=${stringQuotes(
                          item
                        )}`,
                        "_blank"
                      )
                    );
                  }
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
