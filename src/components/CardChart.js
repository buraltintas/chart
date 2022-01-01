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

  console.log(filterCard);

  let filteredCardPeriodWeekly = [];
  let filteredCardAmountsWeekly = [];

  (filterPeriod === "weekly" ? cardWeekly : cardMonthly).map(
    (item) =>
      item.card_no === +filterCard &&
      filteredCardPeriodWeekly.push(item.period) &&
      filteredCardAmountsWeekly.push(Math.abs(item.amount))
  );

  console.log(filteredCardPeriodWeekly);

  const state = {
    series: [
      {
        name: `${
          filterPeriod === "weekly" ? "Haftalık" : "Aylık"
        } kart hareketleri`,
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
        text: `Kart Bazında ${
          filterPeriod === "weekly" ? "Haftalık" : "Aylık"
        } Hareketler`,
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
            return val.toLocaleString("tr-TR") + " TL";
          },
        },
      },
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.selects}>
        <select name="card" id="" onChange={filterPeriodHandler}>
          <option value="weekly">Haftalık</option>
          <option value="monthly">Son 6 Aylık</option>
        </select>
        <select name="card" id="" onChange={filterCardHandler}>
          <option value="all">Kart seçiniz</option>
          {cardNumberMonthly.map((item) => {
            return <option value={item.card_no}>{item.card_no}</option>;
          })}
        </select>
      </div>
      {filterCard.length > 0 && (
        <div className={classes.lineChart}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={500}
            width={1200}
          />
        </div>
      )}
    </div>
  );
};

export default CardChart;
