// Login handlers
const signupButton = document.querySelector('#signup-submit')
const signupMessagebox = document.querySelector('#signup-messagebox')
const loginButton = document.querySelector('#login-submit')
const loginMessagebox = document.querySelector('#login-messagebox')

signupButton.addEventListener('click', createUser)
loginButton.addEventListener('click', validateUser)

function createUser() {
  // Get form fields
  const signupFirstName = document.querySelector('#signup-firstname').value
  const signupLastName = document.querySelector('#signup-lastname').value
  const signupEmail = document.querySelector('#signup-email').value
  const signupPassword = document.querySelector('#signup-password').value
  // Send signup request to server
  axios.post(`${baseURL}/users/signup`, { first_name: signupFirstName, last_name: signupLastName, email: signupEmail, password: signupPassword })
  .then(result => {
    const token = result.data.response
    localStorage.setItem('snacksUserToken', token)
    // Display success message
    signupMessagebox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Account created. Welcome!
      </div>
    `
    // Wait 1 second then hide modal
    setTimeout(() => $('#signupModal').modal('hide'), 1000)
    login()
  })
  .catch(error => {
    // Display error
    signupMessagebox.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${error.response.data.message}
      </div>
    `
  })
}

function validateUser() {
  // Get form fields
  const loginEmail = document.querySelector('#login-email').value
  const loginPassword = document.querySelector('#login-password').value
  // Send login request to server
  axios.post(`${baseURL}/users/login`, { email: loginEmail, password: loginPassword })

  .then(result => {
    const token = result.data.response
    localStorage.setItem('snacksUserToken', token)
    // Get user info
    return axios.get(`${baseURL}/users/fromToken`, { headers: { authorization: `Bearer ${token}` } })
  })
  .then(result => {
    const firstName = result.data.response.first_name
    // Display Success message
    loginMessagebox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Welcome back, ${firstName}!
      </div>
    `
    // wait 1 second then hide modal
    setTimeout(() => $('#loginModal').modal('hide'), 1000)
    login()
  })
  .catch(error => {
    // Display error
    loginMessagebox.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${error.response.data.message}
      </div>
    `
  })  
}

// Clear modals on hide
$('#signupModal').on('hidden.bs.modal', function () {
  document.querySelector('#signup-firstname').value = ''
  document.querySelector('#signup-lastname').value = ''
  document.querySelector('#signup-email').value = ''
  document.querySelector('#signup-password').value = ''
  signupMessagebox.innerHTML = ''
})

$('#loginModal').on('hidden.bs.modal', function () {
  document.querySelector('#login-email').value = ''
  document.querySelector('#login-password').value = ''
  loginMessagebox.innerHTML = ''
})