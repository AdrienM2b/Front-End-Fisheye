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

async function headerPhotographer(foundPhotographer){
    // fabrication du header
    //selection Header
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerHeaderModel = photographerFactory(foundPhotographer);
    const userHeaderDOM = photographerHeaderModel.userImageProfil();
    const userContentDOM = photographerHeaderModel.userContent();
    // créer le contenu du header
    photographerHeader.appendChild(userContentDOM);
    photographerHeader.appendChild(userHeaderDOM);
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
}

async function containerLikePrice(foundPhotographer){
    //affichage du Prix et nbr de like du photographe
    const boxPrice = document.createElement('div');
    boxPrice.classList.add('boxPrice-photographer')
    // recuperer le prix 
    const photographPrice = document.createElement('p')
    photographPrice.textContent = `${foundPhotographer.price} €/jour`

    // nombre de likes
    const likeContainer = document.createElement('p');
    likeContainer.classList.add('photographer-likes');
    

    // ajout de l'icone
    const icone = document.createElement('i')
    icone.classList.add('fa-solid', 'fa-heart')
    // ajouter tout ensemble
    likeContainer.appendChild(icone)
    boxPrice.appendChild(likeContainer)
    boxPrice.appendChild(photographPrice)
    main.appendChild(boxPrice)
}

async function likes(photo){
    const totalLikesContainer = document.querySelector('.photographer-likes')
    const photographerContainer = document.querySelector('.boxPrice-photographer')

    // calcul du nombre total de likes
    var totalLikes = 0
    photo.forEach((like) => {
        totalLikes += like.likes
    })
    totalLikesContainer.textContent = totalLikes;

    photographerContainer.appendChild(totalLikesContainer)
    // incrementation du like
    const getLikes = document.getElementsByClassName('nbr_of_likes')
    const allLikes = Array.from(getLikes)

    allLikes.forEach((like, i) => {
        let nbrLikesImg = parseInt(like.textContent);
        let photoLikes = photo[i].likes;
      
        like.addEventListener('click', function() {
          if (nbrLikesImg === photoLikes) {
            nbrLikesImg++;
            totalLikes++;
          } else {
            nbrLikesImg--;
            totalLikes--;
          }
      
          like.innerHTML = nbrLikesImg;
          totalLikesContainer.innerHTML = totalLikes;
        });
      });
}

async function setSortButton(photo){

    // titre du tri 'trier par'
    const listTitle = document.createElement('h4')
    listTitle.textContent = 'Trier par'
    listTitle.classList.add('sort-list__container')
    // liste du menu deroulant
    const listSort = document.createElement('select')
    listSort.classList.add('sort-list')
    const selectOne = document.createElement('option')
    selectOne.textContent = 'Selectionner'
    // ajout de l'élément de tri des photos par likes
    const sortButtonByLikes = document.createElement('option')
    sortButtonByLikes.text = 'Popularité'
    sortButtonByLikes.classList.add('sort-button__by__likes')
    // ajout de l'élément de tri des photos par date 
    const sortButtonByDate = document.createElement('option')
    sortButtonByDate.textContent = 'Date'
    sortButtonByDate.classList.add('sort-button__by__date')
    // ajout de l'élément de tri des photos par titre 
    const sortButtonByTitle = document.createElement('option')
    sortButtonByTitle.textContent = 'Titre'
    sortButtonByTitle.classList.add('sort-button__by__title')

    // ajouter dans le main
    listSort.appendChild(selectOne)
    listSort.appendChild(sortButtonByLikes)
    listSort.appendChild(sortButtonByDate)
    listSort.appendChild(sortButtonByTitle)
    listTitle.appendChild(listSort)
    main.appendChild(listTitle)
    
    function sortByPopularity(){
        // il faut trier par popularité (likes), date et titre (ordre alphabetique)
        photo.sort(function (a,b){return a.likes-b.likes})
        displayMedia(photo)
    }
    
    function sortByDate(){
        // il faut trier par popularité (likes), date et titre (ordre alphabetique)
        photo.sort((a, b) => new Date(b.date) - new Date(a.date))
        displayMedia(photo)
    }
    
    function sortByTitle(){
        // il faut trier par popularité (likes), date et titre (ordre alphabetique)
        function compareStrings(a, b) {       
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
        photo.sort(function(a, b) {
            return compareStrings(a.title, b.title);
          })
        displayMedia(photo)
    }

    // ecouter les boutons
    listSort.addEventListener('change', function (){
        const selectedValue = listSort.value;
        const gallery = document.querySelector('.gallery');
        main.removeChild(gallery)
        switch (selectedValue) {
            case 'Popularité':
            sortByPopularity(photo)
            break
            case 'Date':
            sortByDate(photo)
            break
            case 'Titre':
            sortByTitle(photo)
            break
            default:
            displayMedia(photo)
        }
        lightBox()
        likes(photo)
    })

}

async function lightBox(){

    const main = document.querySelector('main')
    // creation de la modale
    const modaleImg = document.createElement('div')
    modaleImg.classList.add('modal__img')
    modaleImg.setAttribute('id', 'lightbox-modal')
    // ajout de la croix pour fermer
    const close = document.createElement('span')
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
        })
    })

    // afficher les images suivantes et precédentes
    // ajouter un compteur pour voir l'image actuelle et +1 pour l'image suivante et -1 pour la précédente ?
    next.addEventListener('click', (e)=> {
        e.preventDefault()
        let i = gallery.indexOf(currentImage)
        i++
        if(i>=gallery.length){
            i = 0
            displayCurrentImage(i)
        }else{
            displayCurrentImage(i)
        }
    })

    prev.addEventListener('click', (e)=> {
        e.preventDefault()
        let i = gallery.indexOf(currentImage)
        i--
        console.log(i)
        if(i<0){
            i = gallery.length - 1
            displayCurrentImage(i)
        }else{
            displayCurrentImage(i)
        }
    })

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

    // bouton pour fermer
    close.addEventListener('click', () => {
        modaleImg.style.display = 'none'
    })
}

async function initPhotographer(){
    const { photographers, media } = await getData();
    // trouver le nom du photographe pour les images
    const foundPhotographer = photographers.find(element => element.id == photographerId);
    // filtrer les image du photographe
    const photo = media.filter(m => m.photographerId === parseInt(photographerId));
    setSortButton(photo)
    headerPhotographer(foundPhotographer);
    displayMedia(photo);
    containerLikePrice(foundPhotographer);
    lightBox();
    likes(photo);
}
initPhotographer();