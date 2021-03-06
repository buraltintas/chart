import ReactApexChart from "react-apexcharts";
import classes from "./TotalCardChart.module.css";
import { useRef, useState, useEffect } from "react";

const NewChart = (props) => {
  const categoryRef = useRef("");
  const [category, setCategory] = useState("daily");
  const [clickedCardNumber, setClickedCardNumber] = useState("");
  const [showClickedCardChart, setShowClickedCardChart] = useState(false);
  const [filterCard, setFilterCard] = useState("all");
  const [clickedCardDaily, setclickedCardDaily] = useState([]);
  const [clickedCardMonthly, setclickedCardMonthly] = useState([]);

  let period = "";

  const customerNumber = props.customerNumber;

  if (category === "daily") {
    period = "günlük";
  }

  if (category === "monthly") {
    period = "aylık";
  }

  const year = new Date().getFullYear();
  const month = `0${new Date().getMonth() + 1}`.slice(-2);
  const day = `0${new Date().getDate()}`.slice(-2);
  const today = `${year}${month}${day}`;

  const monthlyPeriod = `${year}${month}`;

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategory(categoryRef.current.value);
  };

  const closeClickedCardChart = () => {
    setFilterCard("all");
    setClickedCardNumber("");
    setShowClickedCardChart(false);
  };

  const cardRawData = props.cardRawData;
  const cardDaily = props.cardDaily;

  let cardNumbersDaily = [];

  cardNumbersDaily.push(
    cardDaily.map((item) => customerNumber.length > 0 && item.card_no)
  );

  const cardMonthly = props.cardMonthly;

  let amountsDaily = [];

  let clickedAmounts = [];

  if (clickedCardNumber && category === "monthly") {
    clickedAmounts.push(
      cardMonthly.filter(
        (item) => item.card_no === +clickedCardNumber && Math.abs(item.amount)
      )
    );
  } else if (clickedCardNumber && category === "daily") {
    clickedAmounts.push(
      cardDaily.filter(
        (item) => item.card_no === +clickedCardNumber && Math.abs(item.amount)
      )
    );
  }

  amountsDaily.push(cardDaily.map((item) => Math.abs(item.amount)));

  let sumAmountsDaily = 0;

  for (let i = 0; i < amountsDaily[0].length; i++) {
    sumAmountsDaily += Math.abs(amountsDaily[0][i]);
  }

  let percentageAmountsDaily = amountsDaily[0].map((item) =>
    Math.round((item * 100) / sumAmountsDaily)
  );

  let cardNumbersMonthly = [];

  cardNumbersMonthly.push(cardMonthly.map((item) => item.card_no));

  let amountsMonthly = [];
  amountsMonthly.push(cardMonthly.map((item) => Math.abs(item.amount)));

  let sumAmountsMonthly = 0;

  for (let i = 0; i < amountsMonthly[0].length; i++) {
    sumAmountsMonthly += Math.abs(amountsMonthly[0][i]);
  }

  let percentageAmountsMonthly = amountsMonthly[0].map(
    (item) => +`${Math.round((item * 100) / sumAmountsMonthly)}`
  );

  const categoryDaily = props.categoryDaily;

  let categoryAmountsDaily = [];
  categoryAmountsDaily.push(categoryDaily.map((item) => Math.abs(item.amount)));

  let categoryNameDaily = [];

  categoryNameDaily.push(categoryDaily.map((item) => item.category));

  const categoryMonthly = props.categoryMonthly;

  let categoryAmountsMonthly = [];

  categoryAmountsMonthly.push(
    categoryMonthly.map((item) => Math.abs(item.amount))
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

  const filterCardHandler = (e) => {
    setFilterCard(e.target.value);
  };

  const cardNumbersFilter = cardMonthly.map(
    (item) =>
      item.customer_no === customerNumber &&
      customerNumber.length > 0 &&
      item.card_no
  );

  let sortedCardRawData;

  if (filterCard === "all") {
    sortedCardRawData = cardRawData
      .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
      .reverse()
      .slice(0, 35);
  }

  if (filterCard !== "all") {
    sortedCardRawData = cardRawData
      .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
      .reverse()
      .filter((item) => item.card_no === filterCard.toString())
      .slice(0, 35);
  }

  const cardExpense = {
    series: categoryAmounts[0],
    options: {
      chart: {
        width: 380,
        type: "donut",
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

  const baseURL = props.baseURL;

  const gradient = {
    options: {
      chart: {
        events: {
          dataPointSelection: function (event, chartContext, config) {
            // console.log(config.w.config.labels[config.dataPointIndex]);

            setClickedCardNumber(config.w.config.labels[config.dataPointIndex]);

            setFilterCard(
              config.w.config.labels[config.dataPointIndex].toString()
            );

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

  useEffect(() => {
    if (clickedCardNumber > 0) {
      async function fetchCardDaily(customerNumber, today) {
        const response = await fetch(
          `${baseURL}/customer/card/category/daily/${customerNumber}/${clickedCardNumber}/${today}`
        );

        const data = await response.json();

        setclickedCardDaily(data);
      }
      async function fetchCardMonthly(customerNumber, monthlyPeriod) {
        const response = await fetch(
          `${baseURL}/customer/card/category/monthly/${customerNumber}/${clickedCardNumber}/${monthlyPeriod}`
        );

        const data = await response.json();

        setclickedCardMonthly(data);
      }
      fetchCardMonthly(customerNumber, monthlyPeriod);
      fetchCardDaily(customerNumber, today);
    }
  }, [clickedCardNumber]);

  const clickedCardCategoryNameDaily = [];

  clickedCardDaily.filter(
    (item) =>
      item.card_no === clickedCardNumber &&
      clickedCardCategoryNameDaily.push(item.category)
  );

  const clickedCardCategoryAmountsDaily = [];

  clickedCardDaily.filter(
    (item) =>
      item.card_no === clickedCardNumber &&
      clickedCardCategoryAmountsDaily.push(Math.abs(item.amount))
  );

  const clickedCardCategoryNameMonthly = [];

  clickedCardMonthly.filter(
    (item) =>
      item.card_no === clickedCardNumber &&
      clickedCardCategoryNameMonthly.push(item.category)
  );

  const clickedCardCategoryAmountsMonthly = [];

  clickedCardMonthly.filter(
    (item) =>
      item.card_no === clickedCardNumber &&
      clickedCardCategoryAmountsMonthly.push(Math.abs(item.amount))
  );

  let clickedCardCategoryData, clickedCardAmountData;

  if (period === "günlük") {
    clickedCardCategoryData = clickedCardCategoryNameDaily;
    clickedCardAmountData = clickedCardCategoryAmountsDaily;
  }

  if (period === "aylık") {
    clickedCardCategoryData = clickedCardCategoryNameMonthly;
    clickedCardAmountData = clickedCardCategoryAmountsMonthly;
  }

  const clickedCardExpense = {
    series: clickedCardAmountData,
    options: {
      chart: {
        width: 380,
        type: "polarArea",
      },
      labels: clickedCardCategoryData,
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

  console.log(filterCard.toString());

  return (
    <div className={classes.container}>
      <div className={classes.left}>
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
          <div className={classes.donutChart}>
            <ReactApexChart
              options={gradient.options}
              series={percentageAmounts}
              type="donut"
              height={350}
              width={600}
            />
          </div>
        </div>
        <div className={classes.totalExpenseText}>
          <h2>
            {clickedCardNumber
              ? `${clickedCardNumber} nolu kart`
              : "Tüm kartlar"}{" "}
            {period} harcama
          </h2>
          <h2>{`${
            clickedCardNumber
              ? Math.abs(clickedAmounts[0][0].amount).toLocaleString("tr-TR")
              : sumAmounts.toLocaleString("tr-TR")
          } ₺`}</h2>
        </div>

        {cardNumbersDaily[0][0] && showClickedCardChart && (
          <div className={classes.clickedCardChart}>
            <h4 className={classes.allCardsText}>
              {clickedCardNumber} nolu kart bazında {period} harcama
              kategorileri
            </h4>
            <div className={classes.clickedArea}>
              <ReactApexChart
                className={classes.cardExpense}
                options={clickedCardExpense.options}
                series={clickedCardExpense.series}
                type="donut"
                width={600}
                height={400}
              />
            </div>
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
                type="donut"
                width={600}
                height={300}
              />
            </div>
          </div>
        )}
      </div>
      <div className={classes.container}>
        {cardNumbers[0] && (
          <div className={classes.select}>
            <h3 className={classes.headerTable}>
              {filterCard === "all" ? "Tüm kartlar" : filterCard + " nolu kart"}{" "}
              son 35 hareket
            </h3>
            {/* <select name="card" id="" onChange={filterCardHandler}>
              <option value="all">Tüm kartlar</option>
              {cardNumbersFilter.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select> */}
            {filterCard && (
              <div className={classes.transactionTable}>
                <table className={classes.transactionTables}>
                  <thead>
                    <th>Kart numarası</th>
                    <th>İşlem tutarı</th>
                    <th>İşlem kategorisi</th>
                    <th>İşlem açıklaması</th>
                    <th>İşlem tarihi - saati</th>
                  </thead>
                  <tbody>
                    <td>
                      <tr>
                        {sortedCardRawData.map((card) => {
                          if (card.card_no === filterCard.toString()) {
                            return <tr>{card.card_no}</tr>;
                          }
                          if (filterCard === "all" || "") {
                            return <tr>{card.card_no}</tr>;
                          }
                        })}
                      </tr>
                    </td>
                    <td>
                      <tr>
                        {sortedCardRawData.map((card) => {
                          if (card.card_no === filterCard.toString()) {
                            return (
                              <tr>{card.amount.toLocaleString("tr-TR")} ₺</tr>
                            );
                          }
                          if (filterCard === "all" || "") {
                            return (
                              <tr>{card.amount.toLocaleString("tr-TR")} ₺</tr>
                            );
                          }
                        })}
                      </tr>
                    </td>
                    <td>
                      <tr>
                        {sortedCardRawData.map((card) => {
                          if (card.card_no === filterCard.toString()) {
                            return <tr>{card.category}</tr>;
                          }
                          if (filterCard === "all" || "") {
                            return <tr>{card.category}</tr>;
                          }
                        })}
                      </tr>
                    </td>
                    <td>
                      <tr>
                        {sortedCardRawData.map((card) => {
                          if (card.card_no === filterCard.toString()) {
                            return <tr>{card.trx_desc}</tr>;
                          }
                          if (filterCard === "all" || "") {
                            return <tr>{card.trx_desc}</tr>;
                          }
                        })}
                      </tr>
                    </td>
                    <td>
                      <tr>
                        {sortedCardRawData.map((card) => {
                          if (card.card_no === filterCard.toString()) {
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
                          }
                          if (filterCard === "all" || "") {
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
                          }
                        })}
                      </tr>
                    </td>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewChart;
