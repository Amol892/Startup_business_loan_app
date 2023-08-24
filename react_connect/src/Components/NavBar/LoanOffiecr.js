import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function LoanOffiecr() {
  const nav = useNavigate();
  useEffect(()=>{
    //nav("/all_verify_application")
  },[])
  return (
    <>
    <div style={{width:"1520px", color:"white"}}>
    <nav className='nav' style={{backgroundColor:"black"}}>
      <div style={{textAlign:"center",marginLeft:"300px", fontSize:"10px"}}>
      <NavLink className="nav-link active" style={{color:"white"}} to="/all_verify_application">All Verify Application</NavLink>
      <NavLink className="nav-link active" style={{ color:"white"}} to="/application_document_details">Application Document Details</NavLink>
      <NavLink className="nav-link active" style={{color:"white"}} to="/loan_details_application">Loan details Application</NavLink>
      <NavLink className="nav-link active" style={{marginLeft:"200px", color:"white"}} to="/logout">Logout</NavLink>
      </div>
  </nav>
  </div>
  </>
  )
}

export default LoanOffiecr