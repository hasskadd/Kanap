const product = window.location.search.split("?id=").join("");
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

let buttonAjout = document.querySelector("#addToCart");
let productID = product;
    
buttonAjout.addEventListener("click", ()=>{
        saveProduct();
    })

    function saveProduct(){
          
        let priceItems = document.querySelector("#price").innerHTML;
        let colorItems = document.getElementById("colors").value;
        let quantityItems = document.getElementById("quantity").value;
        let productName = document.getElementById("title").innerHTML;
        let imageSource = document.querySelectorAll(".item__img > img")[0].currentSrc;
        let imageAlt = document.querySelectorAll(".item__img > img")[0].alt;
        let productCart = {
            name: productName,
            id: productID,
            src: imageSource,
            altTxt: imageAlt,
            price: parseInt(priceItems),
            color: colorItems, 
            quantity: parseInt(quantityItems)
        };
        let productNumber = localStorage.getItem(product);
        let productCartJson =  JSON.stringify(productCart);
        if(productNumber){
           // localStorage.setItem(product, productCart.quantity + quantity);
           console.log("ca marche");
        }else{
            localStorage.setItem(product, productCartJson);
        }

    }







