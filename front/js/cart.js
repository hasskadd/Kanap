// test
let dataLinea = localStorage.getItem(localStorage.key(0));
let dataJason = JSON.parse(dataLinea);
let priceCal = dataJason.price + 100 
console.log(priceCal);