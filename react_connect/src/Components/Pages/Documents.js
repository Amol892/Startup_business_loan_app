import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';

function Documents() {
    const {register, handleSubmit, setValue} = useForm();
    const nav = useNavigate();

    const [document, setDocument] = useState({});

    async function saveData(data){
  
      data.aadhar_card = data.aadhar_card[0]; data.pan_card = data.pan_card[0]; data.business_address_proff_or_copy_of_rent_agreement = data.business_address_proff_or_copy_of_rent_agreement[0]; data.electricity_bill = data.electricity_bill[0]
      data.msme_certificate = data.msme_certificate[0]; data.gst_cerificate = data.gst_cerificate[0]; data.udhyog_adhar_registration = data.udhyog_adhar_registration[0]; data.business_lincense = data.business_lincense[0]
      data.business_plan_or_proposal = data.business_plan_or_proposal[0]; data.three_year_itr_with_balance_sheet = data.three_year_itr_with_balance_sheet[0]; data.collateral_document = data.collateral_document[0]; data.stamp_duty = data.stamp_duty[0]
      const response = await axios.post("http://127.0.0.1:8000/document/",data,{
        headers:{"Content-Type":"multipart/form-data"}
      })
      console.log(response.data)
      setDocument(response.data)
    sessionStorage.setItem("doucument_id",response.data.id)
    nav("/login")
    }
    useEffect(()=>{
      const response = sessionStorage.getItem('application_id')
      setValue("application", response) 
    })
  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Upload Documents</h1>
    <label htmlFor='application'>Application Id</label>
    <input id="application" type='text' className='form-control' readOnly={true} {...register("application")} />
    <br/><br/>
    <label htmlFor='aadhar_card'>Aadhar Card</label>
    <input id='aadhar_card' type='file' accept='file/pdf' className='form-control' {...register("aadhar_card")} />
    <br/><br/>
    <label htmlFor='pan_card'>PAN Card</label>
    <input id='pan_card' type='file' accept='file/pdf' className='form-control' {...register("pan_card")} />
    <br/><br/>
    <label htmlFor='aggrement'>Business Address Proof or Copy of Rent Aggrement</label>
    <input id='aggrement' type='file' accept='file/pdf' className='form-control' {...register("business_address_proff_or_copy_of_rent_agreement")} />
    <br/><br/>
    <label htmlFor='electricity_bill'>Electrity Bill</label>
    <input id='electricity_bill' type='file' accept='file/pdf' className='form-control' {...register("electricity_bill")} />
    <br/><br/>
    <label htmlFor='msme_certificate'>MSME Certificate</label>
    <input id='msme_certificate' type='file' accept='file/pdf'className='form-control' {...register("msme_certificate")} />
    <br/><br/>
    <label htmlFor='gst_cerificate'>GST Certficate</label>
    <input id='gst_cerificate' type='file' accept='file/pdf' className='form-control' {...register("gst_cerificate")} />
    <br/><br/>
    <label htmlFor='udhyog_adhar_registration'>Udhyog Aadhar</label>
    <input id='udhyog_adhar_registration' type='file' accept='file/pdf' className='form-control' {...register("udhyog_adhar_registration")} />
    <br/><br/>
    <label htmlFor='business_lincense'>Business Lincense</label>
    <input id='business_lincense' type='file' accept='file/pdf' className='form-control' {...register("business_lincense")} />
    <br/><br/>
    <label htmlFor='business_plan_or_proposal'>Business Plan or Proposal</label>
    <input id='business_plan_or_proposal' type='file' accept='file/pdf' className='form-control' {...register("business_plan_or_proposal")} />
    <br/><br/>
    <label htmlFor='balance_sheet'>Three Year ITR with Balance Sheet</label>
    <input id='balance_sheet' type='file' accept='file/pdf' className='form-control' {...register("three_year_itr_with_balance_sheet")} />
    <br/><br/>
    <label htmlFor='collateral_document'>Collateral Document</label>
    <input id='collateral_document' type='file' accept='file/pdf' className='form-control' {...register("collateral_document")} />
    <br/><br/>
    <label htmlFor='stamp_duty'>Stamp Duty</label>
    <input id='stamp_duty' type='file' accept='file/pdf' className='form-control' {...register("stamp_duty")} />
    <br/><br/>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" {...register("status")}>
        <option value=""></option>
        <option value="Pending">Pending</option>
        <option value="Apporve">Apporve</option>
        <option value="Rejected">Rejected</option>
        <option value="Disbursed">Disbursed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' {...register("remark")} />
    <br/><br/>
    <center>
    <input type='reset' value="Clear" className='btn btn-warning col-5'/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Submit Application" className='btn btn-success col-5'/>
    
    </center>
    </form>
    </div>
    </>
  )
}

export default Documents