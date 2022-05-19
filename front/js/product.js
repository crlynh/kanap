getProducts()

// Récupération des paramètres de l'URL
var str = window.location.search;
var url = new URLSearchParams(str);
var id = url.get("id");

// Récupération du produit de la page
function getProducts() {
    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => console.log(data))
}

// let productTitle = document.getElementById("title");
// let productPrice = document.getElementById("price");
// let productDescription = document.getElementById("description");
// let productColor = document.getElementById("colors");
// let item = document.querySelector(".item");

// // Ajout du produit 
// function addProduct(canapes) {
//     for (let i=0; i < canapes.length; i++) {
//     const canape = canapes[i];
//     console.log(canape)
  
//     // Création de l'élément "img"
//     let imageCard = document.querySelector(".item__img");
//     let productImg = document.createElement("img")
//     imageCard.appendChild(productImg);
//     productImg.src = canapes[i].imageUrl;
//     productImg.alt = canapes[i].altTxt;
  
    // // Création de l'élément titre "h3"
    // let productTitle = document.createElement("h3");
    // productArticle.appendChild(productTitle);
    // productTitle.textContent = canapes[i].name;
  
    // // Création de l'élément description "p"
    // let productDescription = document.createElement("p");
    // productArticle.appendChild(productDescription);
    // productDescription.textContent = canapes[i].description
  //   }
  // }
// Création de l'élément "img"