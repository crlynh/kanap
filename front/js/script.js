getProducts();

// Récupération de la liste des produits
function getProducts() {
  fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
}

// Ajout de la liste des produits
function addProducts(canapes) {
  for (let i=0; i < canapes.length; i++) {
  const canape = canapes[i];
  
  // Création de l'élément "a"
  let productLink = document.createElement("a");
  productLink.href = "./product.html?id=" + canapes[i]._id
  document.getElementById("items").append(productLink);

  // Création de l'élément "article"
  let productArticle = document.createElement("article");
  productLink.appendChild(productArticle);

  // Création de l'élément "img"
  let productImg = document.createElement("img");
  productArticle.appendChild(productImg);
  productImg.src = canapes[i].imageUrl;  
  productImg.alt = canapes[i].altTxt;

  // Création de l'élément titre "h3"
  let productTitle = document.createElement("h3");
  productArticle.appendChild(productTitle);
  productTitle.textContent = canapes[i].name;

  // Création de l'élément description "p"
  let productDescription = document.createElement("p");
  productArticle.appendChild(productDescription);
  productDescription.textContent = canapes[i].description
  }
}