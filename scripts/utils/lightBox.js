// creer le html de la modale
function createLightbox() {
    const modal = document.createElement('div');
    modal.classList.add('modal__img');
    modal.setAttribute('id', 'lightbox-modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    const close = document.createElement('button');
    close.classList.add('close');
    close.innerHTML = '&times;';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('button-container');

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev');
    prevButton.innerHTML = '&lt;';

    const nextButton = document.createElement('button');
    nextButton.classList.add('next');
    nextButton.innerHTML = '&gt;';

    buttonsContainer.appendChild(prevButton);
    buttonsContainer.appendChild(nextButton);

    modal.appendChild(modalContent);
    modal.appendChild(close);
    modal.appendChild(buttonsContainer);

    return modal;
}

// Gestion de l'affichage des images et des boutons
function addImageToLightbox() {
    const mediaElements = document.querySelectorAll('.media');
    const lightboxModal = createLightbox();
    let currentIndex = 0;

    mediaElements.forEach((mediaElement, index) => {
        mediaElement.addEventListener('click', (e) => {
            e.preventDefault();

            // Vérifier si c'est une vidéo ou une image
            const isVideo = mediaElement.childNodes[0].nodeName
            const mediaTag = isVideo === 'IMG' ? 'IMG' : 'VIDEO'
            
            // Récupérer l'URL du média depuis l'attribut correspondant
            const mediaUrl = mediaElement.href

            // Créer l'élément média (img ou video)
            const mediaToShow = document.createElement(mediaTag)
            mediaToShow.setAttribute('src', mediaUrl)

            // Effacer le contenu précédent de la lightbox et ajouter le média
            const modalContent = lightboxModal.querySelector('.modal__content')
            modalContent.innerHTML = '' // Effacer le contenu précédent
            modalContent.appendChild(mediaToShow)
            
            function nextImage(){
                currentIndex = (currentIndex + 1) % mediaElements.length
                const newMediaElement = mediaElements[currentIndex]
                const newMediaUrl = newMediaElement.href

                const isnewMediaElementVideo = newMediaElement.childNodes[0].nodeName
                const newMediaElemenMediaTag = isnewMediaElementVideo === 'IMG' ? 'IMG' : 'VIDEO'



                const newMediaToShow = document.createElement(newMediaElemenMediaTag)
                newMediaToShow.setAttribute('src', newMediaUrl)

                modalContent.innerHTML = '' // Effacer le contenu précédent
                modalContent.appendChild(newMediaToShow)
            }

            function prevImage(){
                currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length
                const newMediaElement = mediaElements[currentIndex]
                const newMediaUrl = newMediaElement.href

                const isnewMediaElementVideo = newMediaElement.childNodes[0].nodeName
                const newMediaElemenMediaTag = isnewMediaElementVideo === 'IMG' ? 'IMG' : 'VIDEO'



                const newMediaToShow = document.createElement(newMediaElemenMediaTag)
                newMediaToShow.setAttribute('src', newMediaUrl)

                modalContent.innerHTML = ''
                modalContent.appendChild(newMediaToShow)
            }

            // Fermer la lightbox
            function closeModal(){
                lightboxModal.style.display = 'none'
            }
            const close = lightboxModal.querySelector('.close')
            close.addEventListener('click', () => {
                closeModal()
            });

            // Gestionnaire pour le média suivant au clic 
            const nextButton = lightboxModal.querySelector('.next')
            nextButton.addEventListener('click', () => {
                nextImage()
            })
            const prevButton = lightboxModal.querySelector('.prev')
            prevButton.addEventListener('click', () => {
                prevImage()
            })

            // Gestionnaire pour le média suivant avec les boutons
            window.addEventListener('keydown', function(event) {
                switch (event.key){
                    case 'ArrowRight':
                        nextImage()
                    break
                    case 'ArrowLeft':
                        prevImage()
                    break
                    case 'Escape':
                        closeModal()
                    break
                }              
            })

            // Afficher la lightbox
            lightboxModal.style.display = 'block'

            // Ajouter la lightbox au document
            document.body.appendChild(lightboxModal)
            currentIndex = index // Mettre à jour l'index courant
        });
    });
}




export { addImageToLightbox }