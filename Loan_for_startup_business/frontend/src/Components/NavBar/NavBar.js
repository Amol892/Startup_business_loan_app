import React from 'react'
import { NavLink } from 'react-router-dom'
import grow from './Logo2.png'

function NavBar() {
  return (
    <>    
          
         <nav className="navbar navbar-expand-lg navbar bg Navbar_element" style={{borderRadius:20}}>
         
        <div className="container-fluid">
           <img src={grow} alt='not found' width={120} height={100}></img>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink style={{marginLeft:0}} className="nav-link active" aria-current="page" to="/"><b>Home</b></NavLink>
                <NavLink style={{marginLeft:0}} className="nav-link active" to="/about"><b>About</b></NavLink>
                
                <NavLink style={{marginLeft:0}} className="nav-link active" to="/logout"><b>Logout</b></NavLink>
              
            
                <NavLink style={{marginLeft:0}} className="nav-link active" to="/enquiry"><b>Apply Loan</b></NavLink>
                <NavLink style={{marginLeft:0}} className="nav-link active" to="/loan_status"><b>Loan Status</b></NavLink>
                <NavLink style={{marginLeft:0}} className="nav-link active" to="/login"><b>Login</b></NavLink>
                <NavLink style={{marginLeft:0}}className="nav-link active" to="/signup"><b>SignUp</b></NavLink>
              

            </div>
            </div>
        </div>
        </nav>
        
    </>
  )
}

export default NavBar