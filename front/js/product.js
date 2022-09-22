const product = window.location.search.split("?id=").join("");
const fetchProduct = async ()=>{
    await fetch(`http://localhost:3000/api/products/${product}`).then(response => response.json())
    .then(data =>{
        console.log(data);
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


    });
};

fetchProduct();
