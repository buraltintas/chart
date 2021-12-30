import classes from "./AccChart.module.css";
import ReactApexChart from "react-apexcharts";
import { useState, useRef } from "react";

const AccChart = (props) => {
  const [category, setCategory] = useState("daily");
  const [barCategory, setBarCategory] = useState("7days");
  const categoryRef = useRef("");
  const barCategoryRef = useRef("");

  const customerNumber = props.customerNumber;

  const categoryDaily = props.accountDaily;
  const categoryMonthly = props.accountMonthly;
  const assetDaily = props.assetDaily;
  const assetMonthly = props.assetMonthly;

  console.log(assetDaily);
  console.log(assetMonthly);

  let period = "";

  if (category === "daily") {
    period = "günlük";
  }

  if (category === "monthly") {
    period = "aylık";
  }

  let barPeriod = "";

  if (barCategory === "7days") {
    barPeriod = "7days";
  }

  if (barCategory === "6months") {
    barPeriod = "6months";
  }

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(categoryRef.current.value);
  };

  const barCategoryHandler = (e) => {
    e.preventDefault();
    setBarCategory(categoryRef.current.value);
  };

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

  if (category === "monthly") {
    sumPositive = sumPositiveAmountsMonthly;
    sumNegative = sumNegativeAmountsMonthly;
  }

  let assetDailyIncome = [];
  assetDaily.map((item) => {
    assetDailyIncome.push(item.income_amount);
  });

  let assetDailyExpense = [];
  assetDaily.map((item) => {
    assetDailyExpense.push(item.expense_amount);
  });

  let assetDailyPeriod = [];
  assetDaily.map((item) => {
    const day = item.period.toString().split("").slice(6, 8).join("");
    const month = item.period.toString().split("").slice(4, 6).join("");
    const year = item.period.toString().split("").slice(0, 4).join("");
    assetDailyPeriod.push(`${day}/${month}/${year}`);
  });

  let assetMonthlyIncome = [];
  assetDaily.map((item) => {
    assetMonthlyIncome.push(item.income_amount);
  });

  let assetMonthlyExpense = [];
  assetMonthly.map((item) => {
    assetMonthlyExpense.push(item.expense_amount);
  });

  let assetMonthlyPeriod = [];
  assetMonthly.map((item) => {
    const month = item.period.toString().split("").slice(4, 6).join("");
    const year = item.period.toString().split("").slice(0, 4).join("");
    assetMonthlyPeriod.push(`${month}/${year}`);
  });

  let assetIncome, assetExpense, assetPeriod;

  if (barCategory === "7days") {
    assetIncome = assetDailyIncome;
    assetExpense = assetDailyExpense;
    assetPeriod = assetDailyPeriod;
  }

  if (barCategory === "6months") {
    assetIncome = assetMonthlyIncome;
    assetExpense = assetMonthlyExpense;
    assetPeriod = assetMonthlyPeriod;
  }

  console.log(barCategory);

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

  const bar = {
    series: [
      {
        name: "Gelen tutarlar",
        data: assetIncome,
      },
      {
        name: "Giden tutarlar",
        data: assetExpense,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: assetPeriod,
      },
      yaxis: {
        title: {
          text: "TL",
        },
      },
      fill: {
        opacity: 1,
        colors: ["#17b417", "#b41111"],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " TL";
          },
        },
      },
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.barChart}>
        <div className={classes.selectPeriod}>
          <div onSubmit={categoryHandler}>
            <select
              name="barPeriod"
              id="barPeriod"
              ref={barCategoryRef}
              onChange={barCategoryHandler}
            >
              <option value="7days">Son 7 günlük işlemler</option>
              <option value="6months">Son 6 aylık işlemler</option>
            </select>
          </div>
        </div>
        <h4 className={classes.allCardsText}>
          Hesaplar ve kredi kartları için gelen ve giden tutarlar
        </h4>
        <ReactApexChart
          options={bar.options}
          series={bar.series}
          type="bar"
          height={400}
          width={700}
        />
      </div>
      {positiveCategoryDaily.length > 0 && (
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
                <option value="monthly">Aylık hareketler</option>
              </select>
            </div>
          </div>
          <h4 className={classes.allCardsText}>
            Tüm hesaplar için {period} gelen ve giden tutarlar
          </h4>

          <ReactApexChart
            className={classes.gradientChart}
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
