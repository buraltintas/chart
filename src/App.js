import React, { useState, useRef } from "react";
import "./App.css";
import TotalCardChart from "./components/TotalCardChart";
import classes from "../src/App.module.css";
import CardChart from "./components/CardChart";
import AccChart from "./components/AccChart";
import logo from "../src/fibabanka-logo.png";

function App() {
  // const [showTotalCard, setShowTotalCard] = useState(true);
  // const [showCard, setShowCard] = useState(false);
  // const [showAcc, setShowAcc] = useState(false);
  const [showCardActive, setShowCardActive] = useState(false);
  const [totalCardActive, setTotalCardActive] = useState(true);
  const [showAccActive, setShowAccActive] = useState(false);
  const [customerNumber, setCustomerNumber] = useState("");
  const [showData, setShowData] = useState(false);

  const totalCardChart = useRef();
  const cardChart = useRef();
  const accChart = useRef();

  const showTotalCardHandler = () => {
    console.log(totalCardChart.current);

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

  const customerNumberButtonHandler = (e) => {
    e.preventDefault();
    setShowData(true);
  };

  const customerNumberHandler = (e) => {
    setCustomerNumber(e.target.value);
  };

  const clearHandler = () => {
    setCustomerNumber("");
    setShowData(false);
  };

  return (
    <div className="App">
      <nav className={classes.header}>
        <div className={classes.headerLogo}>
          <img src={logo} alt="logo of fibabanka" className={classes.logo} />
          <div className={classes.pfmText}>
            <h1>PFM</h1>
          </div>
        </div>
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
      </nav>
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
      {showData && (
        <div ref={totalCardChart}>
          <TotalCardChart
            customerNumber={customerNumber}
            ref={totalCardChart}
          />
        </div>
      )}
      {showData && (
        <div ref={cardChart}>
          <CardChart customerNumber={customerNumber} />
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
