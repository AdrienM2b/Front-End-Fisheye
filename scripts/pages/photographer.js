import { photographerFactory } from "../factories/photographer.js"
import { mediaFactory } from "../factories/media-factory.js";

// UTILS

// trier les titres par ordre alphabetique 
function compareStrings(a, b) {       
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let photographerId = params.get("id");
const main = document.querySelector('#main')

async function getData() {
    let reponse = await fetch('data/photographers.json');
    let data = (await reponse).json();
    // bien retourner les tableaux une fois récupéré
    return data;
}

async function displayFactories(foundPhotographer, photo){
    // fabrication du header
    //selection Header
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerHeaderModel = photographerFactory(foundPhotographer);
    const userHeaderDOM = photographerHeaderModel.userImageProfil();
    const userContentDOM = photographerHeaderModel.userContent();
    // créer le contenu du header
    photographerHeader.appendChild(userContentDOM);
    photographerHeader.appendChild(userHeaderDOM);

    // affichage des boutons 
    const factory = mediaFactory(photo)
    const displayButtons = factory.buttonSort()
    main.appendChild(displayButtons)
}

async function displayMedia(photo){
    // affichage des photos
    const gallery = document.createElement('div')
    gallery.classList.add('gallery')
    // affichage des images et du contenu
    photo.forEach((img) => {
        // creer une par une les images
        const libraryTemplate  = mediaFactory(img)
        const displayImg = libraryTemplate.createMedia()
        gallery.appendChild(displayImg)
        main.appendChild(gallery)
    })
    console.log(gallery)
}

async function containerLikePrice(foundPhotographer){
    //affichage du Prix et nbr de like du photographe
    const boxPrice = document.createElement('div');
    boxPrice.classList.add('boxPrice-photographer')
    // recuperer le prix 
    const photographPrice = document.createElement('p')
    photographPrice.textContent = `${foundPhotographer.price} €/jour`

    // nombre de likes
    const likeContainer = document.createElement('div');
    likeContainer.classList.add('total-likes_container');
    
    const totalLikes = document.createElement('p');
    totalLikes.classList.add('total-likes');
    totalLikes.textContent = '0'

    // ajout de l'icone
    const icone = document.createElement('i')
    icone.classList.add('fa-solid', 'fa-heart')

    // ajouter tout ensemble
    likeContainer.appendChild(totalLikes)
    likeContainer.appendChild(icone)
    boxPrice.appendChild(likeContainer)
    boxPrice.appendChild(photographPrice)
    main.appendChild(boxPrice)
}

async function likes(photo){
    const textLikes =  document.querySelector('.total-likes')
    // calcul du nombre total de likes
    var totalLikes = 0

    photo.forEach((like) => {
        totalLikes += like.likes
    })
    textLikes.innerHTML = totalLikes
  
    // incrementation du like
    const boutonLike = document.querySelectorAll('.like-button')
    boutonLike.forEach((bouton, index) => {
        bouton.addEventListener('click', () => {
            changeLikes(index);
        });
        
        bouton.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
            changeLikes(index);
            }
        })
    })

    function changeLikes(index) {
        let bouton = boutonLike[index]
        let like = bouton.childNodes[0]
        let nbrLikesImg = parseInt(like.textContent)
        let photoLikes = photo[index].likes        
        if(photoLikes === nbrLikesImg){
            nbrLikesImg++
            totalLikes++
        }else{
            nbrLikesImg--
            totalLikes--
        }
      
        like.innerHTML = nbrLikesImg
        textLikes.innerHTML = totalLikes
    }
      
}

async function sortButtons(photo){
    // ecouter les boutons
    const listButtons = document.querySelector('.sort-list')
    listButtons.addEventListener('change', ()=>{sortMedias(photo)})
    listButtons.addEventListener('keyup', (e)=>{
        if(e.key === 'Enter'){
            sortMedias(photo)
        }
    })
    
}

async function sortMedias(photo){  
    const listButtons = document.querySelector('.sort-list')
    const valueSelected = listButtons.value
    const gallery = document.querySelector('.gallery');
    main.removeChild(gallery) 
    switch (valueSelected) {
        case 'Popularité':
            photo.sort(function (a,b){return a.likes-b.likes})
            displayMedia(photo)
        break
        case 'Date':
            photo.sort((a, b) => new Date(b.date) - new Date(a.date))
            displayMedia(photo)
        break
        case 'Titre':
            photo.sort(function(a, b) {
                return compareStrings(a.title, b.title);
              })
            displayMedia(photo)
        break
        default:
        displayMedia(photo)
    }
    lightBox()
    likes(photo)
}

