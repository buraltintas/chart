// async function fetchCardDaily(customerNumber, today) {
//   const response = await fetch(
//     `${baseURL}/customer/card/daily/${customerNumber}/${today}/${today}`
//   );

//   if (response.ok) {
//     setFirst(true);
//   }
//   const data = await response.json();

//   setCardDaily(data);
// }
// async function fetchCardRawData(customerNumber, today) {
//   const response = await fetch(
//     `${baseURL}/transaction/credit/${customerNumber}/20210101000000/${today}235959`
//   );

//   if (response.ok) {
//     setSecond(true);
//   }
//   const data = await response.json();

//   setCardRawData(data);
// }
// async function fetchCardMonthly(customerNumber, monthlyPeriod) {
//   const response = await fetch(
//     `${baseURL}/customer/card/monthly/${customerNumber}/${monthlyPeriod}/${monthlyPeriod}`
//   );

//   if (response.ok) {
//     setThird(true);
//   }
//   const data = await response.json();

//   setCardMonthly(data);
// }
// async function fetchCategoryDaily(customerNumber, today) {
//   const response = await fetch(
//     `${baseURL}/customer/category/daily/${customerNumber}/${today}`
//   );

//   if (response.ok) {
//     setForth(true);
//   }
//   const data = await response.json();

//   setCategoryDaily(data);
// }
// async function fetchCategoryMonthly(customerNumber, monthlyPeriod) {
//   const response = await fetch(
//     `${baseURL}/customer/category/monthly/${customerNumber}/${monthlyPeriod}`
//   );

//   if (response.ok) {
//     setFifth(true);
//   }
//   const data = await response.json();

//   setCategoryMonthly(data);
// }

// fetchCategoryMonthly(customerNumber, monthlyPeriod);
// fetchCategoryDaily(customerNumber, today);
// fetchCardMonthly(customerNumber, monthlyPeriod);
// fetchCardRawData(customerNumber, today);
// fetchCardDaily(customerNumber, today);
