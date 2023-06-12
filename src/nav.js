import React from 'react'


export default function Nav() {
  return (
    <header>
    <nav>
      <div className="logo">
        <img src="Bitter.png" alt="Logo" />
      </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/rate">Profile</a></li>
      </ul>
    </nav>
  </header>  )
}

{/* <li>
  <Dropdown>
    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
      Login
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item href="#">Rate Movies</Dropdown.Item>
      <Dropdown.Item href="#">Rate Restaurants</Dropdown.Item>
    </Dropdown.Menu>

  </Dropdown>
</li> */}