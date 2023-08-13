import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserSignup from "./UserSignup";

function Application() {

    /*const [User, setUser] = useState("")
    async function getUser(user){
        if (access_token){
            const userdata = await axios.get("http://127.0.0.1:8000/application/",{
                headers:{Authorization: "Bearer"+" "+access_token}    
            })
            console.log(userdata.data)
            setValue("user",userdata.data.user)
            setUser(userdata.data)
            }else{
                nav("/login")
            }
    }*/
    const {register, handleSubmit, setValue} = useForm();
    const nav = useNavigate();
    /*const access_token = JSON.parse(localStorage.getItem("item"));
    

    async function saveData(data){
        if (access_token){
        await axios.post("http://127.0.0.1:8000/application/",data,{
            headers:{Authorization: "Bearer"+" "+access_token}
            
        })
        nav("/guarantor")
        }else{
            nav("/login")
        }
    };

    useEffect(()=>{
        //getUser();
        const token = access_token;
        if (!token){
            nav("/login")
        }
    },[])*/
    const [application, setApplication] = useState({})    
    async function saveData(data){
        const result = await axios.post("http://127.0.0.1:8000/application/",data)
        setApplication(result.data)
        sessionStorage.setItem("application_id",result.data.id)
        nav("/guarantor")
    }
    useEffect(()=>{
        const response = sessionStorage.getItem('id')
        setValue("user", response)
        //console.log(response)
    },[])


  return (
    <>
    
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Application</h1>
    <label htmlFor='user'>Application Id</label>
    <input id="user" type='text' className='form-control' readOnly={true} {...register("user")} />
    <br/><br/>
    <label htmlFor='aadhar_no'>Adhar Number</label>
    <input id="aadhar_no" type='text' className='form-control' {...register("aaddar_no")} />
    <br/><br/>
    <label htmlFor='pan_no'>PAN Number</label>
    <input id="pan_no" type='text' className='form-control' {...register("pan_no")}/>
    <br/><br/>
    <label htmlFor='type_of_employmenet'>Employement Type</label>&nbsp;&nbsp;
    <select id="type_of_employmenet" {...register("type_of_employment")}>
        <option value=""></option>
        <option value="Salaried">Salaried</option>
        <option value="Self-Employed">Selfemployed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='business_title'>Business Tile</label>
    <input id='business_title' type='text' className='form-control' {...register("business_title")}/>
    <br/><br/>
    <label htmlFor='business-type'>Business Type</label>&nbsp;&nbsp;
    <select id="business_type" {...register("business_type")}>
        <option value=""></option>
        <option value="Service">Service</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Treders">Treders</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='business_address'>Business Address</label>
    <input id='business_address' type='text' className='form-control' {...register("business_address")} />
    <br/><br/>
    <label htmlFor='gst_registration_no'>GST Registration Number</label>
    <input id="gst_registration_no" type='text' className='form-control' {...register("gst_registration_no")}/>
    <br/><br/>
    <label htmlFor='business_license_no'>Business Licence Number</label>
    <input id='business_license_no' type='text' className='form-control' {...register("business_license_no")}/>
    <br/><br/>
    <label htmlFor='expected_average_annual_turnover'>Annual Turnover</label>
    <input id='expected_average_annual_turnover' type='text' className='form-control' {...register("expected_average_annual_turnover")} />
    <br/><br/>
    <label htmlFor='years_in_current_business'>How Many Years You are In Business ?</label>
    <input id='years_in_current_business' type='text' className='form-control' {...register("years_in_current_business")} />
    <br/><br/>
    <label htmlFor='collateral'>Collateral</label>
    <input id='collateral' type='text' className='form-control' {...register("collateral")} />
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
    <label htmlFor='timestamp'>Application Timestamp</label>
    <input id='timestamp' type='datetime-local' className='form-control' {...register("application_timestamp")}/>
    <br/><br/>
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' {...register("remark")}/>
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

export default Application