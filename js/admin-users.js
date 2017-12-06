const usersURL = 'http://localhost:3000/api/users'

function userRow(firstName, lastName, role){
  return   `<tr>
      <td scope="row"><i class="material-icons delete-user">close</i></td>
      <td>${firstName} ${lastName}</td>
      <td><i class="material-icons ${role}">account_box</i></td>
    </tr>
    `
}

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

  //add rows
  adminTable.innerHTML = ""
  return axios.get(usersURL, { headers: { authorization: `Bearer ${snacksUserToken}`} })
  .then(result => {
    result.data.response.forEach(el => {
      adminTable.innerHTML += userRow(el.first_name, el.last_name, el.role)
    })

  })

}
loadUsers(usersURL)
