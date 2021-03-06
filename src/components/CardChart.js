import { useEffect, useState } from "react/cjs/react.development";
import ReactApexChart from "react-apexcharts";
import classes from "./CardChart.module.css";

const CardChart = (props) => {
  const customerNumber = props.customerNumber;
  const cardNumberMonthly = props.cardMonthly;
  let initialCardNumber = [];

  if (cardNumberMonthly) {
    cardNumberMonthly.map((item) => initialCardNumber.push(item.card_no));
  }

  const [filterCard, setFilterCard] = useState(`${initialCardNumber[0]}`);
  const [filterPeriod, setFilterPeriod] = useState("weekly");
  const [cardWeekly, setCardWeekly] = useState([]);
  const [cardMonthly, setCardMonthly] = useState([]);

  const filterCardHandler = (e) => {
    setFilterCard(e.target.value);
  };

  const filterPeriodHandler = (e) => {
    setFilterPeriod(e.target.value);
  };

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

  const baseURL = props.baseURL;

  useEffect(() => {
    async function fetchCardDaily(customerNumber, startDate, today) {
      const response = await fetch(
        `${baseURL}/customer/card/daily/${customerNumber}/${startDate}/${today}`
      );

      const data = await response.json();

      setCardWeekly(data);
    }
    async function fetchCardMonthly(
      customerNumber,
      startDateMonth,
      monthlyPeriod
    ) {
      const response = await fetch(
        `${baseURL}/customer/card/monthly/${customerNumber}/${startDateMonth}/${monthlyPeriod}`
      );

      const data = await response.json();

      setCardMonthly(data);
    }
    fetchCardMonthly(customerNumber, startDateMonth, monthlyPeriod);
    fetchCardDaily(customerNumber, startDate, today);
  }, [customerNumber, monthlyPeriod, startDate, startDateMonth, today]);

  let filteredCardPeriodWeekly = [];
  let filteredCardAmountsWeekly = [];

  (filterPeriod === "weekly" ? cardWeekly : cardMonthly).map((item) => {
    console.log(item.period);
    const day = item.period.toString().split("").slice(6, 8).join("");
    const month = item.period.toString().split("").slice(4, 6).join("");
    const year = item.period.toString().split("").slice(0, 4).join("");
    item.card_no === +filterCard &&
      filteredCardPeriodWeekly.push(
        filterPeriod !== "weekly"
          ? item.period.toString().split("").slice(4, 6).join("") +
              "/" +
              item.period.toString().split("").slice(0, 4).join("")
          : item.period.toString().split("").slice(6, 8).join("") +
              "/" +
              item.period.toString().split("").slice(4, 6).join("") +
              "/" +
              item.period.toString().split("").slice(0, 4).join("")
      ) &&
      filteredCardAmountsWeekly.push(Math.abs(item.amount));
  });

  const state = {
    series: [
      {
        name: `${
          filterPeriod === "weekly" ? "Haftal??k" : "Ayl??k"
        } kart harcamalar??`,
        data: filteredCardAmountsWeekly,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: `${filterCard} nolu Kart Baz??nda ${
          filterPeriod === "weekly" ? "Haftal??k" : "Son 6 Ayl??k"
        } Harcamalar`,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: filteredCardPeriodWeekly,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toLocaleString("tr-TR") + " ???";
          },
        },
      },
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.selects}>
        <select name="card" id="" onChange={filterPeriodHandler}>
          <option value="weekly" id="weekly">
            Son 1 Haftal??k
          </option>
          <option value="monthly" id="monthly">
            Son 6 Ayl??k
          </option>
        </select>
        <select name="card" id="" onChange={filterCardHandler}>
          {cardNumberMonthly.map((item) => {
            return <option value={item.card_no}>{item.card_no}</option>;
          })}
        </select>
      </div>

      <div className={classes.lineChart}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={500}
          width={1200}
        />
      </div>
    </div>
  );
};

export default CardChart;
