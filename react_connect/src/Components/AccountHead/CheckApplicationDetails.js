import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

function CheckApplicationDetails() {

    const {register, handleSubmit, setValue} =useForm()
    
   

    const [user, setUser] = useState({})

    async function getData(){

        const get_id = sessionStorage.getItem("id")
        console.log(get_id)

        const resp = await axios.get(`http://127.0.0.1:8000/application_details/${get_id}/`);        
        console.log(resp.data)
        console.log(resp.data.user)
        setValue("user",resp.data.user);setValue("aaddar_no",resp.data.aaddar_no);setValue("pan_no",resp.data.pan_no);
        setValue("business_title",resp.data.business_title);setValue("type_of_employment",resp.data.type_of_employment);
        setValue("business_type",resp.data.business_type);setValue("business_address",resp.data.business_address);setValue("gst_registration_no",resp.data.gst_registration_no);
        setValue("business_license_no",resp.data.business_license_no);setValue("expected_average_annual_turnover",resp.data.expected_average_annual_turnover);setValue("years_in_current_business",resp.data.years_in_current_business);
        setValue("collateral",resp.data.collateral);setValue("status",resp.data.status);setValue("application_timestamp",resp.data.application_timestamp);setValue("remark",resp.data.remark);
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"1500px"}}>
    <br/><br/>
    <div className='container' style={{color:"white", width:"800px"}}>
    <form>
    <h1 style={{color:"white", textAlign:"center"}}>Application Details</h1>
    <label htmlFor='user'>User Id</label>
    <input id="user" type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("user")} />
    <br/><br/>
    <label htmlFor='aadhar_no'>Adhar Number</label>
    <input id="aadhar_no" type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("aaddar_no")} />
    <br/><br/>
    <label htmlFor='pan_no'>PAN Number</label>
    <input id="pan_no" type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("pan_no")}/>
    <br/><br/>
    <label htmlFor='type_of_employmenet'>Employement Type</label>&nbsp;&nbsp;
    <select id="type_of_employmenet" readOnly={true} style={{height:"30px", width:"300px"}} {...register("type_of_employment")}>
        <option value=""></option>
        <option value="Salaried">Salaried</option>
        <option value="Self-Employed">Selfemployed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='business_title'>Business Tile</label>
    <input id='business_title' type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("business_title")}/>
    <br/><br/>
    <label htmlFor='business-type'>Business Type</label>&nbsp;&nbsp;
    <select id="business_type" readOnly={true} style={{height:"30px", width:"300px"}} {...register("business_type")}>
        <option value=""></option>
        <option value="Service">Service</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Treders">Treders</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='business_address'>Business Address</label>
    <input id='business_address' type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("business_address")} />
    <br/><br/>
    <label htmlFor='gst_registration_no'>GST Registration Number</label>
    <input id="gst_registration_no" type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("gst_registration_no")}/>
    <br/><br/>
    <label htmlFor='business_license_no'>Business Licence Number</label>
    <input id='business_license_no' type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("business_license_no")}/>
    <br/><br/>
    <label htmlFor='expected_average_annual_turnover'>Annual Turnover</label>
    <input id='expected_average_annual_turnover' type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("expected_average_annual_turnover")} />
    <br/><br/>
    <label htmlFor='years_in_current_business'>How Many Years You are In Business ?</label>
    <input id='years_in_current_business' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("years_in_current_business")} />
    <br/><br/>
    <label htmlFor='collateral'>Collateral</label>
    <input id='collateral' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("collateral")} />
    <br/><br/>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" readOnly={true} style={{height:"30px", width:"300px"}} {...register("status")}>
        <option value=""></option>
        <option value="Pending">Pending</option>
        <option value="Apporve">Apporve</option>
        <option value="Rejected">Rejected</option>
        <option value="Disbursed">Disbursed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("remark")}/>
    <br/><br/>
    </form>
    </div>
    </div>
    </>
  )
}

export default CheckApplicationDetails