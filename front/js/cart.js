// test


let cartItems = document.querySelector("#cart__items");
const jsonArray = [];

for (let i = 0; i < localStorage.length; i++) {
    let dataLinea = localStorage.getItem(localStorage.key(i));
    let dataJson = JSON.parse(dataLinea);
    jsonArray.push(dataJson);
 
}
console.log(jsonArray);