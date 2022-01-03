import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TotalCardChart from "./components/TotalCardChart";
import classes from "../src/App.module.css";
import CardChart from "./components/CardChart";
import AccChart from "./components/AccChart";
import logo from "../src/fibabanka-logo.png";
import LoadingSpinner from "./components/LoadingSpinner";
import MainPage from "./components/MainPage";

function App() {
  const [showCardActive, setShowCardActive] = useState(false);
  const [totalCardActive, setTotalCardActive] = useState(true);
  const [showAccActive, setShowAccActive] = useState(false);
  const [customerNumber, setCustomerNumber] = useState("");
  const [showData, setShowData] = useState(false);
  const [cardDaily, setCardDaily] = useState([]);
  const [cardRawData, setCardRawData] = useState([]);
  const [cardMonthly, setCardMonthly] = useState([]);
  const [categoryDaily, setCategoryDaily] = useState([]);
  const [categoryMonthly, setCategoryMonthly] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [load, setLoad] = useState(false);

  const totalCardChart = useRef();
  const cardChart = useRef();
  const accChart = useRef();

  const year = new Date().getFullYear();
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const day = `0${new Date().getDate()}`.slice(-2);
  const today = `${year}${month}${day}`;

  const monthlyPeriod = `${year}${month}`;

  const days = 7;
  const date = new Date();
  const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  const dayForAsset = `0${last.getDate()}`.slice(-2);
  const monthForAsset = `0${last.getMonth() + 1}`.slice(-2);
  const yearForAsset = last.getFullYear();
  const startDate = `${yearForAsset}${monthForAsset}${dayForAsset}`;

  const lastMonth = new Date(date.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
  const monthForAssetMonth = `0${lastMonth.getMonth() + 1}`.slice(-2);
  const yearForAssetMonth = lastMonth.getFullYear();

  const startDateMonth = `${yearForAssetMonth}${monthForAssetMonth}`;

  const showTotalCardHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setTotalCardActive(true);
    setShowAccActive(false);
    setShowCardActive(false);
  };

  const showCardHandler = () => {
    cardChart.current.scrollIntoView({
      behavior: "smooth",
    });

    setShowCardActive(true);
    setTotalCardActive(false);
    setShowAccActive(false);
  };

  const showAccHandler = () => {
    accChart.current.scrollIntoView({
      behavior: "smooth",
    });
    setShowAccActive(true);
    setShowCardActive(false);
    setTotalCardActive(false);
  };

  const baseURL = "http://f98f-46-1-227-44.ngrok.io";

  const customerNumberButtonHandler = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!customerNumber) return;

    async function fetchCardDaily(customerNumber, today) {
      const response1 = await fetch(
        `${baseURL}/customer/card/daily/${customerNumber}/${today}/${today}`
      );

      const data1 = await response1.json();

      setCardDaily(data1);

      const response2 = await fetch(
        `${baseURL}/transaction/credit/${customerNumber}/20210101000000/${today}235959`
      );

      const data2 = await response2.json();

      setCardRawData(data2);
      const response3 = await fetch(
        `${baseURL}/customer/category/daily/${customerNumber}/${today}`
      );
      const data3 = await response3.json();

      if (response2.ok && response3.ok) {
        setShowData(true);
        setLoad(false);
      }

      setCategoryDaily(data3);
    }
    async function fetchCardMonthly(customerNumber, monthlyPeriod) {
      const response1 = await fetch(
        `${baseURL}/customer/card/monthly/${customerNumber}/${monthlyPeriod}/${monthlyPeriod}`
      );

      const data1 = await response1.json();

      setCardMonthly(data1);
      const response2 = await fetch(
        `${baseURL}/customer/category/monthly/${customerNumber}/${monthlyPeriod}`
      );
      const data2 = await response2.json();

      setCategoryMonthly(data2);
    }
    fetchCardDaily(customerNumber, today);
    fetchCardMonthly(customerNumber, monthlyPeriod);

    setLoad(true);
  };

  const customerNumberHandler = (e) => {
    setCustomerNumber(e.target.value);
  };

  const clearHandler = () => {
    setCustomerNumber("");
    setShowData(false);
    setLoad(false);
    window.location.reload();
  };

  return (
    <div className="App">
      <nav className={classes.header}>
        <div className={classes.headerLogo}>
          <img
            src={logo}
            alt="logo of fibabanka"
            className={classes.logo}
            onClick={clearHandler}
          />
          <div className={classes.pfmText}>
            <h1>PFM</h1>
            {!showData && !load && (
              <h2 className={classes.instantText}>/ Güniçi Anlık</h2>
            )}
          </div>
        </div>
        {showData && (
          <div className={classes.buttons}>
            <ul className={classes.navButtons}>
              <li
                onClick={showTotalCardHandler}
                className={`${totalCardActive ? "active" : ""}`}
              >
                Kart Toplam Harcamalar
              </li>
              <li
                onClick={showCardHandler}
                className={showCardActive ? "active" : ""}
              >
                Kart Bazında Harcamalar
              </li>
              <li
                onClick={showAccHandler}
                className={showAccActive ? "active" : ""}
              >
                Hesap Hareketleri
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className={classes.form}>
        <h3 className={classes.customerDetailText}>
          Müşteri Detayı Görüntüleme
        </h3>
        <form
          onSubmit={customerNumberButtonHandler}
          className={classes.customerNumberInput}
        >
          <input
            type="number"
            placeholder="Müşteri numarası"
            value={customerNumber}
            onChange={customerNumberHandler}
            required
            disabled={showData}
          />
          {!showData && (
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="116"
                  cy="116"
                  r="84"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></circle>
                <line
                  x1="175.4"
                  y1="175.4"
                  x2="224"
                  y2="224"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
              </svg>
            </button>
          )}
          {showData && (
            <button type="button" onClick={clearHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="200"
                  y1="56"
                  x2="56"
                  y2="200"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="200"
                  y1="200"
                  x2="56"
                  y2="56"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
              </svg>
            </button>
          )}
        </form>
      </div>

      {!showData && !load && !formSubmitted ? (
        <MainPage />
      ) : (
        <React.Fragment></React.Fragment>
      )}

      {load && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      {showData && (
        <div ref={totalCardChart}>
          <TotalCardChart
            customerNumber={customerNumber}
            ref={totalCardChart}
            cardDaily={cardDaily}
            cardRawData={cardRawData}
            cardMonthly={cardMonthly}
            categoryDaily={categoryDaily}
            categoryMonthly={categoryMonthly}
          />
        </div>
      )}
      {showData && (
        <div ref={cardChart}>
          <CardChart
            customerNumber={customerNumber}
            cardMonthly={cardMonthly}
          />
        </div>
      )}
      {showData && (
        <div ref={accChart}>
          <AccChart customerNumber={customerNumber} />
        </div>
      )}
    </div>
  );
}

export default App;
