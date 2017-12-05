const usersURL = 'http://localhost:3000/api/users'
const snacksURL = 'http://localhost:3000/api/snacks'

let adminTable = document.querySelector('.admin-table')
let adminTableHeader = document.querySelector('.admin-table-header')

/////ADMIN TABS
let snackTab = document.querySelector('.snack-tab')
let userTab = document.querySelector('.user-tab')

snackTab.addEventListener('click', (e) => {
  if(!snackTab.classList.contains('active-tab')){
    snackTab.classList.add('active-tab')
    userTab.classList.remove('active-tab')
  }
  loadAdminSnacks(snacksURL)
})

userTab.addEventListener('click', (e) => {
  if(!userTab.classList.contains('active-tab')){
    userTab.classList.add('active-tab')
    snackTab.classList.remove('active-tab')
  }
  loadUsers(usersURL)
})

//////////LOAD USERS
function loadUsers(usersURL){

  // return axios.get(usersURL)
  // .then(result => {
  //   console.log(result.data.response);
  // })
  // .catch((err) => {console.log(err)})

  adminTableHeader.innerHTML = ""
  adminTableHeader.innerHTML =
  `<tr>
    <th>Delete</th>
    <th>Username</th>
    <th>Admin</th>
  </tr>`

  adminTable.innerHTML = ""
  adminTable.innerHTML =
  `<tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>JanelleMonae</td>
    <td><i class="material-icons not-admin">account_box</i></td>
  </tr>
  <tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>LukeSkywalkerz</td>
    <td><i class="material-icons not-admin">account_box</i></td>
  </tr>
  <tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>Rey</td>
    <td><i class="material-icons not-admin">account_box</i></td>
  </tr>
  <tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>Sabine Wren</td>
    <td><i class="material-icons not-admin">account_box</i></td>
  </tr>
  <tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>Hera Syndulla</td>
    <td><i class="material-icons not-admin">account_box</i></td>
  </tr>
  <tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>Captain Phasma</td>
    <td><i class="material-icons is-admin">account_box</i></td>
  </tr>`
}


// function userTable(id, name){
//   return `<tr>
//     <td scope="row" data-id=${id}><i class="material-icons delete-user">close</i></td>
//     <td>${name}</td>
//     <td><i class="material-icons toggle-admin">account_box</i></td>
//   </tr>`
// }


//////////LOAD SNACKS
function loadAdminSnacks(snacksURL){
  return axios.get(snacksURL)
  .then(result => {
    adminTableHeader.innerHTML = ""
    adminTableHeader.innerHTML =
    `<tr>
      <th>Delete</th>
      <th>Snack</th>
      <th>Edit</th>
    </tr>`

    adminTable.innerHTML = ""
    result.data.response.forEach(el => {
      adminTable.innerHTML += snackRow(el.id, el.name)
    })

    let deleteSnack = document.querySelectorAll('.delete-snack')
    for (var i = 0; i < deleteSnack.length; i++) {
      deleteSnack[i].addEventListener('click', (e) => {
        let thisId = e.target.getAttribute('data-id')
        destroySnack(thisId)
      })
    }

    let editSnack = document.querySelectorAll('.edit-snack')
    for (var i = 0; i < editSnack.length; i++) {
      editSnack[i].addEventListener('click', (e) => {
        let thisId = e.target.getAttribute('data-id')
        //get associated info for this one snack
        return getOneSnack(thisId)
        .then(result => {
          //locate form inputs in DOM
          let nameValue = document.querySelector('#editsnack-name')
          let descriptionValue = document.querySelector('#editsnack-description')
          let imageValue = document.querySelector('#editsnack-imageURL')

          //add values
          nameValue.setAttribute('value', result.name)
          descriptionValue.setAttribute('value', result.description)
          imageValue.setAttribute('value', result.img)
          console.log(result);
        })
      })
    }
  })
  .catch((err) => {console.log(err)})
}
loadAdminSnacks(snacksURL)

function snackRow(id, name){
  return `<tr data-id="${id}">
    <td scope="row"><i class="material-icons delete-snack" data-id="${id}">close</i></td>
    <td>${name}</td>
    <td><i class="material-icons edit-snack" data-id="${id}" data-toggle="modal" data-target="#editSnackModal">mode_edit</i></td>
  </tr>`
}

function getOneSnack(id){
  return axios.get(`${snacksURL}/${id}`)
  .then(result => {
    return result.data.response
  })
  .catch((err) => {console.log(err)})
}

function destroySnack(id){
  return axios.delete(`${snacksURL}/${id}`)
  .then(result => {
    adminTable.innerHTML = ""
    return loadAdminSnacks(snacksURL)
  })
  .catch(err => {
    console.log(err);
  })
}

function editSnack(id, body){
  return axios.put(`${snacksURL}/${id}`)
  .then(result => {
    //do stuff
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  })
}
