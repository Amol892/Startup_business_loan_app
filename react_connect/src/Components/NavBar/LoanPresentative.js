import React, { useEffect } from 'react'
import "./css/loanrepresentative.css"
import { NavLink, useNavigate} from 'react-router-dom'

function LoanPresentative() {
  const nav = useNavigate();

  useEffect(()=>{
    //nav("/user_signup")
  },[])
  return (
    <>

    <div style={{width:"1520px", color:"white"}}>
      <nav className='nav' style={{backgroundColor:"black"}}>
        <div style={{textAlign:"center", fontSize:"10px"}}>
          
        
        <NavLink className="nav-link active" style={{color:"white"}} to="/user_signup">Apply</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/application_status">Application Status</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/application_document_details">Application Document Details</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/check_cibil">CIBIL Check</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/application_email">Application Regarding Mail</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/vendor_application">Vendor Application</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/logout">Logout</NavLink>
  
        </div>
    </nav>
    </div>
  
    </>
  )
}

export default LoanPresentative