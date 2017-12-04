// Connect to Heroku server
// window.baseURL = 'https:// ???? .herokuapp.com'
// Connect to local server
window.baseURL = 'http://localhost:3000/api'

window.navBar = document.querySelector('.navbar')
window.snacksUser = null

// Check for and get currently logged in user
window.snacksUserToken = localStorage.getItem('snacksUserToken')
// If user not logged in, redirect to main page
if (!snacksUserToken && window.location.pathname !== '/index.html') window.location='index.html'
// If user is logged in, get their user data
if (snacksUserToken) {
  axios.get(`${baseURL}/users/fromToken`, { headers: { authorization: `Bearer ${snacksUserToken}` } })
  .then(result => { snacksUser = result.data.response } )
}


// Set navbar based on user state





function logout() {
  localStorage.removeItem('snacksUserToken')
  snacksUserToken = null
  window.location='index.html'
}

