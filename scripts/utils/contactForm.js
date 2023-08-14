
const contactModal = document.getElementById("contact_modal");

function displayModal() {
	contactModal.style.display = "block";
    document.addEventListener("keyup", (e) => {
        if(e.key === "Escape"){
            closeModal()
        }
    })
}

function closeModal() {
    contactModal.style.display = "none";
}

export { displayModal }