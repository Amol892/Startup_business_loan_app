import React from 'react'
import { NavLink } from 'react-router-dom'
import grow from './TechGrow.jpg'

function LSONavbar() {
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
                 <NavLink style={{marginLeft:150}} className="nav-link active" aria-current="page" to="/"><b>Home</b></NavLink>
                 <NavLink style={{marginLeft:80}} className="nav-link active" to="/about"><b>About</b></NavLink>
                 <NavLink style={{marginLeft:80}} className="nav-link active" to="/lsoDashboard"><b>Dashboard</b></NavLink>
                
                 <NavLink style={{marginLeft:700}} className="nav-link active" to="#"><b>LSOProfile</b></NavLink>
                 <NavLink style={{marginLeft:80}} className="nav-link active" to="/logout"><b>Logout</b></NavLink>
 
             </div>
             </div>
         </div>
         </nav>
    </>
  )
}

export default LSONavbar