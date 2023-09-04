import { mediaFactory } from "../factories/media-factory.js"
import { likes } from "./likeButtons.js"
import { addImageToLightbox } from "./lightBox.js"

const main = document.querySelector('main')

function displayMedia(photo){
    // affichage des photos
    const gallery = document.createElement('div')
    gallery.classList.add('gallery')
    // affichage des images et du contenu
    photo.forEach((img) => {
        // crée une par une les images
        const libraryTemplate  = mediaFactory(img)
        const displayImg = libraryTemplate.createMedia()
        gallery.appendChild(displayImg)
        main.appendChild(gallery)
    })
    likes(photo)
    addImageToLightbox()
}

export { displayMedia }