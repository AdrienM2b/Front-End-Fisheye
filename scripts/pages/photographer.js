import { displayMedia } from "../utils/displayMedia.js"
import { photographerFactory } from "../factories/photographer.js"
import { sortByButtons } from "../utils/sortByButton.js"

//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let photographerId = params.get("id")
const main = document.querySelector('#main')

async function getData() {
    let reponse = await fetch('data/photographers.json')
    let data = (await reponse).json()
    return data
}


async function initPhotographer(){
    const { photographers, media } = await getData()
    // trouver le nom du photographe pour les images
    const foundPhotographer = photographers.find(element => element.id == photographerId)
    // filtrer les image du photographe
    const photo = media.filter(m => m.photographerId === parseInt(photographerId))

    // initialiser les fonctions 
    sortByButtons(photo)
    containerLikePrice(foundPhotographer, photo)
    displayFactories(foundPhotographer, photo)
}
initPhotographer()



async function displayFactories(foundPhotographer, photo){
    //selection Header
    const photographerHeader = document.querySelector('.photograph-header')
    const photographerHeaderModel = photographerFactory(foundPhotographer)
    const userHeaderDOM = photographerHeaderModel.userImageProfil()
    const userContentDOM = photographerHeaderModel.userContent()
    
    // créer le contenu du header
    photographerHeader.appendChild(userContentDOM)
    photographerHeader.appendChild(userHeaderDOM)

    // ajouter la fonction pour afficher les photos
    displayMedia(photo)
}

async function containerLikePrice(foundPhotographer, photo){
    //affichage du Prix et nbr de like du photographe
    const boxPrice = document.createElement('div')
    boxPrice.classList.add('boxPrice-photographer')
    // recuperer le prix 
    const photographPrice = document.createElement('p')
    photographPrice.textContent = `${foundPhotographer.price} €/jour`

    // nombre de likes
    const likeContainer = document.createElement('div')
    likeContainer.classList.add('total-likes_container')
    
    const totalLikes = document.createElement('p')
    totalLikes.classList.add('total-likes')

    // ajout de l'icone
    const icone = document.createElement('em')
    icone.classList.add('fa-solid', 'fa-heart')

    // ajouter tout ensemble
    likeContainer.appendChild(totalLikes)
    likeContainer.appendChild(icone)
    boxPrice.appendChild(likeContainer)
    boxPrice.appendChild(photographPrice)
    main.appendChild(boxPrice)

    // calcul du nombre total de likes
    var totalPhotoLikes = 0

    photo.forEach((like) => {
        totalPhotoLikes += like.likes
    })
    totalLikes.innerText = totalPhotoLikes
}

