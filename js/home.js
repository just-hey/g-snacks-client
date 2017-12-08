const carouselContainer = document.querySelector('.carousel')
const snacksContainer = document.querySelector('.snack-content')
const footerContainer = document.querySelector('.page-footer')
let reviewsContainer = document.querySelector('.reviews-list')

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
  return axios.get(`${baseURL}/snacks/${id}/reviews`)
    .then(result => {
      let theResult = result.data.response
      //if there is atleast one review for the snack
      if (theResult[0].title !== null) {
        //populate html with reviews header
        reviewsContainer.innerHTML = loadReviewHeader()
        //populate html with reviews info card
        let totalSnackRating = 0
        let count = 0
        for (var i = 0; i < theResult.length; i++) {
          let thisSnack = theResult[i]
          totalSnackRating += theResult[i].rating
          count++
          reviewsContainer.innerHTML += loadUserReviews(theResult[i].title, theResult[i].first_name, theResult[i].last_name, theResult[i].text, starMaker(theResult[i].rating))
        }
        //populate snack card info
        let avgSnackRating = avgRating(totalSnackRating, count)
        snacksContainer.innerHTML = oneSnackCard(theResult[0].id, theResult[0].name, theResult[0].description, theResult[0].img, starMaker(avgSnackRating))
      }
      //else there are no reviews for said snack it's rating will be 0!
      else {
        snacksContainer.innerHTML = oneSnackCard(theResult[0].id, theResult[0].name, theResult[0].description, theResult[0].img, starMaker())
        reviewsContainer.innerHTML = encourageUserReviews(theResult[0].name)
        navBar.classList.add('dark-blue')
        carouselContainer.classList.add('hide')
        footerContainer.classList.add('hide')
      }

      let snackId = theResult[0].id
      return snackId
    })
    .then(snackId => {
      return addReview(snackId)
    })


}

//////////CREATES STARS TO DROP INTO REVIEWS
function starMaker(rating = 0) {
  let stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border']
  for (var i = 0; i < rating; i++) {
    stars[i] = 'star'
  }
  return stars
}

/////ADD review
function addReview(snackId){
  //add the review button

  //LISTEN for add review click
  let reviewButton = document.querySelector('.review-button')
  let addReview = document.querySelector('.add-review')
  //
  addReview.addEventListener('click', (e) => {
    reviewButton.classList.add('hide')
    let addReviewContainer = document.querySelector('.add-review-container')
    addReviewContainer.innerHTML = addReviewForm()

    //LISTEN for star clicks
    listenForStars()

    //LISTEN for cancel
    let cancelButton = document.querySelector('.cancel')
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault()
      reviewButton.classList.remove('hide')
      addReviewContainer.innerHTML = ""
    })

    //LISTEN for save --> route
    let saveReview = document.querySelector('.save-review')
    saveReview.addEventListener('click', (e) => {
      e.preventDefault()
      //grab new review data
      let newReviewTitle = document.querySelector('.review-title').value
      let newReviewText = document.querySelector('#review-text').value
      let submittedStars = document.querySelectorAll('.review-stars .star')
      //count stars
      let starCount = 0
      for (var i = 0; i < submittedStars.length; i++) {
        if(submittedStars[i].textContent === 'star'){
          starCount++
        }
      }

      let body = {
        title: newReviewTitle,
        text: newReviewText,
        rating: starCount,
        snack_id: snackId,
        user_id: snacksUser.id
      }
      return axios.post(`${baseURL}/reviews`, body, { headers: { authorization: `Bearer ${snacksUserToken}` } })
      .then(result => {
        //refresh the page with review
        let snackId = result.data.response[0].snack_id
        justOneSnack(baseURL, snackId)
      })
    })

  })

}

function listenForStars(){
  let reviewStarsContainer = document.querySelector('.review-stars')
  let reviewStars = document.querySelectorAll('.review-stars .star')
  for (var i = 0; i < reviewStars.length; i++) {
    reviewStars[i].addEventListener('click', (e) => {
      let thisStarNum = Number(e.target.getAttribute('data-star'))
      let firstStar = reviewStars[0]
      reviewStarsContainer.innerHTML = ""
      reviewStarsContainer.innerHTML = countStars(thisStarNum, 5, firstStar)
      //puts the event listeners back on
      listenForStars()
    })
  }
}

function countStars(num, limit, firstStar){
  let result = ``

  let i = 0
  while(i < num){
    result += `<i class="material-icons star" data-star="${i+1}">star</i>`
    i++
  }
  while(i < limit){
    result += `<i class="material-icons star" data-star="${i+1}">star_border</i>`
    i++
  }

  return result
}

//////////GENERATES AVERAGE RATING FOR THE VIEWONESNACK PAGE
function avgRating(totalSnackRating, count) {
  return totalSnackRating/count
}
