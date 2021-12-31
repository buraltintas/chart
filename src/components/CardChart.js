import { useEffect, useState } from "react/cjs/react.development";
import ReactApexChart from "react-apexcharts";
import classes from "./CardChart.module.css";

const CardChart = (props) => {
  const [filterCard, setFilterCard] = useState("");
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
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const today = `${year}${month + 1}${day}`;
  const monthlyPeriod = `${year}${month + 1}`;

  const days = 7;
  const date = new Date();
  const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  const dayForAsset = last.getDate();
  const monthForAsset = last.getMonth() + 1;
  const yearForAsset = last.getFullYear();
  const startDate = `${yearForAsset}${monthForAsset}${dayForAsset}`;

  const lastMonth = new Date(date.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
  const monthForAssetMonth = `0${lastMonth.getMonth() + 1}`.slice(-2);
  const yearForAssetMonth = lastMonth.getFullYear();
  const startDateMonth = `${yearForAssetMonth}${monthForAssetMonth}`;

  const customerNumber = props.customerNumber;
  const cardNumberMonthly = props.cardMonthly;

  const baseURL = "http://f98f-46-1-227-44.ngrok.io";

  useEffect(() => {
    async function fetchCardDaily(customerNumber, startDate, today) {
      const response = await fetch(
        `${baseURL}/customer/card/daily/${customerNumber}/${startDate}/${today}`
      );

      console.log("cardDaily", response);

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

      console.log("cardMonthly", response);

      const data = await response.json();

      setCardMonthly(data);
    }
    fetchCardMonthly(customerNumber, startDateMonth, monthlyPeriod);
    fetchCardDaily(customerNumber, startDate, today);
  }, []);

  console.log(cardWeekly);
  console.log(cardMonthly);

  let cardNumbersFilter = [];

  cardNumbersFilter.push(cardNumberMonthly.map((item) => item.card_no));

  console.log(cardNumbersFilter);

  const state = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
        text: "Kart Bazında Harcama Grafiği",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.selects}>
        <select name="card" id="" onChange={filterPeriodHandler}>
          <option value="weekly">Haftalık</option>
          <option value="monthly">Aylık</option>
        </select>
        <select name="card" id="" onChange={filterCardHandler}>
          <option value="all">Kart seçiniz</option>
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
