import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function AccountHead() {
  const nav  = useNavigate();

  useEffect(()=>{
    //nav("/apporve_application")
  },[])
  return (
    <>
    <div style={{width:"1520px", color:"white"}}>
      <nav className='nav' style={{backgroundColor:"black"}}>
        <div style={{textAlign:"center", fontSize:"10px", marginLeft:"50px"}}>
    
        <NavLink className="nav-link active" style={{color:"white"}} to="/apporve_application">All Apporve Application</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/check_details">Check Applicient Details</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/gst_calculate">Calculate GST</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/disburs_ammount">Check Disbursed Amount</NavLink>
        <NavLink className="nav-link active" style={{color:"white"}} to="/disbursed_amount_customer">Loan Disbursed</NavLink>
        <NavLink className="nav-link active" style={{marginLeft:"100px", color:"white"}} to="/logout">logout</NavLink>
      </div>
  </nav>
  </div>
    </>
  )
}

export default AccountHead