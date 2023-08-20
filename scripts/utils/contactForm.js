
const contactModal = document.getElementById("contact_modal");
document.querySelector('.contact_button').onclick = function() {displayModal()}
const contactButton = document.querySelector('#contact-modal__button')

contactButton.addEventListener('click', function (e) {
    e.preventDefault()

    const nom = document.querySelector('#nom').value
    const message = document.querySelector('#message').value
    const prenom = document.querySelector('#prenom').value
    console.log(prenom, nom, message)
    
})

function displayModal() {
	contactModal.style.display = "block";
    document.addEventListener("keyup", (e) => {
        if(e.key === "Escape"){
            closeModal()
        }
    })
}
document.querySelector('.close_button').onclick = function() {closeModal()}

function closeModal() {
    contactModal.style.display = "none";
}

export { displayModal }