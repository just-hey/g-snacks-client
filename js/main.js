// Connect to Heroku server
// window.baseURL = 'https:// ???? .herokuapp.com'
// Connect to local server
window.baseURL = 'http://localhost:3000/api'

window.navBar = document.querySelector('.navbar')
window.snacksUser = null
window.snacksUserToken = null

login()

// If user not logged in, redirect to main page???
// if (!snacksUserToken && window.location.pathname !== '/index.html') window.location='index.html'






// HELPER FUNCTIONS
function login() {
  // Check for currently logged in user
  snacksUserToken = localStorage.getItem('snacksUserToken')
  // If user is logged in, get their user data
  if (snacksUserToken) {
    axios.get(`${baseURL}/users/fromToken`, { headers: { authorization: `Bearer ${snacksUserToken}` } })
    .then(result => { 
      snacksUser = result.data.response 
      // Set navbar choices based on user state
      setNavChoices(snacksUser)
      // Set event listener for logout button
      document.querySelector('#nav-logout').addEventListener('click', logout)
    })
  }
  else setNavChoices(snacksUser)
}

function logout() {
  localStorage.removeItem('snacksUserToken')
  snacksUser = null
  snacksUserToken = null
  window.location='index.html'
}

function setNavChoices(user) {
  const navChoices = document.querySelector('#nav-choices')
  if (user) {
    if (user.role === 'user') {
      navChoices.innerHTML = NavLinks.user(user)
    }
    if (user.role === 'admin') {
      navChoices.innerHTML = NavLinks.admin(user)
    }
  }
  else {
    navChoices.innerHTML = NavLinks.guest()
  } 
}
