import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const [categoryGeneral, setCategoryGeneral] = useState([]);
  const [accountGeneral, setAccountGeneral] = useState([]);
  const [showMain, setShowMain] = useState(false);

  const baseURL = "http://f98f-46-1-227-44.ngrok.io";

  const year = new Date().getFullYear();
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const day = `0${new Date().getDate()}`.slice(-2);
  const today = `${year}${month}${day}`;

  function fetchCategoryGeneral(today) {
    fetch(`${baseURL}/categoryGeneral/daily/20211006`)
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        setCategoryGeneral(data);
      });
  }

  function fetchAccountGeneral(today) {
    fetch(`${baseURL}/accountGeneral/daily/20211006`)
      .then((response) => {
        if (response.ok) {
          setShowMain(true);
        }
        return response.json();
      })
      .then((data) => {
        setAccountGeneral(data);
      });
  }

  useEffect(() => {
    fetchCategoryGeneral(today);
    fetchAccountGeneral(today);
    const interval = setInterval(() => {
      fetchCategoryGeneral(today);
      fetchAccountGeneral(today);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
