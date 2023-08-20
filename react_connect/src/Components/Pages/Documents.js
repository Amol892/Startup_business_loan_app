import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from 'axios';

function Documents() {
    const {register, handleSubmit,formState:{errors}, setValue} = useForm();
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
    
    }
    useEffect(()=>{
      const response = sessionStorage.getItem('application_id')
      setValue("application", response) 
    },[])
  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Upload Documents</h1>

    <div>
    <label htmlFor='application'>Application Id</label>
    <input id="application" type='text' className='form-control'  {...register("application",{required:{
                    value:true,
                    message:"This Field is required"
                },
                min:{
                  value:1,
                  message:"Application Id Could not less than zero please Correct proper email id Gives In your email"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.application && errors.application.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='aadhar_card'>Aadhar Card</label>
    <input id='aadhar_card' type='file' accept='file/pdf' className='form-control' {...register("aadhar_card",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.aadhar_card && errors.aadhar_card.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='pan_card'>PAN Card</label>
    <input id='pan_card' type='file' accept='file/pdf' className='form-control' {...register("pan_card",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.pan_card && errors.pan_card.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='aggrement'>Business Address Proof or Copy of Rent Aggrement</label>
    <input id='aggrement' type='file' accept='file/pdf' className='form-control' {...register("business_address_proff_or_copy_of_rent_agreement",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.business_address_proff_or_copy_of_rent_agreement && errors.business_address_proff_or_copy_of_rent_agreement.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='electricity_bill'>Electrity Bill</label>
    <input id='electricity_bill' type='file' accept='file/pdf' className='form-control' {...register("electricity_bill",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.electricity_bill && errors.electricity_bill.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='msme_certificate'>MSME Certificate</label>
    <input id='msme_certificate' type='file' accept='file/pdf'className='form-control' {...register("msme_certificate",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.msme_certificate && errors.msme_certificate.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='gst_cerificate'>GST Certficate</label>
    <input id='gst_cerificate' type='file' accept='file/pdf' className='form-control' {...register("gst_cerificate",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.gst_cerificate && errors.gst_cerificate.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='udhyog_adhar_registration'>Udhyog Aadhar</label>
    <input id='udhyog_adhar_registration' type='file' accept='file/pdf' className='form-control' {...register("udhyog_adhar_registration",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.udhyog_adhar_registration && errors.udhyog_adhar_registration.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='business_lincense'>Business Lincense</label>
    <input id='business_lincense' type='file' accept='file/pdf' className='form-control' {...register("business_lincense",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.business_lincense && errors.business_lincense.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='business_plan_or_proposal'>Business Plan or Proposal</label>
    <input id='business_plan_or_proposal' type='file' accept='file/pdf' className='form-control' {...register("business_plan_or_proposal",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.business_plan_or_proposal && errors.business_plan_or_proposal.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='balance_sheet'>Three Year ITR with Balance Sheet</label>
    <input id='balance_sheet' type='file' accept='file/pdf' className='form-control' {...register("three_year_itr_with_balance_sheet",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.three_year_itr_with_balance_sheet && errors.three_year_itr_with_balance_sheet.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='collateral_document'>Collateral Document</label>
    <input id='collateral_document' type='file' accept='file/pdf' className='form-control' {...register("collateral_document",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.collateral_document && errors.collateral_document.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='stamp_duty'>Stamp Duty</label>
    <input id='stamp_duty' type='file' accept='file/pdf' className='form-control' {...register("stamp_duty",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.stamp_duty && errors.stamp_duty.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" style={{width:"300px", textAlign:"center"}} {...register("status",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}>
                <p style={{color:"red"}}>
                    { errors.passbook_copy && errors.passbook_copy.message }
                </p>
        <option value="Pending">Pending</option>
        <p style={{color:"red"}}>
                    { errors.status && errors.status.message }
                </p>
    </select>
    <br/><br/><br/>
    </div>

    <div>
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' {...register("remark",{required:{
                    value:true,
                    message:"This Field is required"
                },
                minLength:{
                  value:5,
                  message:"Please Give remarks at least 5 character"
                },
                maxLength:{
                  value:50,
                  message:"Remark can not above 50 character"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.remark && errors.remark.message }
                </p>

    <br/><br/>
    </div>

    <center>
    <div>
    <input type='reset' value="Clear" className='btn btn-warning col-5'/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Submit Application" className='btn btn-success col-5'/>
    </div>
    </center>

    </form>
    </div>
    </>
  )
}

export default Documents