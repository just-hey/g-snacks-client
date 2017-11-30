const baseURL = 'http://localhost:3000/api/snacks'

let snacksContainer = document.querySelector('.snack-content')
let footerContainer = document.querySelector('.page-footer')

//////////LOAD SNACKS
function loadSnacks(baseURL){
  return axios.get(baseURL)
    .then(result => {
      result.data.response.forEach(el => {
        snacksContainer.innerHTML += snackCard(el.id, el.name, el.description, el.img)
      })
    })
}
loadSnacks(baseURL)
