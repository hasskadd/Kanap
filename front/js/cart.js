
let cartItems = document.querySelector("#cart__items");
let produitInCart = JSON.parse(localStorage.getItem("Panier"));

console.log(produitInCart);
async function getApi(){
    await fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(dataJson =>{
        console.log(dataJson);
        for (let i = 0; i < produitInCart.length; i++) {
            cartItems.innerHTML += 
                `<article class="cart__item" data-id=${produitInCart[i].id} data-color=${produitInCart[i].color}>
                    <div class="cart__item__img">
                        <img src=${dataJson[i].imageUrl} alt=${dataJson[i].altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${dataJson[i].name}</h2>
                            <p>${produitInCart[i].colors}</p>
                            <p>${dataJson[i].price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${produitInCart[i].quantity}>
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
        }
            
    })


    

}   
getApi();




/*for(let key in jsonArray){
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
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${jsonArray[key].quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
}
*/
