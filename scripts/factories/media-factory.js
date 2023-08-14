function mediaFactory(dataMedia){
    const {likes, title, image, video, photographerId} = dataMedia;
    // cette fonction c'est juste un pattern pour creer
    // une image avec les likes et le titre
    const picture = `assets/photographers/Sample_Photos/${photographerId}/${image}`
    const mp4 = `assets/photographers/Sample_Photos/${photographerId}/${video}`

    function createMedia(){
        //Une div qui contient le lien image + le contenu sous l'image 
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-container'); 
        // une ligne pour creer l'image
        const mediaPhotograph = video
            ? document.createElement('video')
            : document.createElement('img');
        //Une ligne qui créer un lien pour contenir les élements 
        const mediaLink = document.createElement('a');
        mediaLink.classList.add('media')
        mediaLink.setAttribute('href', video ? mp4 : picture)
        mediaLink.setAttribute('aria-role', "button")
        // Définir l'attribut `src` de l'élément `video` ou `img` en fonction de la valeur de `video`
        mediaPhotograph.setAttribute('src', video ? mp4 : picture);
        mediaPhotograph.setAttribute('alt', video ? title : title);
        mediaPhotograph.setAttribute('aria-label', video ? `video` : `image` ); 

        //afficher le content de l'image
        const imgContent = document.createElement('div')
        imgContent.classList.add('img-content')

        //une ligne qui va chercher le titre dans le json
        const imgTitle = document.createElement('p');
        imgTitle.textContent = title;
        // creation du bouton contenant le nbr de like et le bouton coeur
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.setAttribute('aria-role', 'bouton' );
        likeButton.setAttribute('aria-label', `liker` );

        //une ligne qui va chercher le nombre de likes dans le json
        const nbrOfLikes = document.createElement('p');
        nbrOfLikes.classList.add('nbr_of_likes');
        nbrOfLikes.setAttribute('aria-label', 'nombre de likes' );
        nbrOfLikes.textContent = likes;
        // creation de l'icone
        const icone = document.createElement('i');
        icone.classList.add('fa-solid', 'fa-heart');

        imgContent.appendChild(imgTitle)
        imgContent.appendChild(likeButton)

        likeButton.appendChild(nbrOfLikes)
        likeButton.appendChild(icone)

        mediaLink.appendChild(mediaPhotograph)
    
        mediaContainer.appendChild(mediaLink)
        mediaContainer.appendChild(imgContent)

        //et on retourne la div
        return mediaContainer
    }

    function buttonSort(){
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

        return listTitle
    }
    return {picture , video, createMedia, buttonSort}
}

export { mediaFactory }