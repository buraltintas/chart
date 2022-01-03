import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import classes from "./MainPage.module.css";

const MainPage = () => {
  const [categoryGeneral, setCategoryGeneral] = useState([]);
  const [accountGeneral, setAccountGeneral] = useState([]);
  const [showMain, setShowMain] = useState(false);
  const [accountKPIGeneral, setAccountKPIGeneral] = useState([]);
  const [categoryKPIGeneral, setCategoryKPIGeneral] = useState([]);
  const [totalCountKPI, setTotalCountKPI] = useState({});

  const baseURL = "http://f98f-46-1-227-44.ngrok.io";

  const year = new Date().getFullYear();
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const day = `0${new Date().getDate()}`.slice(-2);
  const today = `${year}${month}${day}`;

  function fetchCategoryGeneral(today) {
    fetch(`${baseURL}/categoryGeneral/daily/${today}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategoryGeneral(data);
      });
  }

  function fetchAccountGeneral(today) {
    fetch(`${baseURL}/accountGeneral/daily/${today}`)
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

  function fetchAccountKPIGeneral(today) {
    fetch(`${baseURL}/accountGeneral/kpi/${today}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAccountKPIGeneral(data);
      });
  }

  function fetchCategoryKPIGeneral(today) {
    fetch(`${baseURL}/categoryGeneral/kpi/${today}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategoryKPIGeneral(data);
      });
  }

  function fetchTotalCountKPI(today) {
    fetch(`${baseURL}/totalCount/kpi/${today}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalCountKPI(data);
      });
  }

  useEffect(() => {
    fetchAccountKPIGeneral(today);
    fetchCategoryKPIGeneral(today);
    fetchCategoryGeneral(today);
    fetchAccountGeneral(today);
    fetchTotalCountKPI(today);
    const interval = setInterval(() => {
      fetchAccountKPIGeneral(today);
      fetchCategoryKPIGeneral(today);
      fetchCategoryGeneral(today);
      fetchAccountGeneral(today);
      fetchTotalCountKPI(today);
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

  let gelenHavaleAmount, gidenHavaleAmount, gelenEftAmount, gidenEftAmount;

  let gelenEFTTRX, gidenEFTTRX;

  accountGeneral.map((item) => {
    if (item.trx_desc === "Gelen Havale") gelenHavaleAmount = item.amount;
    if (item.trx_desc === "Giden Havale") gidenHavaleAmount = item.amount;
    if (item.trx_desc === "Gelen EFT") gelenEftAmount = item.amount;
    if (item.trx_desc === "Giden EFT") gidenEftAmount = item.amount;
    if (item.trx_desc === "Gelen EFT") gelenEFTTRX = item.trx_count;
    if (item.trx_desc === "Giden EFT") gidenEFTTRX = item.trx_count;
  });

  const stateCategoryGeneral = {
    series: categoryGeneralAmounts,
    dataLabels: {
      enabled: true,
    },
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
        "#1971c2",
        "#f08c00",
        "#66a80f",
        "#2f9e44",
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
              position: "right",
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
              position: "right",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      {accountKPIGeneral.income_amount && accountKPIGeneral.income_amount && (
        <div className={classes.kpiContainer}>
          <div className={classes.kpi}>
            <h5>Toplam İşlem Sayısı</h5>
            <h6>{totalCountKPI.total_trx_count.toLocaleString("tr-TR")}</h6>
          </div>
          <div className={classes.kpi}>
            <h5>Gelen EFT İşlem Sayısı</h5>
            <h6>{gelenEFTTRX}</h6>
          </div>
          <div className={classes.kpi}>
            <h5>Gelen EFT Toplamı</h5>
            {gelenEftAmount && (
              <h6>{gelenEftAmount.toLocaleString("tr-TR")} ₺</h6>
            )}
          </div>
          <div className={classes.kpi}>
            <h5>Giden EFT İşlem Sayısı</h5>
            <h6>{gidenEFTTRX}</h6>
          </div>
          <div className={classes.kpi}>
            <h5>Giden EFT Toplamı</h5>
            {gidenEftAmount && (
              <h6>{gidenEftAmount.toLocaleString("tr-TR")} ₺</h6>
            )}
          </div>
          <div className={classes.kpi}>
            <h5>Kart Toplam İşlem Sayısı</h5>
            <h6>{totalCountKPI.card_trx_count}</h6>
          </div>
          <div className={classes.kpi}>
            <h5>Kart Toplam Harcama</h5>
            {categoryKPIGeneral.outcome_amount && (
              <h6>
                {Math.abs(
                  categoryKPIGeneral.outcome_amount.toLocaleString("tr-TR")
                )}{" "}
                ₺
              </h6>
            )}
          </div>
        </div>
      )}

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
              width={735}
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
    </div>
  );
};

export default MainPage;
