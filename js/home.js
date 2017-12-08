const carouselContainer = document.querySelector('.carousel')
const snacksContainer = document.querySelector('.snack-content')
const footerContainer = document.querySelector('.page-footer')
let reviewsContainer = document.querySelector('.reviews-list')

// CUSTOM PAGE UPDATER
function pageUpdate() {
  if (snacksUser) {
    carouselContainer.style.display = 'none'
    navBar.style.backgroundColor = 'rgb(45, 71, 119)'
  }
  else {
    carouselContainer.style.display = 'block'
    navBar.style.backgroundColor = 'rgba(45, 71, 119, 0)'
  }
}


//////////LOAD ALL SNACKS
function loadSnacks(baseURL){
  return axios.get(`${baseURL}/snacks`)
    .then(result => {
      result.data.response.forEach(el => {
        snacksContainer.innerHTML += snackCard(el.id, el.name, el.description, el.img)
        let snackLinks = document.querySelectorAll('.snackLink')
        let snackCardContainer = document.querySelectorAll('.card')
        for (let i = 0; i < snackLinks.length; i++) {
          snackCardContainer[i].addEventListener('click', (e) => {
            e.preventDefault()
            let snackID = e.target.getAttribute('data-id')
            let thisSnack = result.data.response
            justOneSnack(baseURL, thisSnack[i].id)
          })
        }
      })
    })
}

loadSnacks(baseURL)

//////////LOAD ONE SNACK AND ALL OF IT'S REVIEWS
function justOneSnack(baseURL, id) {
  let avgSnackRating = 0
  return axios.get(`${baseURL}/snacks/${id}/reviews`)
    .then(result => {
      let theResult = result.data.response

      //if there is atleast one review for the snack
      if (theResult[0].title !== null) {
        snacksContainer.innerHTML = oneSnackCard(theResult[0].id, theResult[0].name, theResult[0].description, theResult[0].img)
        for (var i = 0; i < theResult.length; i++) {
          let thisSnack = theResult[i]
          avgSnackRating += theResult[i].rating
          // console.log('average!', (avgSnackRating))
          reviewsContainer.innerHTML += loadUserReviews(theResult[i].title, theResult[i].first_name, theResult[i].last_name, theResult[i].text, starMaker(theResult[i].rating))
        }
      }
      //else there are no reviews for said snack
      else {
        snacksContainer.innerHTML = oneSnackCard(theResult[0].id, theResult[0].name, theResult[0].description, theResult[0].img)
        navBar.classList.add('dark-blue')
        carouselContainer.classList.add('hide')
        footerContainer.classList.add('hide')
      }
    })
    .then(result => {
      console.log(result);
      addReview()
    })


}

//////////CREATES STARS TO DROP INTO REVIEWS
function starMaker(rating) {
  let stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border']
  for (var i = 0; i < rating; i++) {
    stars[i] = 'star'
  }
  return stars
}

/////ADD review
function addReview(){
  //LISTEN for add review click
  let reviewButton = document.querySelector('.review-button')
  let addReview = document.querySelector('.add-review')
  addReview.addEventListener('click', (e) => {
    reviewButton.classList.add('hide')
    let addReviewContainer = document.querySelector('.add-review-container')
    addReviewContainer.innerHTML = addReviewForm()

    //LISTEN for cancel
    let cancelButton = document.querySelector('.cancel')
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault()
      reviewButton.classList.remove('hide')
      addReviewContainer.innerHTML = ""
      //**** need id to get to here
      //justOneSnack(baseURL, id)
    })
    //LISTEN for save --> route
  })
}
