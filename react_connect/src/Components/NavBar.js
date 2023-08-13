import React from 'react'
import {NavLink} from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
function NavBar() {
  return (
    <>
    <h1 style={{color:"rebeccapurple", textAlign:"center"}}><b><i>MH-27 LOAN PVT LTD</i></b></h1>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid" style={{backgroundColor:"aqua"}}>
    <NavLink className="navbar-brand" to="#" style={{color:"revert-layer"}}>MH27</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink className="nav-link active" to="/home"><b>Home</b></NavLink>
        <NavLink className="nav-link active" to="#"><b>About</b></NavLink>
        <NavLink className="nav-link active" to="#"><b>Sign Up</b></NavLink>
        <NavLink className="nav-link active" to="/login"><b>Login</b></NavLink>
        <NavLink className="nav-link active" to="/logout"><b>Logout</b></NavLink>
        <NavLink className="nav-link active" to="#"><b>Enquiry</b></NavLink>
        <NavLink className="nav-link active" to="/application"><b>Loan Application</b></NavLink>
        <NavLink className="nav-link active" to="/user_signup"><b>User Signup</b></NavLink>
        <NavLink className="nav-link active" to="/application_status"><b>Status</b></NavLink>
        <NavLink className="nav-link active" to="/application_email"><b>application regarding mail</b></NavLink>
        <NavLink className="nav-link active" to="/application_document_details"><b>Application Document Deatils</b></NavLink>
        
      </div>
    </div>
  </div>
</nav>

    </>
  )
}

export default NavBar