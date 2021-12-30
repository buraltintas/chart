import { useState } from "react/cjs/react.development";
import ReactApexChart from "react-apexcharts";
import classes from "./CardChart.module.css";

const CardChart = (props) => {
  const [filterCard, setFilterCard] = useState("");

  const filterCardHandler = (e) => {
    setFilterCard(e.target.value);
  };

  const customerNumber = props.customerNumber;

  const cardRawData = props.cardRawData;
  const cardDaily = props.cardDaily;
  const cardMonthly = props.cardMonthly;
  const categoryDaily = props.categoryDaily;
  const categoryMonthly = props.categoryMonthly;

  const cardNumbers = cardDaily.map(
    (item) =>
      item.customer_no === customerNumber &&
      customerNumber.length > 0 &&
      item.card_no
  );

  console.log(categoryDaily);
  console.log(categoryMonthly);

  const sortedCardRawData = cardRawData
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    .reverse();

  // const filteredItems = cardRawData.filter(
  //   (item) =>
  //     item.customer_no.includes(customerNumber) &&
  //     customerNumber.length > 0 &&
  //     filterCard.length > 0 &&
  //     item.card_no.includes(filterCard)
  // );

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
        text: "Product Trends by Month",
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
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={400}
        width={900}
      />
    </div>
  );
};

export default CardChart;
