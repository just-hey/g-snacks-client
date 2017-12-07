const usersURL = 'http://localhost:3000/api/users'

function userRow(id, firstName, lastName, role){
  return   `<tr data-id="${id}">
      <td scope="row">
        <i class="material-icons delete-user" data-id="${id}">close</i>
      </td>
      <td>${firstName} ${lastName}</td>
      <td>
        <i class="material-icons user-role ${role}" data-id="${id}">account_box</i>
      </td>
    </tr>
    `
}

//////////LOAD USERS
function loadAdminUsers(usersURL){

  return axios.get(usersURL, { headers: { authorization: `Bearer ${snacksUserToken}`} })
  .then(result => {
    //change table header
    adminTableHeader.innerHTML = ""
    adminTableHeader.innerHTML =
    `<tr>
      <th>Delete</th>
      <th>Username</th>
      <th>Admin</th>
    </tr>`

    //add rows
    adminTable.innerHTML = ""
    result.data.response.forEach(el => {
      adminTable.innerHTML += userRow(el.id, el.first_name, el.last_name, el.role)
    })

    //LISTEN for delete click
    let deleteUser = document.querySelectorAll('.delete-user')
    for (var i = 0; i < deleteUser.length; i++) {
      deleteUser[i].addEventListener('click', (e) => {
        let userId = e.target.getAttribute('data-id')
        destroyUser(userId)
      })
    }

    //LISTEN for user/admin role click
    let roleToggle = document.querySelectorAll('.user-role')
    for (var i = 0; i < roleToggle.length; i++) {
      roleToggle[i].addEventListener('click', (e) => {
        //change color
        if(e.target.classList.contains('user')){
          e.target.classList.remove('user')
          e.target.classList.add('admin')
        } else {
          e.target.classList.remove('admin')
          e.target.classList.add('user')
        }
        //get user id, role, and run route to update
      })
    }
  })

}
loadAdminUsers(usersURL)

//////////DELETE ONE SNACK
function destroyUser(id){
  return axios.delete(`${usersURL}/${id}`, { headers: { authorization: `Bearer ${snacksUserToken}`} })
  .then(result => {
    adminTable.innerHTML = ""
    return loadAdminUsers(usersURL, )
  })
  .catch(err => {console.log(err)})
}
