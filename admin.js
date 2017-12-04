const usersURL = 'http://localhost:3000/api/users'

let adminTable = document.querySelector('.admin-table')

///////////LOAD ALL USERS
// function loadUsers(usersURL){
//
//   return axios.get(usersURL)
//     .then(result => {
//       console.log(result.data);
//     })
//
// }
// loadUsers(usersURL)

// function userTable(id, name){
//   return `<tr>
//     <td scope="row" data-id=${id}><i class="material-icons delete-user">close</i></td>
//     <td>${name}</td>
//     <td><i class="material-icons toggle-admin">account_box</i></td>
//   </tr>`
// }

function loadSnacks(baseURL){
  return axios.get(baseURL)
  .then(result => {
    result.data.response.forEach(el => {
      adminTable.innerHTML += snackRow(el.id, el.name)
    })
    let deleteSnack = document.querySelectorAll('.delete-snack')
    for (var i = 0; i < deleteSnack.length; i++) {
      deleteSnack[i].addEventListener('click', (e) => {
        console.log(e.target.getAttribute('data-id'));
      })
    }
  })
}
loadSnacks('http://localhost:3000/api/snacks')

function snackRow(id, name){
  return `<tr data-id="${id}">
    <td scope="row"><i class="material-icons delete-snack" data-id="${id}">close</i></td>
    <td>${name}</td>
    <td><i class="material-icons edit-snack" data-id="${id}">mode_edit</i></td>
  </tr>`
}

// function deleteSnack(id){
//   return axios.delete(baseURL)
//   .then(result => {
//     console.log(result);
//   })
// }
