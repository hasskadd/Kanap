let cartItems = document.querySelector("#cart__items");
let produitInCart = JSON.parse(localStorage.getItem("Panier"));

let priceProductArray = [];
let tempArray = [];
let founProduct;


async function afficherProduit(){
    await fetch('http://localhost:3000/api/products/')
    .then(res => res.json())
    .then(dataJson =>{       
        for (let i = 0; i < produitInCart.length; i++) {    
            founProduct = dataJson.find((productFind) => productFind._id === produitInCart[i].id);
            if(founProduct){
                cartItems.innerHTML += 
                `<article class="cart__item" data-id=${produitInCart[i].id} data-color=${produitInCart[i].colors}>
                    <div class="cart__item__img">
                        <img src=${founProduct.imageUrl} alt=${founProduct.altTxt}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${founProduct.name}</h2>
                            <p>${produitInCart[i].colors}</p>
                            <p>${founProduct.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value= ${produitInCart[i].quantity}>
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>` 

                //let priceProduct = tempArray[i].price * parseInt(produitInCart[i].quantity);
                //priceProductArray.push(priceProduct);

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
afficherProduit();

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
                    location.href = "./cart.html";
                }
            }
            afficherProduit();          
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
                        
                    }else{
                        alert("veuillez sélectionner un nombre compris entre 1 et 100");
                    }
                }
            }
            quantityTotal();
            //priceTotal();

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

    let msgErrorFirstName = document.querySelector("#firstNameErrorMsg");

    // test expression Reg
    if(testFirstName){
        msgErrorFirstName.innerHTML = "Prénom valide";
        msgErrorFirstName.classList.remove('text-danger');
        msgErrorFirstName.classList.add('text-success');
        
    }else{
        msgErrorFirstName.innerHTML = "Prénom non valide";
        msgErrorFirstName.classList.remove('text-success');
        msgErrorFirstName.classList.add('text-danger');
    }
    
};

function validLastName(){
    //création du reg exp pour la validation du Nom
    let lastNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,30}$/g;
    let testLastName = lastNameRegex.test(inputLastName.value);
    let msgErrorLastName = document.querySelector("#lastNameErrorMsg");

    // test expression Reg
    if(testLastName){
        msgErrorLastName.innerHTML = "Nom valide";
        msgErrorLastName.classList.remove('text-danger');
        msgErrorLastName.classList.add('text-success');
        
    }else{
        msgErrorLastName.innerHTML = "Nom non valide";
        msgErrorLastName.classList.remove('text-success');
        msgErrorLastName.classList.add('text-danger');
    }
};

function validEmail(){
    // //création du reg exp pour la validation du mail
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{3,30}/;
    let testEmail = emailRegex.test(inputEmail.value);
    let msgErrorEmail = document.querySelector("#emailErrorMsg");

    // test expression Reg
    if(testEmail){
        msgErrorEmail.innerHTML = "Email valide";
        msgErrorEmail.classList.remove('text-danger');
        msgErrorEmail.classList.add('text-success');
        
    }else{
        msgErrorEmail.innerHTML = 'Email non valide';
        msgErrorEmail.classList.remove('text-success');
        msgErrorEmail.classList.add('text-danger');
    }
}

function validAddress(){
    let addressRegex = /^[A-Za-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,40}$/g;
    let testAddress = addressRegex.test(inputAddress.value);
    let msgErrorAddress = document.querySelector("#addressErrorMsg");

    // test expression Reg
    if(testAddress){
        msgErrorAddress.innerHTML = "Address valide";
        msgErrorAddress.classList.remove('text-danger');
        msgErrorAddress.classList.add('text-success');
        
    }else{
        msgErrorAddress.innerHTML = 'Address non valide';
        msgErrorAddress.classList.remove('text-success');
        msgErrorAddress.classList.add('text-danger');
    }
}
 
function validCity(){
    let cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{3,30}$/g;
    let testCity = cityRegex.test(inputCity.value);
    let msgErrorCity = document.querySelector("#cityErrorMsg");

    // test expression Reg
    if(testCity){
        msgErrorCity.innerHTML = "Ville valide";
        msgErrorCity.classList.remove('text-danger');
        msgErrorCity.classList.add('text-success');
        
    }else{
        msgErrorCity.innerHTML = 'Ville non valide';
        msgErrorCity.classList.remove('text-success');
        msgErrorCity.classList.add('text-danger');
    }
}

let products = [];
for(let i = 0; i< produitInCart.length; i++){
    products.push(produitInCart[i].id);
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const dataOrder = {
        contact:{
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value

        },
        products
    
    }
    fetch('http://localhost:3000/api/products/order',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataOrder), 
    }).then((res) => res.json())
    .then((getDataOrder) => {
        location.href = `./confirmation.html?id=${getDataOrder.orderId}`;
        localStorage.clear();
    });
    
});