let snackTab = document.querySelector('.snack-tab')
let userTab = document.querySelector('.user-tab')
let adminTable = document.querySelector('.admin-table')
let adminTableHeader = document.querySelector('.admin-table-header')

// CUSTOM PAGE UPDATER
function pageUpdate() { 
}

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
  loadAdminUsers(usersURL)
})
