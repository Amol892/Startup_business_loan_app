import React from 'react'
import { NavLink } from 'react-router-dom'


function OpHeadDashboard() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
    <NavLink className="navbar-brand" to="#">Dashboard</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/Application">Applications</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div ClassName='container-fluid'>
  Welcome to Document Verification
</div>
</>
  )
}

export default OpHeadDashboard