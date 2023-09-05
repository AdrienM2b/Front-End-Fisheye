import { photographerFactory } from '../factories/photographer.js'

async function getPhotographers() {
        let reponse = await fetch('data/photographers.json')
        let photographers = (await reponse).json()
        return photographers
}

// deployer la factory photographe pour afficher la page d'accueil   
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section")

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    })
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers()
    displayData(photographers)
}

init()
    
    