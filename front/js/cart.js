
let cartItems = document.querySelector("#cart__items");
let produitInCart = JSON.parse(localStorage.getItem("Panier"));
let tempArray = [];
let priceProductArray = [];

//console.log(produitInCart);
async function getApi(){
    await fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(dataJson =>{
        for (let i = 0; i < produitInCart.length; i++) {
            const founProduct = dataJson.find((productFindId) => productFindId._id == produitInCart[i].id);
            tempArray.push(founProduct);
            if(founProduct){               
                cartItems.innerHTML += 
                `<article class="cart__item" data-id=${produitInCart[i].id} data-color=${produitInCart[i].colors}>
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
        // quantité et prix total
        quantityTotal();
        priceTotal();
        // Delete et changement de la quantité totale
        deleteFunction();
        //changeQuantityFunction();
            
    })  

   
}   
getApi();

function quantityTotal(){
    const summQuantity = produitInCart.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
    document.querySelector("#totalQuantity").innerHTML = summQuantity;
}
function priceTotal(){
    summPriceTotal = priceProductArray.reduce((prev, curr) => prev + curr, 0);
    document.querySelector("#totalPrice").innerHTML = summPriceTotal;
} 


function deleteFunction(){  
    let deleteButton = document.querySelectorAll(".deleteItem");
    //const articleSelect = document.querySelectorAll(".cart__item");
    deleteButton.forEach((deleteButton) => {
       deleteButton.addEventListener("click", () =>{
        for(let i = 0 ; i < produitInCart ; i++){
            console.log(produitInCart[i]);
            /*if(deleteButton.dataset.id == produitInCart[i].id && deleteButton.dataset.color == produitInCart[i].color){
                console.log("ca marche")
            }*/
        }
       });
    });
    /*deleteButton.forEach(el => el.addEventListener('click', ()=>{
        console.log("ca marche");
    })) */
        /*for(let i = 0; i < articleSelect.length; i++ ){
            console.log(articleSelect[i].dataset.id, articleSelect[i].dataset.color);
        }*/
        

    
}

 /*function changeQuantityFunction(){
    let changeQuantity = document.querySelector(".itemsQuantity");
     changeQuantity.addEventListener('change', ()=>{
        console.log("ca marche bien");
    })
}*/






