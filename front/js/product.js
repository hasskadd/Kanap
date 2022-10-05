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
            alert("Veuillez choisir une couleur ainsi que la quantité compris entre 1 et 100");
        }else{
            saveCart();
            alert("Votre produit a été ajouté au panier !");
            
        } 
    })

let setCart = [];
let setAnotherCart = [];


function saveCart(){
    setCart = JSON.parse(localStorage.getItem("Panier"))
    if(!setCart){ // verifier si setCart est vide
        setCart = [];
        setCart.push(cartClient); // s'il est vide , ajouter l'objet Client a set cart
        return localStorage.setItem("Panier", JSON.stringify(setCart)); // puis sauvegarder sur le localestorage
    }else{ // si le local storage n'est pas vide
       for(let i = 0; i < setCart.length; i++){
            if(setCart[i].id == cartClient.id && setCart[i].colors == cartClient.colors){ // verifier si l'id et la couleur sont les mêmes 
               let addQuantity ; // creation d'une variable quantité
               addQuantity = parseInt(setCart[i].quantity) + parseInt(cartClient.quantity); // addition de la quantité voulu et celui du panier
                setCart[i].quantity = JSON.stringify(addQuantity); // 
                localStorage.setItem("Panier",  JSON.stringify(setCart)); // ajout au local storage
                break; // stop de la boucle
                 
            }else{ //sinon
                let temp = []; // créer un tableau temporel
                temp.push(cartClient); // ajouter la selection du client dans le tableau temporel
                localStorage.setItem("Panier", JSON.stringify(setCart.concat(temp))); // stocker dans le localstorage en le concatenant  
            }
        }
                      
    }
    
   
}













  