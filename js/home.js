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
  return axios.get(`${baseURL}/snacks/${id}/reviews`)
    .then(result => {
      let theResult = result.data.response
      //if there is atleast one review for the snack
      if (theResult[0].title !== null) {
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

//////////GENERATES AVERAGE RATING FOR THE VIEWONESNACK PAGE
function avgRating(totalSnackRating, count) {
  return totalSnackRating/count
}
