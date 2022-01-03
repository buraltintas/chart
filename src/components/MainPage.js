import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react/cjs/react.development";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const [categoryGeneral, setCategoryGeneral] = useState([]);
  const [accountGeneral, setAccountGeneral] = useState([]);
  const [showMain, setShowMain] = useState(false);

  const baseURL = "http://f98f-46-1-227-44.ngrok.io";

  useEffect(() => {}, []);

  async function fetchGeneral() {
    const response1 = await fetch(`${baseURL}/categoryGeneral/daily/20211006`);
    const response2 = await fetch(`${baseURL}/accountGeneral/daily/20211006`);

    console.log(response1, response2);

    if (response1.ok && response2.ok) {
      setShowMain(true);
    }

    const dataCategoryGeneral = await response1.json();
    const dataAccountGeneral = await response2.json();

    setCategoryGeneral(dataCategoryGeneral);
    setAccountGeneral(dataAccountGeneral);
  }

  setInterval(() => {
    fetchGeneral();
  }, 7000);

  let categoryGeneralAmounts = [];

  categoryGeneral.map((item) => {
    categoryGeneralAmounts.push(Math.abs(item.amount));
  });

  let categoryGeneralName = [];

  categoryGeneral.map((item) => {
    categoryGeneralName.push(item.category);
  });

  let accountGeneralAmounts = [];

  accountGeneral.map((item) => {
    accountGeneralAmounts.push(Math.abs(item.amount));
  });

  let accountGeneralName = [];

  accountGeneral.map((item) => {
    accountGeneralName.push(item.trx_desc);
  });

  const stateCategoryGeneral = {
    series: categoryGeneralAmounts,
    options: {
      colors: [
        "#9775fa",
        "#9C27B0",
        "#F44336",
        "#E91E63",
        "#fab005",
        "#82c91e",
        "#12b886",
        "#15aabf",
        "#228be6",
      ],
      chart: {
        width: 380,
        type: "pie",
      },
      labels: categoryGeneralName,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const stateAccountGeneral = {
    series: accountGeneralAmounts,
    options: {
      colors: [
        "#e8590c",
        "#f08c00",
        "#66a80f",
        "#2f9e44",
        "#099268",
        "#0c8599",
        "#1971c2",
        "#91a7ff",
        "#7048e8",
        "#9c36b5",
        "#c2255c",
      ],
      chart: {
        width: 380,
        type: "pie",
      },
      labels: accountGeneralName,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className={classes.mainPageContainer}>
      {showMain && (
        <div className={classes.flex}>
          <h1 className={classes.text}>
            Toplam Kategori Bazında Kart Hareketleri
          </h1>
          <ReactApexChart
            options={stateCategoryGeneral.options}
            series={stateCategoryGeneral.series}
            type="pie"
            width={700}
            height={500}
          />
        </div>
      )}
      {showMain && (
        <div className={classes.flex}>
          <h1 className={classes.text}>
            Toplam Kategori Bazında Hesap Hareketleri
          </h1>
          <ReactApexChart
            options={stateAccountGeneral.options}
            series={stateAccountGeneral.series}
            type="pie"
            width={700}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
