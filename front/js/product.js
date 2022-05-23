// Récupération des paramètres de l'URL
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

getProduct();
addToCart();

// Récupération du produit de la page
function getProduct() {
    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => addProduct(data))
}

// Ajout du produit à la page
function addProduct(canape) { 
    
    // Création de l'élément "img"
    let img = document.createElement("img");
    let imageCard = document.querySelector(".item__img");
    imageCard.appendChild(img);
    img.src = canape.imageUrl;
    img.alt = canape.altTxt;
  
    // Création de l'élément titre "h1" et prix "price"
    let name = document.createElement("h1");
    let p = document.createElement("p");
    let titleCard = document.querySelector(".item__content__titlePrice");
    titleCard.appendChild(name);
    titleCard.appendChild(p);
    let productPrice = document.getElementById("price");
    let productTitle= document.getElementById("title");
    productTitle.textContent = canape.name;
    productPrice.textContent = canape.price;
  
    // Création de l'élément description "p"
    let descriptionCard = document.querySelector(".item__content__description");
    descriptionCard.appendChild(p);
    let productDescription = document.getElementById("description");
    productDescription.textContent = canape.description;

    // Création de l'élément choisir une couleur "option"
    for (let i=0; i < canape.colors.length; i++) {
        const color = canape.colors[i];
        let option = document.createElement("option");
        let colorCard = document.getElementById("colors");
        colorCard.appendChild(option)
        option.textContent = color; 
        option.value = color;

    }  
}

// // Ajout du produit dans le panier
// function addToCart() {
//     let button = document.querySelector("#addToCart");
//     button.addEventListener("click", handleClick)
//     let colorChoice = document.querySelector("#colors").value;
//     let quantityChoice = document.querySelector("#quantity").value;

// }