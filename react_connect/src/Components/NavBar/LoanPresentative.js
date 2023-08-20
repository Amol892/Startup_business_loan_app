import React, { useEffect } from 'react'
import "./css/loanrepresentative.css"
import { NavLink} from 'react-router-dom'

function LoanPresentative() {

  useEffect(()=>{},[])
  return (
    <>

    <div style={{width:"1600px"}}>
      <nav className='nav'>
        <div style={{textAlign:"center", fontSize:"10px"}}>
          

        <NavLink className="nav-link active"  to="/user_signup">Apply</NavLink>
        <NavLink className="nav-link active" to="/application_status">Application Status</NavLink>
        <NavLink className="nav-link active" to="/application_document_details">Application Document Details</NavLink>
        <NavLink className="nav-link active" to="/check_cibil">CIBIL Check</NavLink>
        <NavLink className="nav-link active" to="/application_email">Application Regarding Mail</NavLink>
        <NavLink className="nav-link active" to="/vendor_application">Vendor Application</NavLink>
        <NavLink className="nav-link active" to="/logout">Logout</NavLink>
  
        </div>
    </nav>
    </div>
  
    </>
  )
}

export default LoanPresentative