import React, { useState } from "react";
import "./App.css";
import TotalCardChart from "./components/TotalCardChart";
import classes from "../src/App.module.css";
import CardChart from "./components/CardChart";
import AccChart from "./components/AccChart";
import logo from "../src/fibabanka-logo.png";

function App() {
  const [showTotalCard, setShowTotalCard] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [showAcc, setShowAcc] = useState(false);
  const [showCardActive, setShowCardActive] = useState(false);
  const [totalCardActive, setTotalCardActive] = useState(true);
  const [showAccActive, setShowAccActive] = useState(false);

  const showTotalCardHandler = () => {
    setShowAcc(false);
    setShowTotalCard(true);
    setShowCard(false);
    setTotalCardActive(true);
    setShowCardActive(false);
    setShowAccActive(false);
  };

  const showCardHandler = () => {
    setShowAcc(false);
    setShowCard(true);
    setShowTotalCard(false);
    setTotalCardActive(false);
    setShowCardActive(true);
    setShowAccActive(false);
  };

  const showAccHandler = () => {
    setShowAcc(true);
    setShowCard(false);
    setShowTotalCard(false);
    setTotalCardActive(false);
    setShowCardActive(false);
    setShowAccActive(true);
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
      {showTotalCard && !showCard && !showAcc && <TotalCardChart />}
      {!showTotalCard && showCard && <CardChart />}
      {!showTotalCard && !showCard && showAcc && <AccChart />}
    </div>
  );
}

export default App;
