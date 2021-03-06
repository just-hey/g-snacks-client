const usersURL = `${baseURL}/users`

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
        let userId = e.target.getAttribute('data-id')
        let body
        if(e.target.classList.contains('user')){
          e.target.classList.remove('user')
          e.target.classList.add('admin')
          body = { role: "admin" }
          changeUserRole(userId, body)
        } else {
          e.target.classList.remove('admin')
          e.target.classList.add('user')
          body = { role: "user" }
          changeUserRole(userId, body)
        }
      })
    }
  })

}
loadAdminUsers(usersURL)

//////////EDIT USER ROLE
function changeUserRole(id, body){
  return axios.put(`${usersURL}/promote/${id}`, body, { headers: { authorization: `Bearer ${snacksUserToken}`} })
  .then(result => {
    console.log(result.data.response);
  })
  .catch(err => {console.log(err)})
}

//////////DELETE ONE USER
function destroyUser(id){
  return axios.delete(`${usersURL}/${id}`, { headers: { authorization: `Bearer ${snacksUserToken}`} })
  .then(result => {
    adminTable.innerHTML = ""
    return loadAdminUsers(usersURL, )
  })
  .catch(err => {console.log(err)})
}
