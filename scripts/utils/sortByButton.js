import { displayMedia } from "../utils/displayMedia.js"

// trier les titres par ordre alphabetique 
function compareStrings(a, b) {       
    return (a < b) ? -1 : (a > b) ? 1 : 0
}
const main = document.querySelector('main')

function buttonSort(){
    // Container title + dropdown
    const container = document.createElement('div')
    container.classList.add('sort-by')
    
    // Titre 'trier par'
    const title = document.createElement('p')
    title.textContent = 'Trier par'
    title.classList.add('sort-by__title')
    
    // Container du dropdown
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('sort-by__container__button')

    // Container des options
    const listOptions = document.createElement('ul')
    listOptions.classList.add('sort-by__list')
    listOptions.classList.add('hide')
    listOptions.id = 'selectMenu'

    // Options
    const options = ["Date", "Popularité", "Titre"]

    options.forEach(optionText => {
        const option = document.createElement('li')
        option.classList.add('sort-by__option')
        option.textContent = optionText
        option.setAttribute('value', optionText.toLowerCase())
        listOptions.appendChild(option)
    })

    // Liaison des elements entre eux
    container.appendChild(title)
    container.appendChild(buttonContainer)
    buttonContainer.appendChild(listOptions)

    return container
}

function sortByButtons(photo){
    main.appendChild(buttonSort())

    // Récupérez les éléments DOM
    const selectMenu = document.getElementById('selectMenu')
    const selectLien = document.querySelectorAll('.sort-by__option')
    
    // cacher les deux derniers elemetns de la liste
    for (let i = selectLien.length - 1; i >= selectLien.length - 2; i--) {
        selectLien[i].classList.add('hidden')
    }

    // Sélectionnez le menu déroulant et ajoutez un gestionnaire d'événements pour le clic
    selectMenu.addEventListener('click', function() {
        // (masquer le menu)Si le menu est déjà affiché
        if (selectMenu.classList.contains('show')) {
            selectMenu.classList.toggle('hide')
            selectMenu.classList.remove('show')
            closeDropdown()  
        //(afficher le menu)   
        } else if(selectMenu.classList.contains('hide')){
            selectMenu.classList.toggle('show')
            selectMenu.classList.remove('hide')
            showDropdown()
            // afficher le menu et enlever la classe hidden des éléments cachés
            selectLien.forEach(li => {
                li.classList.remove('hidden')
                li.classList.remove('selected')
                li.addEventListener('click', function(event) {
                    const selectedValue = event.target.getAttribute('value')
                    // Appliquer la classe 'selected' à l'élément cliqué et 'hidden' aux autres
                    selectLien.forEach(li => {
                        if (li.getAttribute('value') === selectedValue) {
                            li.classList.add('selected')
                            // mettre à zero la gallerie
                            const gallery = document.querySelector('.gallery')
                            main.removeChild(gallery)
                            // choisir le mode de tri
                            switch (selectedValue) {
                                case 'popularité':
                                    sortByPopularity(photo)
                                break
                                case 'date':
                                    sortByDate(photo)
                                break
                                case 'titre':
                                    sortByTitre(photo)
                                break
                            }
                            displayMedia(photo)
                        } 
                    })
                })
            })
        }
    })
    function closeDropdown(){
        selectLien.forEach(li => {
            if(!li.classList.contains('selected')){
                li.classList.toggle('hidden')
                li.classList.remove('selected')
            }
        })
    }
    function showDropdown(){
        selectLien.forEach(li => {
            if(li.classList.contains('hidden')){
                li.classList.remove('hidden')
            }
        })
    }
}
        
function sortByPopularity(photo){
        photo.sort(function (a,b){return a.likes-b.likes})
}
function sortByDate(photo){
photo.sort((a, b) => new Date(b.date) - new Date(a.date))
}
function sortByTitre(photo){
    photo.sort(function(a, b) {
        return compareStrings(a.title, b.title)
    })
}


export { sortByButtons }