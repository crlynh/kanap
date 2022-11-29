# PROJET 5 - KANAP

## Objectif du projet : Construire un site e-commerce en JavaScript

Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement, souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

## Spécifications techniques 

4 pages ont été mises en place : page d’accueil, page Produit, page Panier et la page Confirmation. Sur l’ensemble des pages, toutes les parties statiques sont en place, elles sont donc prêtes à recevoir le contenu dynamique.

* Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à la vente.
* Une page “produit” qui affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
* Une page “panier” qui contient un résumé des produits dans le panier, le prix total et la possibilité de modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de chiffre dans un champ prénom.
* Une page “confirmation” de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

## Technologies utilisées 
* HTML 5 
* CSS 3 
* JavaScript


## Installation

Cloner ce repository 
   ```sh
   git clone https://github.com/crlynh/kanap1.git
   ```
   
### Backend 
   
* Installer npm
   ```sh
   npm install
   ```

* Lancer le serveur
   ```sh
   node server
   ```
   
* Le message suivant doit s'afficher 
   ```sh
    Listening on port 3000
   ```
