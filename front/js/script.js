//Recuperer la réponse de l'api
const fetchArticle = async ()=>{
    await fetch("http://localhost:3000/api/products").then(res => res.json())
        .then(data =>{
        // Création des items produits
        for (let i = 0; i < data.length; i++) {
            // Création d'un élément de type "a"
            let anchor = document.createElement("a");
            anchor.href = "product.html?id="+data[i]._id;
            // Création d'un élément de type "article"
            let articleElement = document.createElement("article");
            // Création d'un élément de type "image"
            const imageElement = document.createElement("img");
            // On accède à l’indice i de la liste items pour configurer la source de l’image.
            imageElement.src = data[i].imageUrl;
            imageElement.alt = data[i].altTxt;
            const productName = document.createElement("h3");
            productName.innerHTML = data[i].name;
            const productDescription = document.createElement("p");
            productDescription.innerHTML = data[i].description;
                
            // On rattache l’image à articleElement (la balise article)
            articleElement.appendChild(imageElement);
            articleElement.appendChild(productName);
            articleElement.appendChild(productDescription);
            anchor.appendChild(articleElement);
                
            // Récupération de l'élément du DOM qui accueillera les items
                const pieceElement = document.querySelector(".items");
            // On rattache le lien à pieceElement (la balise "a")
            pieceElement.appendChild(anchor);
        }
    })
}
fetchArticle();


let lien = document.querySelector("a");
lien.addEventListener("click", function(){
    window.location = `product.html?id=${data._id}`;
})