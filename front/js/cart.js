
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
        changeQuantityFunction();
            
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
    deleteButton.forEach((el) =>{
        el.addEventListener("click", () =>{
            for(let i = 0; i < produitInCart.length; i++){
                if(el.closest(".cart__item").dataset.id == produitInCart[i].id && el.closest(".cart__item").dataset.color ==  produitInCart[i].colors){
                    produitInCart.splice(i, 1);
                    localStorage.setItem("Panier", JSON.stringify(produitInCart));
                    location.reload();
                }
            }
        });
    })
}

function changeQuantityFunction(){
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    changeQuantity.forEach((el)=>{
        el.addEventListener("change", () =>{
            for(let i = 0; i < produitInCart.length; i++){
                if(el.closest(".cart__item").dataset.id == produitInCart[i].id && el.closest(".cart__item").dataset.color ==  produitInCart[i].colors){
                    if(el.value != 0 && el.value < 100){
                        produitInCart[i].quantity = el.value;
                        produitInCart.push();
                        localStorage.setItem("Panier", JSON.stringify(produitInCart));
                        location.reload();
                    }else{
                        alert("veuillez sélectionner un nombre compris entre 1 et 100");
                        location.reload();
                    }
                }
            }
        })
    })
}



let form = document.querySelector(".cart__order__form");
let inputEmail = document.getElementById("email");
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");

form.firstName.addEventListener('change', ()=>{
   validFirstName(); 
});

form.lastName.addEventListener('change', ()=>{
    validLastName(); 
 });

form.email.addEventListener('change', ()=>{
    validEmail();
});

form.address.addEventListener('change', ()=>{
    validAddress();
});

form.city.addEventListener('change', ()=>{
    validCity();
});

function validFirstName(){
    //création du reg exp pour la validation du prénom
    let firstNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,30}$/g;
    let testFirstName = firstNameRegex.test(inputFirstName.value);
    console.log(testFirstName);
};

function validLastName(){
    //création du reg exp pour la validation du Nom
    let lastNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,30}$/g;
    let testFirstName = lastNameRegex.test(inputLastName.value);
    console.log(testFirstName);
};

function validEmail(){
    // //création du reg exp pour la validation du mail
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{3,30}/;
    let testEmail = emailRegex.test(inputEmail.value);
    console.log(testEmail);
}

function validAddress(){
    let addressRegex = /^[A-Za-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,40}$/g;
    let testAddress = addressRegex.test(inputAddress.value);
    console.log(testAddress);
}
 
function validCity(){
    let cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{3,30}$/g;
    let testCity = cityRegex.test(inputCity.value);
    console.log(testCity);
}