async function lightBox(){

    const main = document.querySelector('main')
    // creation de la modale
    const modaleImg = document.createElement('div')
    modaleImg.classList.add('modal__img')
    modaleImg.setAttribute('id', 'lightbox-modal')
    modaleImg.setAttribute('name', 'lightbox-modal')
    
    // ajout de la croix pour fermer
    const close = document.createElement('button')
    close.classList.add('close')
    close.innerHTML = '&times;'
    // boutons suivant et précédent 
    const buttonsSwipe = document.createElement('div')
    buttonsSwipe.classList.add('button-container')
    const next = document.createElement('button')
    next.classList.add('next')
    next.innerHTML = '&gt'
    const prev = document.createElement('button')
    prev.classList.add('prev')
    prev.innerHTML = '&lt'

    // ajout du conteneur de l'image 
    const modalContent = document.createElement('div')
    modalContent.classList.add('modal__content')

    //selection des images
    const linkImg = document.querySelectorAll('.media')
    const linksImages = Array.from(linkImg)
    const tagNameLinks = linksImages.map(link => link.children[0])
    const gallery = linksImages.map(link => link.getAttribute('href'))

    // ajout des élément dans la modale
    main.appendChild(modaleImg)
    modaleImg.appendChild(modalContent)
    modaleImg.appendChild(close)
    modaleImg.appendChild(buttonsSwipe)
    buttonsSwipe.appendChild(prev)
    buttonsSwipe.appendChild(next)

    let currentImage


    // boucle pour afficher les images dans une modale
    linksImages.forEach((links, index) => {
        links.addEventListener('click', (e) => {
            e.preventDefault()
            displayCurrentImage(index)
            manage()
        })
        links.addEventListener('keypress', (e) => {
            if(e.key === "Enter")
            e.preventDefault()
            displayCurrentImage(index)
            manage()
        })
    })

    // afficher les images suivantes et precédentes
    // ajouter un compteur pour voir l'image actuelle et +1 pour l'image suivante et -1 pour la précédente ?
    function nextImage(){
        let i = gallery.indexOf(currentImage)
        i++
        if(i>=gallery.length){
            i = 0
            displayCurrentImage(i)
        }else{
            displayCurrentImage(i)
        }
    }

    function prevImage(){
        let i = gallery.indexOf(currentImage)
        i--
        console.log(i)
        if(i<0){
            i = gallery.length - 1
            displayCurrentImage(i)
        }else{
            displayCurrentImage(i)
        }
    }

    // bouton pour fermer
    function closeWindow(){
        modaleImg.style.display = 'none'
    }

    // bouton suivant et précédent 

    function displayCurrentImage(index){
        modalContent.innerHTML= ''
        modaleImg.style.display = 'block'
        currentImage = gallery[index]
        // ajout de l'image
        const imageAffichee = tagNameLinks[index].nodeName === 'VIDEO'
            ? document.createElement('video')
            : document.createElement('img')
        console.log(imageAffichee)
        imageAffichee.setAttribute('src', currentImage)
        modalContent.appendChild(imageAffichee)

        return currentImage
    }

    function manage(){
        next.addEventListener('click', ()=>{ nextImage() })
        prev.addEventListener('click', ()=>{ prevImage() })
        close.addEventListener('click', ()=>{ closeWindow() })

        // Navigation au clavier 
        document.addEventListener("keyup", (e) => {
            switch(e.key){
                case "ArrowRight":
                    nextImage()
                    break
                case "ArrowLeft":
                    prevImage()
                    break
                case "Escape":
                    closeWindow()
                    break
            }
            console.log(e.key)
        })
    }
    
}

async function initPhotographer(){
    const { photographers, media } = await getData();
    // trouver le nom du photographe pour les images
    const foundPhotographer = photographers.find(element => element.id == photographerId);
    // filtrer les image du photographe
    const photo = media.filter(m => m.photographerId === parseInt(photographerId));
    displayFactories(foundPhotographer, photo);
    displayMedia(photo)
    containerLikePrice(foundPhotographer);
    lightBox();
    likes(photo);
    sortButtons(photo)
}
initPhotographer();