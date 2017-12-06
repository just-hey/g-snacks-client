const usersURL = 'http://localhost:3000/api/users'
const snacksURL = 'http://localhost:3000/api/snacks'

let snackTab = document.querySelector('.snack-tab')
let userTab = document.querySelector('.user-tab')
let adminTable = document.querySelector('.admin-table')
let adminTableHeader = document.querySelector('.admin-table-header')

/////ADMIN TABS - toggle view and style
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
  //change table header
  adminTableHeader.innerHTML = ""
  adminTableHeader.innerHTML =
  `<tr>
    <th>Delete</th>
    <th>Username</th>
    <th>Admin</th>
  </tr>`
  //placeholder html -!! will be dynamic
  adminTable.innerHTML = ""
  adminTable.innerHTML =
  `<tr>
    <td scope="row"><i class="material-icons delete-user">close</i></td>
    <td>JanelleMonae</td>
    <td><i class="material-icons not-admin">account_box</i></td>
  </tr>
  `
}


function snackRow(id, name){
  return `<tr data-id="${id}">
    <td scope="row"><i class="material-icons delete-snack" data-id="${id}">close</i></td>
    <td>${name}</td>
    <td><i class="material-icons edit-snack" data-id="${id}" data-toggle="modal" data-target="#editSnackModal">mode_edit</i></td>
  </tr>`
}

//////////LOAD SNACKS
function loadAdminSnacks(snacksURL){
  return axios.get(snacksURL)
  .then(result => {
    //change table header
    adminTableHeader.innerHTML = ""
    adminTableHeader.innerHTML =
    `<tr>
      <th>Delete</th>
      <th>Snack</th>
      <th>Edit</th>
    </tr>`

    //add rows
    adminTable.innerHTML = ""
    result.data.response.forEach(el => {
      adminTable.innerHTML += snackRow(el.id, el.name)
    })

    //LISTEN for delete click
    //!! should add "are you sure?" messaging
    let deleteSnack = document.querySelectorAll('.delete-snack')
    for (var i = 0; i < deleteSnack.length; i++) {
      deleteSnack[i].addEventListener('click', (e) => {
        let thisId = e.target.getAttribute('data-id')
        destroySnack(thisId)
      })
    }

    //LISTEN for edit click
    let editSnack = document.querySelectorAll('.edit-snack')
    for (var i = 0; i < editSnack.length; i++) {
      editSnack[i].addEventListener('click', (e) => {
        let thisId = e.target.getAttribute('data-id')
        console.log(thisId);
        //get associated info for this one snack
        return getOneSnack(thisId)
        .then(result => {

          let editFormDiv = document.querySelector('.edit-form')

          //populate edit form
          adminTableHeader.innerHTML = ""
          adminTable.innerHTML = ""
          adminTableHeader.innerHTML = editSnackForm(result.id, result.name, result.description, result.img)

          //LISTEN for save
          let saveEdit = document.querySelector('.save-edit')


          //LISTEN for cancel
          let cancelEdit = document.querySelector('.cancel')
          cancelEdit.addEventListener('click', (e) => {
            console.log("cancel edit");
            adminTable.innerHTML = ""
            loadAdminSnacks(snacksURL)
          })


          // //MDB MODAL
          // //locate form inputs in DOM
          // let nameValue = document.querySelector('#editsnack-name')
          // let descriptionValue = document.querySelector('#editsnack-description')
          // let imageValue = document.querySelector('#editsnack-imageURL')
          //
          // //add values
          // nameValue.setAttribute('value', result.name)
          // descriptionValue.setAttribute('value', result.description)
          // imageValue.setAttribute('value', result.img)
          //
          // //listen for click on submit
          // let editSave = document.querySelector('#edit-save')
          // editSave.addEventListener('click', (e) => {
          //
          //   let body = {name: nameValue.value, description: descriptionValue.value, img: imageValue.value}
          //   //bug: after editing one snack, then the edited values appear for every other snack that's clicked on.
          //   axios.put(`${snacksURL}/${thisId}`, body)
          //   .then(result => {
          //     $('#editSnackModal').modal('hide')
          //     loadAdminSnacks(snacksURL)
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   })
          // })

        })
      })
    }
  })
  .catch((err) => {console.log(err)})
}
loadAdminSnacks(snacksURL)

//////////GET ONE SNACK
function getOneSnack(id){
  return axios.get(`${snacksURL}/${id}`)
  .then(result => {
    return result.data.response
  })
  .catch((err) => {console.log(err)})
}

//////////DELETE ONE SNACK
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

//////////EDIT ONE SNACK
//not currently being used !!
function editSnack(id, body){
  return axios.put(`${snacksURL}/${id}`, body)
  .then(result => {
  })
  .catch(err => {
    console.log(err);
  })
}
