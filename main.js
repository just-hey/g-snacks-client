const baseURL = 'http://localhost:3000/api'

let navBar = document.querySelector('.navbar')
let carouselContainer = document.querySelector('.carousel')
let snacksContainer = document.querySelector('.snack-content')
let footerContainer = document.querySelector('.page-footer')
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
  return axios.get(`${baseURL}/snacks/${id}`)
    .then(result => {
      let theResult = result.data.response
      snacksContainer.innerHTML = oneSnackCard(theResult[0].id, theResult[0].name, theResult[0].description, theResult[0].img)
      if (theResult[0].title !== null) {
        for (var i = 0; i < theResult.length; i++) {
          let thisSnack = theResult[i]
            reviewsContainer.innerHTML += loadUserReviews(theResult[i].title, theResult[i].first_name, theResult[i].last_name, theResult[i].text, starMaker(theResult[i].rating))
        }
      }
      navBar.classList.add('dark-blue')
      carouselContainer.classList.add('hide')
      footerContainer.classList.add('hide')
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
