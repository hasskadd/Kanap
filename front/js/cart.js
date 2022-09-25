// test


let cartItems = document.querySelector("#cart__items");
const jsonArray = [];

for (let i = 0; i < localStorage.length; i++) {
    let dataLinea = localStorage.getItem(localStorage.key(i));
    let dataJson = JSON.parse(dataLinea);
    jsonArray.push(dataJson);
 
}
console.log(jsonArray);

for(let key in jsonArray){
    console.log(jsonArray[key].id);
    cartItems.innerHTML += 
        `<article class="cart__item" data-id=${jsonArray[key].id} data-color=${jsonArray[key].color}>
            <div class="cart__item__img">
                <img src=${jsonArray[key].src} alt=${jsonArray[key].altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${jsonArray[key].name}</h2>
                    <p>${jsonArray[key].color}</p>
                    <p>${jsonArray[key].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${jsonArray[key].quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
}

