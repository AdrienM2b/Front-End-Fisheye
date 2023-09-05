function likes(photo){
    const textLikes =  document.querySelectorAll('.total-likes')
    // calcul du nombre total de likes
    var totalLikes = 0

    photo.forEach((like) => {
        totalLikes += like.likes
    })
    textLikes.innerText = totalLikes
  
    // incrementation du like
    const boutonLike = document.querySelectorAll('.like-button')
    boutonLike.forEach((bouton, index) => {
        bouton.addEventListener('click', () => {
            changeLikes(index)
        })
        
        bouton.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
            changeLikes(index)
            }
        })
    })
    // ajouter ou supprimer un like lorsque qu'on clique sur le coeur
    function changeLikes(index) {
        let bouton = boutonLike[index]
        let like = bouton.childNodes[0]
        let nbrLikesImg = parseInt(like.textContent)
        let photoLikes = photo[index].likes        
        if(photoLikes === nbrLikesImg){
            nbrLikesImg++
            totalLikes++
        }else{
            nbrLikesImg--
            totalLikes--
        }
      
        like.innerHTML = nbrLikesImg
        textLikes.innerHTML = totalLikes
    }
      
}

export { likes }