import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import {useParams,NavLink, useNavigate} from 'react-router-dom';


function Documents() {

  const navigate=useNavigate()
  const {userId}=useParams()
  const [user,setuser]=useState([])


  const baseurl="http://127.0.0.1:8000"


  async function fetchData(){

    const result = await axios.get(`http://localhost:8000/document_verification/documents/${userId}/`)
    setuser(result.data)
    
  
  }

function approvedocuments(data){
  console.log(data)
  data={'s1':data}

  axios.post(`http://localhost:8000/document_verification/documents/${userId}/`,data)
  
  navigate('/Applications')

}


useEffect(()=>{fetchData()},[])


  return (<>
    <div>
      <center><div style={{color:'green'}}><center><h2>Applicants Documents</h2></center></div></center>
    
      <center><h2><NavLink to={baseurl+user.aadhar_card}><button type="button" class="btn btn-info col-10">Aadhar Card</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.pan_card}><button type="button" class="btn btn-info col-10">Pan Card</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.business_address_proff_or_copy_of_rent_agreement}><button type="button" class="btn btn-info col-10">Business Adress Proof</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.electricity_bill}><button type="button" class="btn btn-info col-10">Electricity Bill</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.msme_certificate}><button type="button" class="btn btn-info col-10">MSME Certificate</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.gst_cerificate}><button type="button" class="btn btn-info col-10">Electricity Bill</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.udhyog_adhar_registration}><button type="button" class="btn btn-info col-10">Udyog Adhar Registration</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.business_lincense}><button className='btn btn-info col-10'>Business License</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.business_plan_or_proposal}><button type="button" class="btn btn-info col-10">Business Plan</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.three_year_itr_with_balance_sheet}><button type="button" class="btn btn-info col-10">Three year balance sheet</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.collateral_document}><button type="button" class="btn btn-info col-10">Collateral Documents</button></NavLink></h2></center>
                <center><h2><NavLink to={baseurl+user.stamp_duty}><button type="button" class="btn btn-info col-10">Stamp Duty</button></NavLink></h2></center>
                <center><h2><button type="button" class="btn btn-success col-5" value='approve' onClick={(e)=>{approvedocuments(e.target.value)}}>Approve</button><button type="button" class="btn btn-danger col-5"  value='rejected' onClick={(e)=>{approvedocuments(e.target.value)}}>Reject</button></h2></center>

    </div>
</>
  )
  

    }
export default Documents