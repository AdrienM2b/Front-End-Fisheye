import { displayMedia } from "../utils/displayMedia.js"

// trier les titres par ordre alphabetique 
function compareStrings(a, b) {       
    return (a < b) ? -1 : (a > b) ? 1 : 0
}
const main = document.querySelector('main')
        
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

function sortByButtons(photo){
    const elements = ['Date', 'Popularité', 'Titre']
    // element regroupant les 2 container le parapgraphe et le bouton
    const container = document.createElement('div')
    container.classList = "sort_by-container"

    // conteneur tri + boite
    const parapgraph = document.createElement('p')
    parapgraph.textContent = 'Trier par'

    // Le conteneur du bouton + de la liste
    const inputSelection = document.createElement('div')
    inputSelection.classList = 'bouton_input'
    inputSelection.addEventListener("click", toggleDropdown)

    // conteneur du placeholder + de la fleche
    const containerArrowInput = document.createElement('div')
    containerArrowInput.classList = 'container_arrow_input'

    // fleche vers le bas
    const arrowDown = document.createElement('span')
    arrowDown.innerHTML = '&lt;'
    arrowDown.classList.add('arrow', 'down')

    // le titre du bouton (par defaut 'Date')
    const placeholder = document.createElement("p")
    placeholder.textContent = elements[0];
    placeholder.classList.add('placeholder')

    container.appendChild(parapgraph)
    container.appendChild(inputSelection)
    containerArrowInput.appendChild(arrowDown)
    containerArrowInput.appendChild(placeholder)
    inputSelection.appendChild(containerArrowInput)
    main.appendChild(container)

    // la div contenant les choix de tri
    const structure = document.createElement("div")
    structure.classList.add("structure", "hide")

    // Creation de chaque choix
    elements.forEach(uniqueElements => {
        const option = document.createElement("div")
        // On ajoute un ecouteur pour chaque choix de tri
        option.addEventListener("click", (event) => selectOption(event))
        option.textContent = uniqueElements
        structure.appendChild(option)
    })

    inputSelection.appendChild(structure)

    // afficher le dropdown
    function toggleDropdown() {
        const dropdown = document.querySelector(".structure")
        dropdown.classList.toggle("hide")
        placeholder.classList.toggle("hide")
      
        const input = document.querySelector(".bouton_input")
        input.classList.toggle("input__active")
        const arrow = document.querySelector('.arrow')
        arrow.classList.toggle('up')
    }

    // afficher l'elements selectionné et trier les photos
    function selectOption(event) {
        event.stopPropagation()
        const elementsSelectionne = event.target.innerHTML
        console.log(elementsSelectionne)
        const text = document.querySelector('.placeholder')

        text.textContent = elementsSelectionne
        text.classList.add('input__selected')
        toggleDropdown()

        const gallery = document.querySelector('.gallery')
        main.removeChild(gallery)
        // choisir le mode de tri
        switch (elementsSelectionne.toLowerCase()) {
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
}




export { sortByButtons }