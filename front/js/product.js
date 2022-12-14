const product = window.location.search.split("?id=").join("");
let productID = product;


const fetchProduct = async ()=>{
    await fetch(`http://localhost:3000/api/products/${product}`).then(response => response.json())
    .then(data =>{
       // console.log(data); Ne pas oublier de l'enlever
        // recuperation et integration de l'image
        const imageItems = document.querySelector(".item__img");
        const imageElement = document.createElement("img");
        imageElement.src = data.imageUrl;
        imageElement.alt = data.altTxt;
        imageItems.appendChild(imageElement);

        // Recuperation et integration du nom
        const nameItems = document.getElementById("title");
        nameItems.innerHTML = data.name;

        // Recuperaton et integration du prix
        const priceItems = document.getElementById("price");
        priceItems.innerHTML = data.price+ " ";

        // Recuperaton et integration de la description
        const descriptionItems = document.getElementById("description");
        descriptionItems.innerHTML = data.description;

        // section de la couleur
        const arrayColor = data.colors;
        for (let i = 0; i < arrayColor.length; i++) {
            const selectColor = document.createElement("option");
            selectColor.value = arrayColor[i];
            selectColor.innerHTML = arrayColor[i];
            document.querySelector("#colors").appendChild(selectColor);
            
        }
       
    })
    
};

fetchProduct(product);

let cartClient = {};
cartClient.id = productID;

let setColor = document.querySelector("#colors");
setColor.addEventListener("change", (event) =>{
        let productColor;
        productColor = event.target.value;
        cartClient.colors = productColor;
    });

let setQuantity = document.querySelector("#quantity");
setQuantity.addEventListener("change", (e)=>{
        let productQuantity;
        productQuantity = e.target.value;
        cartClient.quantity = productQuantity;
    })

let buttonAjout = document.querySelector("#addToCart");
buttonAjout.addEventListener("click", ()=>{
        if(cartClient.colors == "" || cartClient.colors == undefined || cartClient.quantity == undefined || cartClient.quantity < 1 || cartClient.quantity > 100){
            alert("Veuillez choisir une couleur ainsi que la quantit?? compris entre 1 et 100");
        }else{
            saveCart();     
        } 
    })


function saveCart(){
    setCart = JSON.parse(window.localStorage.getItem("Panier"));
    if(!setCart){ // verifier si setCart est vide
        setCart = [];
        setCart.push(cartClient); // s'il est vide , ajouter l'objet Client a set cart
        alert("Votre produit a ??t?? ajout?? au panier !");
        localStorage.setItem("Panier", JSON.stringify(setCart)); // puis sauvegarder sur le localestorage 
    }else{
        setCart = JSON.parse(localStorage.getItem("Panier"));
        let addQuantity; 
        const findProduct = setCart.find((findProduct) => findProduct.id === cartClient.id && findProduct.colors == cartClient.colors);
        if(findProduct){
            for(let i in setCart){
                if(setCart[i].id == cartClient.id && setCart[i].colors == cartClient.colors){        
                    addQuantity = parseInt(setCart[i].quantity) + parseInt(cartClient.quantity);
                    if(addQuantity > 100){
                        alert("D??sol?? vous avez d??pass?? votre quota d'??l??ments stock??s")
                    }else{
                        setCart[i].quantity = JSON.stringify(addQuantity);
                        localStorage.setItem("Panier",  JSON.stringify(setCart));
                        alert("Votre produit a ??t?? ajout?? au panier !");                   
                    }                  
                }
            }
        }else{          
            localStorage.setItem("Panier", JSON.stringify(setCart.concat(cartClient)));
            alert("Votre produit a ??t?? ajout?? au panier !");    
        }        
    }    
}











  