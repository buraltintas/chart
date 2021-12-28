import ReactApexChart from "react-apexcharts";
import classes from "./TotalCardChart.module.css";
import { useRef, useState } from "react";

const NewChart = (props) => {
  const categoryRef = useRef("");
  const [category, setCategory] = useState("daily");
  const [clickedCardNumber, setClickedCardNumber] = useState("");
  const [showClickedCardChart, setShowClickedCardChart] = useState(false);
  const [cardRawData, setCardRawData] = useState("");
  const [cardDaily, setCardDaily] = useState("");
  const [cardMonthly, setCardMonthly] = useState("");
  const [categoryDaily, setCategoryDaily] = useState("");
  const [categoryMonthly, setCategoryMonthly] = useState("");

  let period = "";

  const customerNumber = props.customerNumber;

  if (category === "daily") {
    period = "günlük";
  }

  if (category === "monthly") {
    period = "aylık";
  }

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(categoryRef.current.value);
  };

  const closeClickedCardChart = () => {
    setShowClickedCardChart(false);
  };

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const today = `${year}${month + 1}${day}`;

  function fetchCardRawData(customerNumber, today) {
    fetch(
      `http://127.0.0.1:8000/transaction/credit/${customerNumber}/20211118113800/${today}000000`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardRawData(data);
      });
  }
  fetchCardRawData(customerNumber, today);

  function fetchCardDaily(customerNumber, today) {
    fetch(
      `http://127.0.0.1:8000/customer/card/daily/${customerNumber}/${today}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardDaily(data);
      });
  }
  fetchCardDaily(customerNumber, today);

  let cardNumbersDaily = [];

  cardNumbersDaily.push(
    cardDaily.map((item) => customerNumber.length > 0 && item.card_no)
  );

  let amountsDaily = [];
  amountsDaily.push(
    cardDaily.map((item) => customerNumber.length > 0 && Math.abs(item.amount))
  );

  let sumAmountsDaily = 0;

  for (let i = 0; i < amountsDaily[0].length; i++) {
    sumAmountsDaily += Math.abs(amountsDaily[0][i]);
  }

  let percentageAmountsDaily = amountsDaily[0].map((item) =>
    Math.round((item * 100) / sumAmountsDaily)
  );

  const monthlyPeriod = `${year}${month + 1}`;

  function fetchCardMonthly(customerNumber, monthlyPeriod) {
    fetch(
      `http://127.0.0.1:8000/customer/card/monthly/${customerNumber}/${monthlyPeriod}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardMonthly(data);
      });
  }
  fetchCardMonthly(customerNumber, monthlyPeriod);

  let cardNumbersMonthly = [];

  cardNumbersMonthly.push(
    cardMonthly.map((item) => customerNumber.length > 0 && item.card_no)
  );

  let amountsMonthly = [];
  amountsMonthly.push(
    cardMonthly.map(
      (item) => customerNumber.length > 0 && Math.abs(item.amount)
    )
  );

  let sumAmountsMonthly = 0;

  for (let i = 0; i < amountsMonthly[0].length; i++) {
    sumAmountsMonthly += Math.abs(amountsMonthly[0][i]);
  }

  let percentageAmountsMonthly = amountsMonthly[0].map(
    (item) => +`${Math.round((item * 100) / sumAmountsMonthly)}`
  );

  function fetchCategoryDaily(customerNumber, today) {
    fetch(
      `http://127.0.0.1:8000/customer/category/daily/${customerNumber}/${today}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategoryDaily(data);
      });
  }
  fetchCategoryDaily(customerNumber, today);

  let categoryAmountsDaily = [];
  categoryAmountsDaily.push(
    categoryDaily.map(
      (item) => customerNumber.length > 0 && Math.abs(item.amount)
    )
  );

  let categoryNameDaily = [];

  categoryNameDaily.push(
    categoryDaily.map((item) => customerNumber.length > 0 && item.category)
  );

  function fetchCategoryMonthly(customerNumber, monthlyPeriod) {
    fetch(
      `http://127.0.0.1:8000/customer/category/monthly/${customerNumber}/${monthlyPeriod}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategoryMonthly(data);
      });
  }
  fetchCategoryMonthly(customerNumber, monthlyPeriod);

  let categoryAmountsMonthly = [];

  categoryAmountsMonthly.push(
    categoryMonthly.map(
      (item) => customerNumber.length > 0 && Math.abs(item.amount)
    )
  );

  let categoryNameMonthly = [];

  categoryNameMonthly.push(
    categoryMonthly.map((item) => customerNumber.length > 0 && item.category)
  );

  let percentageAmounts, sumAmounts, cardNumbers, categoryName, categoryAmounts;

  if (category === "daily") {
    percentageAmounts = percentageAmountsDaily;
    sumAmounts = sumAmountsDaily;
    cardNumbers = cardNumbersDaily;
    categoryName = categoryNameDaily;
    categoryAmounts = categoryAmountsDaily;
  }

  if (category === "monthly") {
    percentageAmounts = percentageAmountsMonthly;
    sumAmounts = sumAmountsMonthly;
    cardNumbers = cardNumbersMonthly;
    categoryName = categoryNameMonthly;
    categoryAmounts = categoryAmountsMonthly;
  }

  const clickedCardCategoryAmounts = [];

  cardRawData.filter(
    (item) =>
      item.card_no === clickedCardNumber &&
      clickedCardCategoryAmounts.push(Math.abs(item.amount))
  );

  const clickedCardCategoryName = [];

  cardRawData.filter(
    (item) =>
      item.card_no === clickedCardNumber &&
      clickedCardCategoryName.push(item.category)
  );

  const cardExpense = {
    series: categoryAmounts[0],
    options: {
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: categoryName[0],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "right",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 1,
          },
          spokes: {
            strokeWidth: 1,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    },
  };

  const gradient = {
    options: {
      chart: {
        events: {
          dataPointSelection: function (event, chartContext, config) {
            // console.log(config.w.config.series[config.dataPointIndex]);

            setClickedCardNumber(config.w.config.labels[config.dataPointIndex]);
            setShowClickedCardChart(true);
          },
        },
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
      labels: cardNumbers[0],
    },
  };

  const clickedCardExpense = {
    series: clickedCardCategoryAmounts,
    options: {
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: clickedCardCategoryName,
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "right",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 1,
          },
          spokes: {
            strokeWidth: 1,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          shadeIntensity: 0.6,
        },
      },
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.totalExpense}>
        <div className={classes.selectPeriod}>
          <div className={classes.form}>
            <select
              name="period"
              id="period"
              ref={categoryRef}
              onChange={categoryHandler}
            >
              <option value="daily">Günlük harcamalar</option>

              <option value="monthly">Aylık harcamalar</option>
            </select>
          </div>
        </div>

        <ReactApexChart
          options={gradient.options}
          series={percentageAmounts}
          type="donut"
          height={400}
        />
        <h3>Toplam Harcama</h3>
        <h2>{`${sumAmounts.toLocaleString("tr-TR")} TL`}</h2>
      </div>

      {cardNumbersDaily[0][0] && showClickedCardChart && (
        <div className={classes.clickedCardChart}>
          <h4 className={classes.allCardsText}>
            {clickedCardNumber} nolu kart bazında tüm harcama kategorileri
          </h4>
          <ReactApexChart
            className={classes.cardExpense}
            options={clickedCardExpense.options}
            series={clickedCardExpense.series}
            type="polarArea"
            width={900}
            height={400}
          />
          <button
            type="button"
            onClick={closeClickedCardChart}
            className={classes.closeButton}
          >
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
        </div>
      )}

      {!showClickedCardChart && cardNumbersDaily[0][0] && (
        <div className={classes.cardExpenses}>
          <div className={classes.expense}>
            <h4 className={classes.allCardsText}>
              Tüm kartlar için {period} harcama kategorileri
            </h4>
            <ReactApexChart
              className={classes.cardExpense}
              options={cardExpense.options}
              series={cardExpense.series}
              type="polarArea"
              width={900}
              height={400}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewChart;
