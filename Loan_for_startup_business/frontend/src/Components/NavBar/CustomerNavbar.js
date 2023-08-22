import React from 'react'
import { NavLink } from 'react-router-dom'
import grow from './TechGrow.jpg'

function CustomerNavbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar bg Navbar_element" style={{borderRadius:20,marginTop:30}}>
         
         <div className="container-fluid">
            <img src={grow} alt='not found' width={120} height={100}></img>
             
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
             <div className="navbar-nav">
                 <NavLink style={{marginLeft:150,borderRadius:10,padding:10,color:'white'}} className="nav-link active" aria-current="page" to="/"><b>Home</b></NavLink>
                 <NavLink style={{marginLeft:80,borderRadius:10,padding:10,color:'white'}} className="nav-link active" to="/about"><b>About</b></NavLink>
                 <NavLink style={{marginLeft:80,borderRadius:10,padding:10,color:'white'}} className="nav-link active" to="/customerDashboard"><b>Dashboard</b></NavLink>
                 
                 <NavLink style={{marginLeft:700,borderRadius:10,padding:10,color:'white'}} className="nav-link active" to="#"><b>CustProfile</b></NavLink>
                 <NavLink style={{marginLeft:80,borderRadius:10,padding:10,color:'white'}} className="nav-link active" to="/logout"><b>Logout</b></NavLink>
 
             </div>
             </div>
         </div>
         </nav>
    
    </>
  )
}

export default CustomerNavbar