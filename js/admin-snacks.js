const snacksURL = `${baseURL}api/snacks`
let addSnackButton = document.querySelector('.add-snack')

function snackRow(id, name){
  return `<tr data-id="${id}">
    <td scope="row"><i class="material-icons delete-snack" data-id="${id}">close</i></td>
    <td>${name}</td>
    <td><i class="material-icons edit-snack" data-id="${id}" >mode_edit</i></td>
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
        //get associated info for this one snack
        return getOneSnack(thisId)
        .then(result => {
          let editFormDiv = document.querySelector('.edit-form')
          //populate edit form
          adminTableHeader.innerHTML = ""
          adminTable.innerHTML = ""
          addSnackButton.classList.add('hide')
          adminTableHeader.innerHTML = editSnackForm(result.id, result.name, result.description, result.img)

          //LISTEN for save
          let saveEdit = document.querySelector('.save-edit')
          saveEdit.addEventListener('click', (e) => {
            let saveId = e.target.getAttribute('data-id')

            return getOneSnack(saveId)
            .then(result => {
              //assign body to new values
              let snackNameValue = document.querySelector('#snack-name').value
              let snackDescriptionValue = document.querySelector('#snack-description').value
              let snackImageValue = document.querySelector('#snack-image').value

              //put new values into the PUT route
              let body =
              {
                name: snackNameValue,
                description: snackDescriptionValue,
                img: snackImageValue
              }
              return axios.put(`${snacksURL}/${saveId}`, body, { headers: { authorization: `Bearer ${snacksUserToken}` } })
              .then(result => {
                console.log(result);
                adminTable.innerHTML = ""
                addSnackButton.classList.remove('hide')
                loadAdminSnacks(snacksURL)
              })
              .catch(err => {console.log(err)})

            })

          })

          //LISTEN for cancel
          let cancelEdit = document.querySelector('.cancel')
          cancelEdit.addEventListener('click', (e) => {
            adminTable.innerHTML = ""
            addSnackButton.classList.remove('hide')
            loadAdminSnacks(snacksURL)
          })

        })
      })
    }
  })
  .catch((err) => {console.log(err)})
}
loadAdminSnacks(snacksURL)

/////LISTEN for add snack
addSnackButton.addEventListener('click', (e) => {
  //swap in add snack template
  //populate edit form
  adminTableHeader.innerHTML = ""
  adminTable.innerHTML = ""
  addSnackButton.classList.add('hide')
  adminTableHeader.innerHTML = addSnackForm()

  //LISTEN for save
  let saveNewSnack = document.querySelector('.save-new')
  saveNewSnack.addEventListener('click', (e) => {
    //grab values
    let newSnackName = document.querySelector('#snack-name').value
    let newSnackDescription = document.querySelector('#snack-description').value
    let newSnackImg = document.querySelector('#snack-image').value

    let body = {
      name:newSnackName, description:newSnackDescription,
      img:newSnackImg}
    return axios.post(`${snacksURL}`, body, { headers: { authorization: `Bearer ${snacksUserToken}` } })
    .then(result => {
      adminTable.innerHTML = ""
      addSnackButton.classList.remove('hide')
      loadAdminSnacks(snacksURL)
    })
    .catch((err) => {console.log(err)})

  })

  //LISTEN for cancel
  let cancelEdit = document.querySelector('.cancel')
  cancelEdit.addEventListener('click', (e) => {
    adminTable.innerHTML = ""
    addSnackButton.classList.remove('hide')
    loadAdminSnacks(snacksURL)
  })
})

//////////ADD A SNACK
// !! also not being used
function addSnack(body){
  return axios.post(`${snacksURL}`, body, { headers: { authorization: `Bearer ${snacksUserToken}` } })
  .then(result => {
    console.log(result.data);
  })
  .catch((err) => {console.log(err)})
}

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
  return axios.delete(`${snacksURL}/${id}`, { headers: { authorization: `Bearer ${snacksUserToken}` } })
  .then(result => {
    adminTable.innerHTML = ""
    return loadAdminSnacks(snacksURL)
  })
  .catch(err => {console.log(err)})
}

//////////EDIT ONE SNACK
//not currently being used !!
function editSnack(id, body){
  return axios.put(`${snacksURL}/${id}`, body, { headers: { authorization: `Bearer ${snacksUserToken}` } })
  .then(result => {
  })
  .catch(err => {console.log(err)})
}
