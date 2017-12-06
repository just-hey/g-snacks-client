const usersURL = 'http://localhost:3000/api/users'

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
  ///how can I access during dev??
  return axios.get(usersURL, { headers: { authorization: `Bearer ${snacksUserToken}`} })
  .then(result => {
    console.log(result.data.response);
  })

}
loadUsers(usersURL)
