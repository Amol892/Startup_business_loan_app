import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function OperationalOfficer() {

  const nav = useNavigate();
  useEffect(()=>{
    //nav("/all_pending_application");
  },[])
  return (
    <>
    <div style={{width:"1520px", color:"white"}}>
    
    <nav className='nav' style={{backgroundColor:"black"}}>

    
      <div style={{textAlign:"center",marginLeft:"300px", fontSize:"10px"}}>
        <NavLink className="nav-link active" style={{color:"white"}} to="/all_pending_application">All Pending Application</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/application_status">Application Status</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="application_document_details">Application Document Details</NavLink>
        <NavLink className="nav-link active" style={{color:"white", marginLeft:"280px"}} to="/logout">Logout</NavLink>
      </div>
    
  </nav>
  </div>
    </>
  )
}

export default OperationalOfficer