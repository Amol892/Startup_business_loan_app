import React from 'react'
import {NavLink} from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function NavBar() {
  return (
    <>
    <h1 style={{color:"rebeccapurple", textAlign:"center"}}><b><i>MH-27 LOAN PVT LTD</i></b></h1>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid" style={{backgroundColor:"aqua"}}>
    <NavLink className="navbar-brand" to="#" style={{color:"revert-layer"}}>MH27</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink className="nav-link active" to="/login"><b>Login</b></NavLink>
        <NavLink className="nav-link active" to="/logout"><b>Logout</b></NavLink>
        <NavLink className="nav-link active" to="/application"><b>Loan Application</b></NavLink>
        <NavLink className="nav-link active" to="/user_signup"><b>User Signup</b></NavLink>
        <NavLink className="nav-link active" to="/application_status"><b>Status</b></NavLink>
        <NavLink className="nav-link active" to="/application_email"><b>application regarding mail</b></NavLink>
        <NavLink className="nav-link active" to="/application_document_details"><b>Application Document Deatils</b></NavLink>
        <NavLink className="nav-link active" to="/apporve_application"><b>All Apporve Application</b></NavLink>
        <NavLink className="nav-link active" to="/gst_calculate"><b>Calculate GST</b></NavLink>
        <NavLink className="nav-link active" to="/disburs_ammount"><b>Check Disbursed Amount</b></NavLink>
        <NavLink className="nav-link active" to="/check_details"><b>Check Applicient Details</b></NavLink>
        <NavLink className="nav-link active" to="/disbursed_amount_customer"><b>Disbursed Amount</b></NavLink>
        <NavLink className="nav-link active" to="/vendor_application"><b>Vendor Application</b></NavLink>
        <NavLink className="nav-link active" to="https://creditreport.paisabazaar.com/credit-report/apply?utm_source=Admitad&utm_medium=emailer_new&utm_term=2085116__&admitad_uid=bf34b9df8f8665d1521c168eadc619af&utm_campaign=credit_score_cpm_2085116__"><b>Check CIBIL</b></NavLink>
        <NavLink className="nav-link active" to="/loan_details_application"><b>Loan Deatils Application</b></NavLink>
        <NavLink className="nav-link active" to="/installment"><b>Installment Application</b></NavLink>
        <NavLink className="nav-link active" to="/defaulter"><b>Add Defaulter</b></NavLink>
      </div>
    </div>
  </div>
</nav>

    </>
  )
}

export default NavBar