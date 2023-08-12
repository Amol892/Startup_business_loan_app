import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';

function Documents() {
    const {register, handleSubmit} = useForm();
    const nav = useNavigate();

    async function saveData(data){
        await axios.post("http://127.0.0.1:8000/document/",data)
    }
  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Upload Documents</h1>
    <label htmlFor='aadhar_card'>Aadhar Card</label>
    <input id='aadhar_card' type='file' className='form-control' {...register("aadhar_card")} />
    <br/><br/>
    <label htmlFor='pan_card'>PAN Card</label>
    <input id='pan_card' type='file' className='form-control' {...register("pan_card")} />
    <br/><br/>
    <label htmlFor='aggrement'>Business Address Proof or Copy of Rent Aggrement</label>
    <input id='aggrement' type='file' className='form-control' {...register("business_address_proff_or_copy_of_rent_agreement")} />
    <br/><br/>
    <label htmlFor='electricity_bill'>Electrity Bill</label>
    <input id='electricity_bill' type='file' className='form-control' {...register("electricity_bill")} />
    <br/><br/>
    <label htmlFor='msme_certificate'>MSME Certificate</label>
    <input id='msme_certificate' type='file' className='form-control' {...register("msme_certificate")} />
    <br/><br/>
    <label htmlFor='gst_cerificate'>GST Certficate</label>
    <input id='gst_cerificate' type='file' className='form-control' {...register("gst_cerificate")} />
    <br/><br/>
    <label htmlFor='udhyog_adhar_registration'>Udhyog Aadhar</label>
    <input id='udhyog_adhar_registration' type='file' className='form-control' {...register("udhyog_adhar_registration")} />
    <br/><br/>
    <label htmlFor='business_lincense'>Business Lincense</label>
    <input id='business_lincense' type='file' className='form-control' {...register("business_lincense")} />
    <br/><br/>
    <label htmlFor='business_plan_or_proposal'>Business Plan or Proposal</label>
    <input id='business_plan_or_proposal' type='file' className='form-control' {...register("business_plan_or_proposal")} />
    <br/><br/>
    <label htmlFor='balance_sheet'>Three Year ITR with Balance Sheet</label>
    <input id='balance_sheet' type='file' className='form-control' {...register("three_year_itr_with_balance_sheet")} />
    <br/><br/>
    <label htmlFor='collateral_document'>Collateral Document</label>
    <input id='collateral_document' type='file' className='form-control' {...register("collateral_document")} />
    <br/><br/>
    <label htmlFor='stamp_duty'>Stamp Duty</label>
    <input id='stamp_duty' type='file' className='form-control' {...register("stamp_duty")} />
    <br/><br/>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" {...register("status")}>
        <option value=""></option>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
        <option value="rejected">Rejected</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' {...register("remark")} />
    <br/><br/>
    <center>
    <input type='reset' value="Clear" className='btn btn-warning col-5'/>&nbsp;&nbsp;&nbsp;
    <NavLink to="/guarantor"><button type='subtmit' className='btn btn-success col-5'>Save and Submit</button></NavLink>    
    
    </center>
    </form>
    </div>
    </>
  )
}

export default Documents