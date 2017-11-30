const baseURL = 'http://localhost:3000/api/snacks'

let allSnacksContainer = document.querySelector('.all-snacks')

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
