import React from 'react'
import { NavLink } from 'react-router-dom'

function LoanOffiecr() {
  return (
    <>
    <div  style={{width:"1600px"}}>
    <nav className='nav'>
      <div style={{textAlign:"center", fontSize:"10px"}}>
      <NavLink className="nav-link active"  to="/all_verify_application">All Verify Application</NavLink>
      <NavLink className="nav-link active" to="/application_document_details">Application Document Details</NavLink>
      <NavLink className="nav-link active" to="/loan_details_application">Loan details Application</NavLink>
      <NavLink className="nav-link active" to="/logout">Logout</NavLink>
      </div>
  </nav>
  </div>
  </>
  )
}

export default LoanOffiecr