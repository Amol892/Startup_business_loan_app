import React from 'react'
import { NavLink } from 'react-router-dom'

function OperationalOfficer() {
  return (
    <>
    <div style={{width:"1600px"}} >
    <nav className='nav'>
      <div style={{textAlign:"center", fontSize:"10px"}}>
        <NavLink className="nav-link active"  to="/all_pending_application">All Pending Application</NavLink>
        <NavLink className="nav-link active" to="/application_status">Application Status</NavLink>
        <NavLink className="nav-link active" to="application_document_details">Application Document Details</NavLink>
        <NavLink className="nav-link active" to="/logout">Logout</NavLink>
        
      </div>
  </nav>
  </div>
    </>
  )
}

export default OperationalOfficer