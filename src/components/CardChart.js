import { useState } from "react/cjs/react.development";
import ReactApexChart from "react-apexcharts";
import classes from "./CardChart.module.css";

const CardChart = (props) => {
  const [filterCard, setFilterCard] = useState("");
  const [cardRawData, setCardRawData] = useState("");
  const [cardDaily, setCardDaily] = useState("");
  const [cardMonthly, setCardMonthly] = useState("");

  const customerNumber = props.customerNumber;

  const filterCardHandler = (e) => {
    setFilterCard(e.target.value);
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
    fetch(`http://127.0.0.1:8000/transaction/credit/${customerNumber}/${today}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardDaily(data);
      });
  }
  fetchCardDaily(customerNumber, today);

  const monthlyPeriod = `${year}${month + 1}`;

  function fetchCardMonthly(customerNumber, monthlyPeriod) {
    fetch(
      `http://127.0.0.1:8000/transaction/credit/${customerNumber}/${monthlyPeriod}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardMonthly(data);
      });
  }
  fetchCardMonthly(customerNumber, monthlyPeriod);

  const cardDailyAmount = cardDaily.map(
    (item) =>
      item.customer_no === customerNumber &&
      customerNumber.length > 0 &&
      item.amount
  );

  const cardMonthlyAmount = cardMonthly.map(
    (item) =>
      item.customer_no === customerNumber &&
      customerNumber.length > 0 &&
      item.amount
  );

  const cardNumbers = cardDaily.map(
    (item) =>
      item.customer_no === customerNumber &&
      customerNumber.length > 0 &&
      item.card_no
  );

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

  return (
    <div className={classes.container}>
      {cardNumbers[0] && (
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Kart no</th>
                <th>Günlük Harcama Tutarı</th>
                <th>Aylık Harcama Tutarı</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <tr>
                  {cardNumbers.map((card) => {
                    return <tr>{card}</tr>;
                  })}
                </tr>
              </td>
              <td>
                {cardDailyAmount.map((card) => {
                  return <tr>{card}</tr>;
                })}
              </td>

              <td>
                {cardMonthlyAmount.map((card) => {
                  return <tr>{card}</tr>;
                })}
              </td>
            </tbody>
          </table>
        </div>
      )}
      {/* {cardNumbers[0] === false && (
        <h4>Müşteri numarası bulunamadı.</h4>
      )} */}

      {cardNumbers[0] && (
        <div className={classes.select}>
          <h3>Kart hareketlerini görmek için: </h3>
          <select name="card" id="" onChange={filterCardHandler}>
            <option value="">Kart seçiniz</option>
            {cardNumbers.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          {filterCard && (
            <div className={classes.transactionTable}>
              <table className={classes.transactionTables}>
                <thead>
                  <th>Kart numarası</th>
                  <th>İşlem tutarı</th>
                  <th>İşlem kategorisi</th>
                  {/* <th>İşlem açıklaması</th> */}
                  <th>İşlem tarihi</th>
                </thead>
                <tbody>
                  <td>
                    <tr>
                      {sortedCardRawData.map((card) => {
                        if (card.card_no === filterCard) {
                          return <tr>{card.card_no}</tr>;
                        }
                      })}
                    </tr>
                  </td>
                  <td>
                    <tr>
                      {sortedCardRawData.map((card) => {
                        if (card.card_no === filterCard) {
                          return <tr>{card.amount}</tr>;
                        }
                      })}
                    </tr>
                  </td>
                  <td>
                    <tr>
                      {sortedCardRawData.map((card) => {
                        if (card.card_no === filterCard) {
                          return <tr>{card.category}</tr>;
                        }
                      })}
                    </tr>
                  </td>
                  {/* <td>
                  <tr>
                    {sortedCardRawData.map((card) => {
                      if (card.card_no === filterCard) {
                        return <tr>{card.trx_desc}</tr>;
                      }
                    })}
                  </tr>
                </td> */}
                  <td>
                    <tr>
                      {sortedCardRawData.map((card) => {
                        if (card.card_no === filterCard) {
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
                          return <tr>{`${day}/${month}/${year}`}</tr>;
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
  );
};

export default CardChart;
