import React from 'react'
import { NavLink } from 'react-router-dom'

function AccountHead() {
  return (
    <>
    <div style={{width:"1600px"}}>
    <nav className='nav'>
      <div style={{textAlign:"center", fontSize:"10px"}}>
        <NavLink className="nav-link active"  to="/apporve_application">All Apporve Application</NavLink>
        <NavLink className="nav-link active" to="/check_details">Check Applicient Details</NavLink>
        <NavLink className="nav-link active" to="/gst_calculate">Calculate GST</NavLink>
        <NavLink className="nav-link active" to="/disburs_ammount">Check Disbursed Amount</NavLink>
        <NavLink className="nav-link active" to="/disbursed_amount_customer">Loan Disbursed</NavLink>
        <NavLink className="nav-link active" to="/logout">logout</NavLink>
      </div>
  </nav>
  </div>
    </>
  )
}

export default AccountHead