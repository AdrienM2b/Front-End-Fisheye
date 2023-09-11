
const contactModal = document.getElementById("contact_modal")

const contactButton = document.querySelector('#contact-modal__button')
contactButton.setAttribute('aria-role', 'button')
contactButton.setAttribute('aria-label', 'ouvrir le formulaire de contact')

function displayModal() {
	contactModal.style.display = "block"
    document.querySelector('#prenom').focus()
}
// Fonction d'affichage des input de la modale
function renvoyerLesInfos(){
    const nom = document.querySelector('#nom').value
    const message = document.querySelector('#message').value
    const prenom = document.querySelector('#prenom').value
    const mail = document.querySelector('#email').value
    console.log(prenom, nom, message, mail)
}

function closeModal() {
    contactModal.style.display = "none"
}

// Gestion ouverture de la modale au clic
document.querySelector('.contact_button').onclick = function() {displayModal()}
document.querySelector('.contact_button').addEventListener('keyup', function(e){
    if(e.key === "Enter"){
        displayModal()
    }
})

// Gestion de la modale au clic
contactButton.addEventListener('click', function (e) {
    e.preventDefault()
    // afficher les éléments dans la console
    renvoyerLesInfos()
    closeModal()
})
// Gestion de la modale au clavier
contactButton.addEventListener("keyup", function (e){
    if(e.key === "Enter"){
        e.preventDefault()
        renvoyerLesInfos()
        closeModal()
    }
})

// Gestion de la fermeture de la modale au clavier

window.addEventListener("keyup", (e) => {
    if(e.key === "Escape"){
        closeModal()
    }
})
document.querySelector('.close_button').onclick = function() {
    closeModal()
}



export { displayModal }