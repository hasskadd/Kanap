fetch("http://localhost:3000/api/products").then(res => res.json())
.then(data =>{
    for (let i = 0; i < data.length; i++) {
        let anchor = document.createElement("a");
        //anchor.href = "html/product.html";
        let articleElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = data[i].imageUrl;
        imageElement.alt = data[i].altTxt;
        const productName = document.createElement("h3");
        productName.innerHTML = data[i].name;
        const productDescription = document.createElement("p");
        productDescription.innerHTML = data[i].description;
        
        const listeElement = [imageElement, productName, productDescription];
        articleElement.appendChild(imageElement);
        articleElement.appendChild(productName);
        articleElement.appendChild(productDescription);
   
        anchor.appendChild(articleElement);
        
        const pieceElement = document.querySelector(".items");
        pieceElement.appendChild(anchor);
        
    }
 
})