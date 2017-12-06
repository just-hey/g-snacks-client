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
          // if (e.target.matches('.snackLink')) {
            let thisSnack = result.data.response
            // console.log('im a snack!', thisSnack[i]);
            justOneSnack(baseURL, thisSnack[i].id)
          // }
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
      for (var i = 0; i < theResult.length; i++) {
        let thisSnack = theResult[i]
        snacksContainer.innerHTML = oneSnackCard(thisSnack.id, thisSnack.name, thisSnack.description, thisSnack.img)
        reviewsContainer.innerHTML = loadUserReviews(thisSnack.title, thisSnack.first_name, thisSnack.last_name, thisSnack.text, starMaker(thisSnack.rating))
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
