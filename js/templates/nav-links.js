class NavLinks {
  static guest() {
    return `
      <li class="nav-item">
        <a class="nav-link" data-toggle="modal" data-target="#signupModal">Signup</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="modal" data-target="#loginModal">Login</a>
      </li>
    `
  }
  static user(user) {
    return `
      <li class="nav-item">
        <a id="nav-logout" class="nav-link">Logout ${user.first_name}</a>
      </li>
    `
  }
  static admin(user) {
    return `
      <li class="nav-item">
        <a class="nav-link" href="admin.html">Admin</a>
      </li>
      <li class="nav-item">
        <a id="nav-logout" class="nav-link">Logout ${user.first_name}</a>
      </li>
    `
  }
}
