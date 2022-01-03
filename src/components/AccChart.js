import classes from "./AccChart.module.css";
import ReactApexChart from "react-apexcharts";
import { useState, useRef, useEffect } from "react";

const AccChart = (props) => {
  const [category, setCategory] = useState("daily");
  const [barCategory, setBarCategory] = useState("7days");
  const [assetDaily, setAssetDaily] = useState([]);
  const [assetMonthly, setAssetMonthly] = useState([]);
  const [accRaw, setAccRaw] = useState([]);
  const [categoryDaily, setAccountDaily] = useState([]);
  const [categoryMonthly, setAccountMonthly] = useState([]);
  const categoryRef = useRef("");
  const barCategoryRef = useRef("");

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

  const baseURL = "http://f98f-46-1-227-44.ngrok.io";

  useEffect(() => {
    async function fetchAccountDaily(customerNumber, today) {
      const response = await fetch(
        `${baseURL}/customer/account/daily/${customerNumber}/${today}`
      );

      const data = await response.json();

      setAccountDaily(data);
    }
    async function fetchAccountMonthly(customerNumber, monthlyPeriod) {
      const response = await fetch(
        `${baseURL}/customer/account/monthly/${customerNumber}/${monthlyPeriod}`
      );

      const data = await response.json();

      setAccountMonthly(data);
    }
    async function fetchAssetDaily(customerNumber, today) {
      const response = await fetch(
        `${baseURL}/customer/asset/daily/${customerNumber}/${startDate}/${today}`
      );

      const data = await response.json();

      setAssetDaily(data);
    }
    async function fetchAssetMonthly(
      customerNumber,
      startDateMonth,
      monthlyPeriod
    ) {
      const response = await fetch(
        `${baseURL}/customer/asset/monthly/${customerNumber}/${startDateMonth}/${monthlyPeriod}`
      );

      const data = await response.json();

      setAssetMonthly(data);
    }
    async function fetchAccRaw(customerNumber, today) {
      const response = await fetch(
        `${baseURL}/transaction/account/${customerNumber}/20210101000000/${today}235959`
      );

      const data = await response.json();

      setAccRaw(data);
    }
    fetchAccountDaily(customerNumber, today);
    fetchAccountMonthly(customerNumber, monthlyPeriod);
    fetchAssetDaily(customerNumber, today);
    fetchAssetMonthly(customerNumber, startDateMonth, monthlyPeriod);
    fetchAccRaw(customerNumber, today);
  }, [customerNumber, monthlyPeriod, startDate, startDateMonth, today]);

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
    setBarCategory(barCategoryRef.current.value);
  };

  let positiveCategoryDaily = [];
  let negativeCategoryDaily = [];

  for (const key in categoryDaily) {
    const item = categoryDaily[key].amount;

    if (item < 0) {
      negativeCategoryDaily.push(item);
    } else {
      positiveCategoryDaily.push(item);
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

  if ((positiveCategoryDaily = [])) {
    positiveCategoryDaily.push([0]);
  }

  if ((negativeCategoryDaily = [])) {
    negativeCategoryDaily.push([0]);
  }

  let positiveCategoryMonthly = [];
  let negativeCategoryMonthly = [];

  for (const key in categoryMonthly) {
    const item = categoryMonthly[key].amount;

    if (item < 0) {
      negativeCategoryMonthly.push(item);
    } else {
      positiveCategoryMonthly.push(item);
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
    assetDailyExpense.push(Math.abs(item.expense_amount));
  });

  let assetDailyPeriod = [];
  assetDaily.map((item) => {
    const day = item.period.toString().split("").slice(6, 8).join("");
    const month = item.period.toString().split("").slice(4, 6).join("");
    const year = item.period.toString().split("").slice(0, 4).join("");
    assetDailyPeriod.push(`${day}/${month}/${year}`);
  });

  let assetMonthlyIncome = [];
  assetMonthly.map((item) => {
    assetMonthlyIncome.push(item.income_amount);
  });

  let assetMonthlyExpense = [];
  assetMonthly.map((item) => {
    assetMonthlyExpense.push(Math.abs(item.expense_amount));
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

  let pieCategory = [];

  (category === "daily" ? categoryDaily : categoryMonthly).map((item) => {
    pieCategory.push(item.trx_desc);
  });

  let pieAmounts = [];
  (category === "daily" ? categoryDaily : categoryMonthly).map((item) => {
    pieAmounts.push(Math.abs(item.amount));
  });

  const sortedRawData = accRaw
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    .reverse()
    .slice(0, 20);

  const gradient = {
    options: {
      colors: ["#17b417", "#b41111"],
      chart: {
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
        // type: "gradient",

        type: "solid",
        opacity: [0.75, 1],
      },
      legend: {
        show: false,
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
      colors: ["#17b417", "#b41111"],
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
        type: "solid",
        opacity: [0.75, 1],
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

  const state = {
    series: pieAmounts,

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
      legend: {
        labels: {
          useSeriesColors: true,
        },
      },
      fill: {
        type: "solid",
        opacity: [0.75, 1],
      },
      chart: {
        type: "donut",
      },
      labels: pieCategory,
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
    <div className={classes.container}>
      <div className={classes.flex}>
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
                <option value="6months">
                  Son {assetMonthlyPeriod.length} aylık işlemler
                </option>
              </select>
            </div>
          </div>
          <h4 className={classes.allCardsText}>
            Tüm varlıklar için gelen ve giden tutarlar
          </h4>
          <ReactApexChart
            options={bar.options}
            series={bar.series}
            type="bar"
            height={400}
            width={700}
          />
        </div>

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
      </div>
      <div className={classes.flex2}>
        <div className={classes.pieChart}>
          <h4 className={classes.allCardsText2}>
            Tüm hesaplar için {period} hareket kategorileri
          </h4>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            width={600}
          />
        </div>
        <div className={classes.accTransactions}>
          <h4 className={classes.allCardsText}>Son 20 hesap hareketleri</h4>
          <div className={classes.transactionTable}>
            <table className={classes.transactionTables}>
              <thead>
                <th>Hesap numarası</th>
                <th>İşlem tutarı</th>
                <th>İşlem açıklaması</th>
                <th>İşlem tarihi - saati</th>
              </thead>
              <tbody>
                <td>
                  <tr>
                    {sortedRawData.map((card) => {
                      return (
                        <tr className={classes.amounts}>{card.account_no}</tr>
                      );
                    })}
                  </tr>
                </td>
                <td>
                  <tr>
                    {sortedRawData.map((card) => {
                      return <tr>{card.amount.toLocaleString("tr-TR")} TL</tr>;
                    })}
                  </tr>
                </td>

                <td>
                  <tr>
                    {sortedRawData.map((card) => {
                      return <tr>{card.trx_desc}</tr>;
                    })}
                  </tr>
                </td>
                <td>
                  <tr>
                    {sortedRawData.map((card) => {
                      const minute = card.timestamp
                        .toString()
                        .split("")
                        .slice(10, 12)
                        .join("");
                      const hour = card.timestamp
                        .toString()
                        .split("")
                        .slice(8, 10)
                        .join("");
                      const day = card.timestamp
                        .toString()
                        .split("")
                        .slice(6, 8)
                        .join("");
                      const month = card.timestamp
                        .toString()
                        .split("")
                        .slice(4, 6)
                        .join("");
                      const year = card.timestamp
                        .toString()
                        .split("")
                        .slice(0, 4)
                        .join("");
                      return (
                        <tr>{`${day}/${month}/${year} - ${hour}:${minute}`}</tr>
                      );
                    })}
                  </tr>
                </td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccChart;
