const baseURL = 'http://localhost:3000/api/snacks'

let navBar = document.querySelector('.navbar')
let carouselContainer = document.querySelector('.carousel')
let snacksContainer = document.querySelector('.snack-content')
let footerContainer = document.querySelector('.page-footer')

//////////LOAD ALL SNACKS
function loadSnacks(baseURL){

  return axios.get(baseURL)
    .then(result => {
      result.data.response.forEach(el => {
        snacksContainer.innerHTML += snackCard(el.id, el.name, el.description, el.img)
      let snackLinks = document.querySelectorAll('.snackLink')
      for (let i = 0; i < snackLinks.length; i++) {
        snackLinks[i].addEventListener('click', (e) => {
          e.preventDefault()
          let snackID = e.target.getAttribute('data-id')
          if (e.target.matches('.snackLink')) {
            let thisSnack = result.data.response
            //console.log('im a snack!', thisSnack[i]);
            justOneSnack(baseURL, thisSnack[i].id)
          }

        })
      }
      })
    })
}
loadSnacks(baseURL)

//////////LOAD ONE SNACK
function justOneSnack(baseURL, id) {
  return axios.get(`${baseURL}/${id}`)
    .then(result => {
      //console.log('this!!!', result.data.response);
      let thisSnack = result.data.response
      snacksContainer.innerHTML = oneSnackCard(thisSnack.id, thisSnack.name, thisSnack.description, thisSnack.img)

      navBar.classList.add('dark-blue')
      carouselContainer.classList.add('hide')
      footerContainer.classList.add('hide')
    })
}
