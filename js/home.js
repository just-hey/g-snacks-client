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
            window.scrollTo(0,0)
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
      //variables to hold reviews
      const thisUsersReview = []
      const othersReviews = []
      let userHasReview = false //hold status for if this user has already left a review
      //if there is atleast one review for the snack
      if (theResult[0].title !== null) {
        //separate reviews into this user and others
        theResult.forEach(result => {
          if (snacksUser && result.user_id === snacksUser.id) thisUsersReview.push(result)
          else othersReviews.push(result)
        })
        //make sure reviewsContainer is empty
        reviewsContainer.innerHTML = ''
        //initialize snack ratings counts
        let totalSnackRating = 0
        let count = 0
        //if this user review, populate it in top section
        if (thisUsersReview.length > 0) {
          userHasReview = true
          reviewsContainer.innerHTML = loadUserReviewHeader()
          // let thisSnack = othersReviews[i]
          totalSnackRating += thisUsersReview[0].rating
          count++
          reviewsContainer.innerHTML += loadUserReviews(thisUsersReview[0].title, thisUsersReview[0].first_name, thisUsersReview[0].last_name, thisUsersReview[0].text, starMaker(thisUsersReview[0].rating))
        }
        //populate html with other reviews (if present)
        if (othersReviews.length > 0) {
          reviewsContainer.innerHTML += loadReviewHeader()
          //populate html with reviews info card
          for (var i = othersReviews.length -1; i >= 0 ; i--) {
            // let thisSnack = othersReviews[i]
            totalSnackRating += othersReviews[i].rating
            count++
            reviewsContainer.innerHTML += loadUserReviews(othersReviews[i].title, othersReviews[i].first_name, othersReviews[i].last_name, othersReviews[i].text, starMaker(othersReviews[i].rating))
          }
        }
        //populate snack card info
        let avgSnackRating = avgRating(totalSnackRating, count)
        snacksContainer.innerHTML = oneSnackCard(theResult[0].snack_id, theResult[0].name, theResult[0].description, theResult[0].img, starMaker(avgSnackRating))
      }
      //else there are no reviews for said snack it's rating will be 0!
      else {
        snacksContainer.innerHTML = oneSnackCard(theResult[0].snack_id, theResult[0].name, theResult[0].description, theResult[0].img, starMaker())
        reviewsContainer.innerHTML = encourageUserReviews(theResult[0].name)
        navBar.classList.add('dark-blue')
        carouselContainer.classList.add('hide')
        footerContainer.classList.add('hide')
      }
      //add review button
      let snackId = theResult[0].snack_id
      if (snacksUser && userHasReview) return addOptionToUpdateReview(thisUsersReview[0])
      else if (snacksUser) return addOptionToReview(snackId)
      else return addOptionToLogin(snackId)
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
function addOptionToReview(snackId){
  //add the review button
  let reviewButtonSpan = document.querySelector('.snack-review-button')
  reviewButtonSpan.innerHTML =
  `<a href="#" class="btn review-button add-review">Leave your own review</a>`
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
      .catch(error => {
        let reviewErrorMessage = document.querySelector('.review-error-message')

        reviewErrorMessage.innerHTML =
        `<div class="alert alert-danger mt-3" role="alert">
          ${error.response.data.message}
        </div>`
      })
    })

  })

}

/////EDIT & DELETE review
function addOptionToUpdateReview(currentReview){
  //add the review and delete buttons
  let reviewButtonSpan = document.querySelector('.snack-review-button')
  reviewButtonSpan.innerHTML = `
    <a class="btn review-button" id="update-review">Update your review</a>
    <a class="btn review-button" id="delete-review">Delete your review</a>
    `
  let reviewId = currentReview.review_id
  let snackId = currentReview.snack_id

  //LISTEN for update review click
  let updateReview = document.querySelector('#update-review')
  
  updateReview.addEventListener('click', (e) => {
    let updateReviewContainer = document.querySelector('.add-review-container')
    updateReviewContainer.innerHTML = addReviewForm()
    //POPULATE review form
    document.querySelector('.review-title').value = currentReview.title
    document.querySelector('#review-text').value = currentReview.text
    let submittedStars = document.querySelectorAll('.review-stars .star')
    for (let i = 0; i < currentReview.rating; i++) {
      submittedStars[i].innerText = 'star'
    }
    //LISTEN for star clicks
    listenForStars()

    //LISTEN for cancel
    let cancelButton = document.querySelector('.cancel')
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault()
      updateReviewContainer.innerHTML = ""
    })

    //LISTEN for save --> route
    let saveReview = document.querySelector('.save-review')
    saveReview.addEventListener('click', (e) => {
      e.preventDefault()
      //grab new review data
      let newReviewTitle = document.querySelector('.review-title').value
      let newReviewText = document.querySelector('#review-text').value
      submittedStars = document.querySelectorAll('.review-stars .star')
      //count stars
      let starCount = 0
      for (var i = 0; i < submittedStars.length; i++) {
        if(submittedStars[i].textContent === 'star'){
          starCount++
        }
      }
      //create update body
      let body = {}
      if (newReviewTitle.length > 0) body.title = newReviewTitle
      if (newReviewText.length > 0) body.text = newReviewText
      if (starCount > 0) body.rating = starCount
      //send put request to server
      return axios.put(`${baseURL}/reviews/${reviewId}`, body, { headers: { authorization: `Bearer ${snacksUserToken}` } })
      .then(result => {
        //refresh the page with review
        justOneSnack(baseURL, snackId)
      })
      .catch(error => {
        let reviewErrorMessage = document.querySelector('.review-error-message')

        reviewErrorMessage.innerHTML =
        `<div class="alert alert-danger mt-3" role="alert">
          ${error.response.data.message}
        </div>`
      })
    })
  })

  //LISTEN for delete review click
  let deleteReview = document.querySelector('#delete-review')
  
  deleteReview.addEventListener('click', (e) => {
    //send delete request to server
    return axios.delete(`${baseURL}/reviews/${reviewId}`, { headers: { authorization: `Bearer ${snacksUserToken}` } })
    .then(result => {
      //refresh the page
      justOneSnack(baseURL, snackId)
    })
    .catch(error => {
      let reviewErrorMessage = document.querySelector('.review-error-message')

      reviewErrorMessage.innerHTML =
      `<div class="alert alert-danger mt-3" role="alert">
        ${error.response.data.message}
      </div>`
    })
  })
}

/////LOGIN to be able to review
function addOptionToLogin(snackId){
  //add the login button
  let reviewButtonSpan = document.querySelector('.snack-review-button')
  reviewButtonSpan.innerHTML =
  `<a class="btn review-button" id="login-review" data-toggle="modal" data-target="#loginModal">Login to leave a review</a>`
  //LISTEN for login click
  loginButton.addEventListener('click', (e) => {
    //refresh the page with review (give server a chance to verify user)
    setTimeout(() => {
      justOneSnack(baseURL, snackId)
    }, 1500)
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
