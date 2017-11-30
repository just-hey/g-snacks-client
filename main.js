const baseURL = 'http://localhost:3000/api/snacks'

let allSnacksContainer = document.querySelector('.all-snacks')
let oneSnackContainer = document.querySelector('.one-snack')

//////////LOAD SNACKS
function loadSnacks(baseURL){
  return axios.get(baseURL)
    .then(result => {
      result.data.response.forEach(el => {
        allSnacksContainer.innerHTML += snackCard(el.id, el.name, el.description, el.img)
      })

    })
}
loadSnacks(baseURL)

//////////LOAD ONE SNACK
function justOneSnack(baseURL, id) {
  return axios.get(`${baseURL}/${id}`)
    .then(result => {
      oneSnackContainer.innerHTML = result.data.response
      // result.data.response
    })
}
