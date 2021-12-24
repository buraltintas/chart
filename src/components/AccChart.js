import classes from "./AccChart.module.css";
import ReactApexChart from "react-apexcharts";
import { useState, useRef } from "react";

const AccChart = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [showData, setShowData] = useState(false);
  const [category, setCategory] = useState("daily");
  const categoryRef = useRef("");

  let period = "";

  if (category === "daily") {
    period = "günlük";
  }
  if (category === "weekly") {
    period = "haftalık";
  }
  if (category === "monthly") {
    period = "aylık";
  }

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(categoryRef.current.value);
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

  const categoryDaily = [
    {
      customer_no: "385932091",
      trx_code: "A02",
      amount: 5087,
      max_trx_date: 20211216201100,
      min_trx_date: 20211216201100,
      trx_count: 1,
      trx_desc: "Para Yatirma",
    },
    {
      customer_no: "385932091",
      trx_code: "A03",
      amount: -1761,
      max_trx_date: 20211216225300,
      min_trx_date: 20211216225300,
      trx_count: 1,
      trx_desc: "Havale",
    },
    {
      customer_no: "385932091",
      trx_code: "A04",
      amount: -490,
      max_trx_date: 20211216202300,
      min_trx_date: 20211216202300,
      trx_count: 1,
      trx_desc: "EFT",
    },
    {
      customer_no: "385932091",
      trx_code: "A07",
      amount: -323,
      max_trx_date: 20211216204100,
      min_trx_date: 20211216204100,
      trx_count: 1,
      trx_desc: "Telefon Faturasi Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "A08",
      amount: -885,
      max_trx_date: 20211217012000,
      min_trx_date: 20211217012000,
      trx_count: 1,
      trx_desc: "Diger Odeme",
    },
  ];

  let positiveCategoryDaily = [];
  let negativeCategoryDaily = [];

  for (const key in categoryDaily) {
    if (categoryDaily[key].customer_no === customerNumber) {
      const item = categoryDaily[key].amount;

      if (item < 0) {
        negativeCategoryDaily.push(item);
      } else {
        positiveCategoryDaily.push(item);
      }
    }
  }

  let sumPositiveAmountsDaily = 0;

  for (let i = 0; i < positiveCategoryDaily.length; i++) {
    sumPositiveAmountsDaily += Math.abs(positiveCategoryDaily[i]);
  }

  let sumNegativeAmountsDaily = 0;

  for (let i = 0; i < negativeCategoryDaily.length; i++) {
    sumNegativeAmountsDaily += Math.abs(negativeCategoryDaily[i]);
  }

  const categoryWeekly = [
    {
      customer_no: "385932091",
      trx_code: "A01",
      amount: -17837,
      max_trx_date: 20211224002900,
      min_trx_date: 20211217212600,
      trx_count: 16,
      trx_desc: "Para Cekme",
    },
    {
      customer_no: "385932091",
      trx_code: "A02",
      amount: 176407,
      max_trx_date: 20211223202300,
      min_trx_date: 20211217052300,
      trx_count: 23,
      trx_desc: "Para Yatirma",
    },
    {
      customer_no: "385932091",
      trx_code: "A03",
      amount: -32455,
      max_trx_date: 20211223134100,
      min_trx_date: 20211217055600,
      trx_count: 28,
      trx_desc: "Havale",
    },
    {
      customer_no: "385932091",
      trx_code: "A04",
      amount: -29217,
      max_trx_date: 20211223120200,
      min_trx_date: 20211217091700,
      trx_count: 20,
      trx_desc: "EFT",
    },
    {
      customer_no: "385932091",
      trx_code: "A05",
      amount: -32070,
      max_trx_date: 20211224022900,
      min_trx_date: 20211217124700,
      trx_count: 25,
      trx_desc: "Kredi Karti Borc Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "A06",
      amount: -34477,
      max_trx_date: 20211223221400,
      min_trx_date: 20211217055000,
      trx_count: 26,
      trx_desc: "Kredi Borc Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "A07",
      amount: -38190,
      max_trx_date: 20211223165900,
      min_trx_date: 20211217052000,
      trx_count: 27,
      trx_desc: "Dogalgaz Faturasi Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "A08",
      amount: -23863,
      max_trx_date: 20211223103500,
      min_trx_date: 20211217200200,
      trx_count: 19,
      trx_desc: "Diger Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "H01",
      amount: 220903,
      max_trx_date: 20211223175300,
      min_trx_date: 20211217112300,
      trx_count: 31,
      trx_desc: "Hesaba Gelen",
    },
    {
      customer_no: "385932091",
      trx_code: "H02",
      amount: -45818,
      max_trx_date: 20211223171400,
      min_trx_date: 20211217080800,
      trx_count: 35,
      trx_desc: "Hesaptan Havale",
    },
    {
      customer_no: "385932091",
      trx_code: "H03",
      amount: -37681,
      max_trx_date: 20211224025300,
      min_trx_date: 20211217051400,
      trx_count: 26,
      trx_desc: "Hesaptan EFT",
    },
    {
      customer_no: "385932091",
      trx_code: "H04",
      amount: -50905,
      max_trx_date: 20211223201700,
      min_trx_date: 20211217044400,
      trx_count: 38,
      trx_desc: "Virman",
    },
    {
      customer_no: "385932091",
      trx_code: "H05",
      amount: -60391,
      max_trx_date: 20211224021400,
      min_trx_date: 20211217072300,
      trx_count: 43,
      trx_desc: "Vade Temdit",
    },
  ];

  let positiveCategoryWeekly = [];
  let negativeCategoryWeekly = [];

  for (const key in categoryWeekly) {
    if (categoryWeekly[key].customer_no === customerNumber) {
      const item = categoryWeekly[key].amount;

      if (item < 0) {
        negativeCategoryWeekly.push(item);
      } else {
        positiveCategoryWeekly.push(item);
      }
    }
  }

  let sumPositiveAmountsWeekly = 0;

  for (let i = 0; i < positiveCategoryWeekly.length; i++) {
    sumPositiveAmountsWeekly += Math.abs(positiveCategoryWeekly[i]);
  }

  let sumNegativeAmountsWeekly = 0;

  for (let i = 0; i < negativeCategoryWeekly.length; i++) {
    sumNegativeAmountsWeekly += Math.abs(negativeCategoryWeekly[i]);
  }

  const categoryMonthly = [
    {
      customer_no: "385932091",
      trx_code: "A02",
      amount: 5087,
      max_trx_date: 20211216201100,
      min_trx_date: 20211216201100,
      trx_count: 1,
      trx_desc: "Para Yatirma",
    },
    {
      customer_no: "385932091",
      trx_code: "A03",
      amount: -1761,
      max_trx_date: 20211216225300,
      min_trx_date: 20211216225300,
      trx_count: 1,
      trx_desc: "Havale",
    },
    {
      customer_no: "385932091",
      trx_code: "A04",
      amount: -490,
      max_trx_date: 20211216202300,
      min_trx_date: 20211216202300,
      trx_count: 1,
      trx_desc: "EFT",
    },
    {
      customer_no: "385932091",
      trx_code: "A07",
      amount: -323,
      max_trx_date: 20211216204100,
      min_trx_date: 20211216204100,
      trx_count: 1,
      trx_desc: "Telefon Faturasi Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "A08",
      amount: -885,
      max_trx_date: 20211217012000,
      min_trx_date: 20211217012000,
      trx_count: 1,
      trx_desc: "Diger Odeme",
    },
    {
      customer_no: "385932091",
      trx_code: "H01",
      amount: 25397,
      max_trx_date: 20211216222000,
      min_trx_date: 20211216183200,
      trx_count: 3,
      trx_desc: "Hesaba Gelen",
    },
    {
      customer_no: "385932091",
      trx_code: "H05",
      amount: -2477,
      max_trx_date: 20211216232600,
      min_trx_date: 20211216193200,
      trx_count: 3,
      trx_desc: "Vade Temdit",
    },
  ];

  let positiveCategoryMonthly = [];
  let negativeCategoryMonthly = [];

  for (const key in categoryMonthly) {
    if (categoryMonthly[key].customer_no === customerNumber) {
      const item = categoryMonthly[key].amount;

      if (item < 0) {
        negativeCategoryMonthly.push(item);
      } else {
        positiveCategoryMonthly.push(item);
      }
    }
  }

  let sumPositiveAmountsMonthly = 0;

  for (let i = 0; i < positiveCategoryMonthly.length; i++) {
    sumPositiveAmountsMonthly += Math.abs(positiveCategoryMonthly[i]);
  }

  let sumNegativeAmountsMonthly = 0;

  for (let i = 0; i < negativeCategoryMonthly.length; i++) {
    sumNegativeAmountsMonthly += Math.abs(negativeCategoryMonthly[i]);
  }

  let sumPositive, sumNegative;

  if (category === "daily") {
    sumPositive = sumPositiveAmountsDaily;
    sumNegative = sumNegativeAmountsDaily;
  }

  if (category === "weekly") {
    sumPositive = sumPositiveAmountsWeekly;
    sumNegative = sumNegativeAmountsWeekly;
  }

  if (category === "monthly") {
    sumPositive = sumPositiveAmountsMonthly;
    sumNegative = sumNegativeAmountsMonthly;
  }

  const gradient = {
    options: {
      chart: {
        // events: {
        //   dataPointSelection: function (event, chartContext, config) {
        //     setShowIncome(true);
        //   },
        // },
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 0,
        },
      },
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: "gradient",
        colors: ["rgb(35, 131, 35)", "rgb(189, 24, 24)"],
      },
      legend: {
        show: false,
        formatter: function (val, opts) {
          return;
        },
      },

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
      labels: ["Gelen Tutarlar", "Giden Tutarlar"],
    },
  };

  return (
    <div className={classes.container}>
      <form
        onSubmit={customerNumberButtonHandler}
        className={classes.customerNumberInput}
      >
        {/* <h5>Kart Toplam Harcamalar</h5> */}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></circle>
              <line
                x1="175.4"
                y1="175.4"
                x2="224"
                y2="224"
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></line>
              <line
                x1="200"
                y1="200"
                x2="56"
                y2="56"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></line>
            </svg>
          </button>
        )}
      </form>
      {!positiveCategoryDaily.length && showData && (
        <h4>Müşteri numarası bulunamadı.</h4>
      )}
      {positiveCategoryDaily.length > 0 && showData && (
        <div className={classes.totalExpense}>
          <div className={classes.selectPeriod}>
            <div onSubmit={categoryHandler} className={classes.form}>
              <select
                name="period"
                id="period"
                ref={categoryRef}
                onChange={categoryHandler}
              >
                <option value="daily">Günlük hareketler</option>
                <option value="weekly">Haftalık hareketler</option>
                <option value="monthly">Aylık hareketler</option>
              </select>
              {/* <button>Getir</button> */}
            </div>
          </div>
          <h4 className={classes.allCardsText}>
            Tüm hesaplar için {period} gelen ve giden tutarlar
          </h4>
          <ReactApexChart
            options={gradient.options}
            series={[sumPositive, sumNegative]}
            type="donut"
            height={400}
          />
        </div>
      )}
    </div>
  );
};

export default AccChart;
