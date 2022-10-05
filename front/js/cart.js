
let cartItems = document.querySelector("#cart__items");
let produitInCart = JSON.parse(localStorage.getItem("Panier"));
let tempArray = [];
let priceProductArray = [];

console.log(produitInCart);
async function getApi(){
    await fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(dataJson =>{
        for (let i = 0; i < produitInCart.length; i++) {
            const founProduct = dataJson.find((productFindId) => productFindId._id == produitInCart[i].id);
            tempArray.push(founProduct);
            if(founProduct){               
                cartItems.innerHTML += 
                `<article class="cart__item" data-id=${produitInCart[i].id} data-color=${produitInCart[i].color}>
                    <div class="cart__item__img">
                        <img src=${tempArray[i].imageUrl} alt=${tempArray[i].altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${tempArray[i].name}</h2>
                            <p>${produitInCart[i].colors}</p>
                            <p>${tempArray[i].price} €</p>
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

                let priceProduct = tempArray[i].price * parseInt(produitInCart[i].quantity);
                priceProductArray.push(priceProduct);

            }
            
        }
        
        const summQuantity = produitInCart.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
        document.querySelector("#totalQuantity").innerHTML = summQuantity;
        summPriceTotal = priceProductArray.reduce((prev, curr) => prev + curr, 0);
        document.querySelector("#totalPrice").innerHTML = summPriceTotal;
        
            
    })  

}   
getApi();





