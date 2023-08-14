import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

function ViewApplication() {
    const {register, handleSubmit, setValue} =useForm()
    const {id} = useParams();
    const nav = useNavigate();

    const [user, setUser] = useState({})

    async function getData(){
        const resp = await axios.get(`http://127.0.0.1:8000/application_details/${id}/`);        
        console.log(resp.data)
        console.log(resp.data.user.email)
        setValue("user",resp.data.user.id);setValue("aaddar_no",resp.data.aaddar_no);setValue("pan_no",resp.data.pan_no);
        setValue("business_title",resp.data.business_title);setValue("type_of_employment",resp.data.type_of_employment);
        setValue("business_type",resp.data.business_type);setValue("business_address",resp.data.business_address);setValue("gst_registration_no",resp.data.gst_registration_no);
        setValue("business_license_no",resp.data.business_license_no);setValue("expected_average_annual_turnover",resp.data.expected_average_annual_turnover);setValue("years_in_current_business",resp.data.years_in_current_business);
        setValue("collateral",resp.data.collateral);setValue("status",resp.data.status);setValue("application_timestamp",resp.data.application_timestamp);setValue("remark",resp.data.remark);
    }

    async function UpdateStatus(data){
       const obj = await axios.patch(`http://127.0.0.1:8000/application_details/${id}/`,data)
        nav("/apporve_application")
        console.log(obj)

    }



    useEffect(()=>{
        getData();
    },[])
    //onSubmit={handleSubmit(getData)}

  return (
    <>
    
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(UpdateStatus)}>
    <h1 style={{color:"red", textAlign:"center"}}>Application</h1>
    <label htmlFor='user'>Application Id</label>
    <input id="user" type='text' className='form-control' readOnly={true} {...register("user")} />
    <br/><br/>
    <label htmlFor='aadhar_no'>Adhar Number</label>
    <input id="aadhar_no" type='text' className='form-control' readOnly={true} {...register("aaddar_no")} />
    <br/><br/>
    <label htmlFor='pan_no'>PAN Number</label>
    <input id="pan_no" type='text' className='form-control' readOnly={true} {...register("pan_no")}/>
    <br/><br/>
    <label htmlFor='type_of_employmenet'>Employement Type</label>&nbsp;&nbsp;
    <select id="type_of_employmenet" readOnly={true} {...register("type_of_employment")}>
        <option value=""></option>
        <option value="Salaried">Salaried</option>
        <option value="Self-Employed">Selfemployed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='business_title'>Business Tile</label>
    <input id='business_title' type='text' className='form-control' readOnly={true} {...register("business_title")}/>
    <br/><br/>
    <label htmlFor='business-type'>Business Type</label>&nbsp;&nbsp;
    <select id="business_type" readOnly={true} {...register("business_type")}>
        <option value=""></option>
        <option value="Service">Service</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Treders">Treders</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='business_address'>Business Address</label>
    <input id='business_address' type='text' className='form-control' readOnly={true} {...register("business_address")} />
    <br/><br/>
    <label htmlFor='gst_registration_no'>GST Registration Number</label>
    <input id="gst_registration_no" type='text' className='form-control' readOnly={true} {...register("gst_registration_no")}/>
    <br/><br/>
    <label htmlFor='business_license_no'>Business Licence Number</label>
    <input id='business_license_no' type='text' className='form-control' readOnly={true} {...register("business_license_no")}/>
    <br/><br/>
    <label htmlFor='expected_average_annual_turnover'>Annual Turnover</label>
    <input id='expected_average_annual_turnover' type='text' className='form-control' readOnly={true} {...register("expected_average_annual_turnover")} />
    <br/><br/>
    <label htmlFor='years_in_current_business'>How Many Years You are In Business ?</label>
    <input id='years_in_current_business' type='text' className='form-control' readOnly={true} {...register("years_in_current_business")} />
    <br/><br/>
    <label htmlFor='collateral'>Collateral</label>
    <input id='collateral' type='text' className='form-control'readOnly={true} {...register("collateral")} />
    <br/><br/>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status"  {...register("status")}>
        <option value=""></option>
        <option value="Pending">Pending</option>
        <option value="Apporve">Apporve</option>
        <option value="Rejected">Rejected</option>
        <option value="Disbursed">Disbursed</option>
    </select>
    <br/><br/><br/>
    
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' readOnly={true}  {...register("remark")}/>
    <br/><br/>
    <center>
    <input type='reset' value="Clear" className='btn btn-warning col-5'/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Save and Next" className='btn btn-success col-5'/>
    </center>
    </form>
    </div>
    </>
  )
}

export default ViewApplication