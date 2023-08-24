import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserSignup from "./UserSignup";
import "./PagesCss/UserCss.css"

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
    const {register, handleSubmit,formState:{errors}, setValue, setError} = useForm();
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
        if (result.status === 400){
            const data = result.data
            for (let key in Object(data)){
                setError(key,data[key])
            }
        }
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
    
    
    <div style={{backgroundColor:"#3d3840"}}><br/>
    <div className='container' style={{width:"700px", color:"white"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"white", textAlign:"center"}}>APPLICATION</h1>

    <div>
    <label htmlFor='user'>Application Id</label>
    <input id="user" type='text' className='form-control' placeholder='Enter Application Id' readOnly={true} style={{height:"40px"}} {...register("user", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Appliaction Id not negative"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.user && errors.user.message }
                </p>
    </div>

    <br/>

    <div>
    <label htmlFor='aadhar_no'>Adhar Number</label>
    <input id="aadhar_no" type='text' className='form-control' placeholder='Enter addhar number here' style={{height:"40px"}} {...register("aaddar_no", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:12,
                    message:"Aadhar Number can not less than 12 digits"
                },
                maxLength:{
                    value:12,
                    message:"Aadhar Number can not greater than 12 digits"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.aaddar_no && errors.aaddar_no.message }
                </p>
    </div>

    <br/>

    <div>
    <label htmlFor='pan_no'>PAN Number</label>
    <input id="pan_no" type='text' className='form-control' placeholder='Enter pan card number here' style={{height:"40px"}} {...register("pan_no", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:10,
                    message:"Please Enter 10 character PAN Number"
                },
                maxLength:{
                    value:10,
                    message:"Please Enter 10 character PAN Number"
                },
                pattern:{
                    value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                    message:"Please Enter Valid Pan Number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.pan_no && errors.pan_no.message }
                </p>
    </div>

    <br/>

    <dv>
    <label htmlFor='type_of_employmenet'>Employement Type</label>&nbsp;&nbsp;
    <select id="type_of_employmenet" style={{width:"300px",height:"30px", textAlign:"center"}} {...register("type_of_employment",
    {
        required:{
            value: true,
             message: "This field is required"
        }
    })}>
        <option value="">Select</option>
        <option value="Salaried">Salaried</option>
        <option value="Self-Employed">Selfemployed</option>
    </select>
    <p style={{color:"red"}}>
        { errors.type_of_employment && errors.type_of_employment.message }
    </p>
    </dv>

    <br/>

    <div>
    <label htmlFor='business_title'>Business Tile</label>
    <input id='business_title' type='text' className='form-control' placeholder='Enter Business Name here' style={{height:"40px"}} {...register("business_title", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:5,
                    message:"Please Enter at least 5 chanracter"
                },
                maxLength:{
                    value:20,
                    message:"Please Enter do enter above 50 chanracter"
                }
    })}/>
    <p style={{color:"red"}}>
        { errors.business_title && errors.business_title.message }
    </p>
    </div>

    <br/>
    
    <div>
    <label htmlFor='business_type'>Business Type</label>&nbsp;&nbsp;
    <select id="business_type" style={{width:"300px", height:"30px", textAlign:"center"}} {...register("business_type",
    {
        required:{
            value: true,
             message: "This field is required"
        }
    })}>
        <option value="">Select</option>
        <option value="Service">Service</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Treders">Treders</option>
    </select>
    <p style={{color:"red"}}>
        { errors.business_type && errors.business_type.message }
    </p>
    </div>
    
    <br/>
    
    <div>
    <label htmlFor='business_address'>Business Address</label>
    <input id='business_address' type='text' className='form-control' placeholder='Enter business location' style={{height:"40px"}} {...register("business_address", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:5,
                    message:"Please Enter at least 5 chanracter"
                },
                maxLength:{
                    value:100,
                    message:"Please Enter do enter above 100 chanracter"
                }
    })} />
    <p style={{color:"red"}}>
        { errors.business_address && errors.business_address.message }
    </p>
    </div>

    <br/>
    
    <div>
    <label htmlFor='gst_registration_no'>GST Registration Number</label>
    <input id="gst_registration_no" type='text' className='form-control' placeholder='Enter GST reg. number here' style={{height:"40px"}} {...register("gst_registration_no", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:15,
                    message:"Please Enter 15 chanracter GST Registration Number"
                },
                maxLength:{
                    value:15,
                    message:"Please Enter do enter above 15 chanracter"
                },
                pattern:{
                    value:/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message:"Please Enter Valid Gst Registration Number"
                }
    })}/>
    </div>
    <p style={{color:"red"}}>
        { errors.gst_registration_no && errors.gst_registration_no.message }
    </p>
    <br/>
    
    <div>
    <label htmlFor='business_license_no'>Business Licence Number</label>
    <input id='business_license_no' type='text' className='form-control' placeholder='Enter business licence number here' style={{height:"40px"}} {...register("business_license_no", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:16,
                    message:"Please Enter 16 chanracter"
                },
                maxLength:{
                    value:16,
                    message:"Please Enter do enter above 16 chanracter"
                }
    })}/>
    <p style={{color:"red"}}>
        { errors.business_license_no && errors.business_license_no.message }
    </p>
    </div>
    
    <br/>

    <div>
    <label htmlFor='expected_average_annual_turnover'>Annual Turnover</label>
    <input id='expected_average_annual_turnover' type='text' placeholder='Enter your annual turnover' className='form-control' style={{height:"40px"}} {...register("expected_average_annual_turnover", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:0,
                    message:"Annual Turnover cannot be less than zero"
                }
                })} />
    <p style={{color:"red"}}>
        { errors.expected_average_annual_turnover && errors.expected_average_annual_turnover.message }
    </p>
    </div>
    
    <br/>
    
    <div>
    <label htmlFor='years_in_current_business'>How Many Years You are In Business ?</label>
    <input id='years_in_current_business' type='number' placeholder='Enter how many years to complete your business' className='form-control' style={{height:"40px"}} {...register("years_in_current_business", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:0,
                    message:"Business cannot be less than zero"
                }
                })} />
        <p style={{color:"red"}}>
            { errors.years_in_current_business && errors.years_in_current_business.message }
        </p>
    </div>
    
    <br/>
    
    <div>
    <label htmlFor='collateral'>Collateral</label>
    <input id='collateral' type='text' className='form-control' placeholder='Enter which collateral type to provide loan services ' style={{height:"40px"}} {...register("collateral", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:5,
                    message:"Please Enter 5 chanracter"
                },
                maxLength:{
                    value:50,
                    message:"Please Enter do enter above 50 chanracter"
                }
    })} />
    <p style={{color:"red"}}>
            { errors.collateral && errors.collateral.message }
        </p>
    </div>
    
    <br/>
    
    <div>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" style={{width:"300px",height:"30px", textAlign:"center"}}  {...register("status",
    {
        required:{
            value: true,
             message: "This field is required"
        }
    })}>
        <option value="">Select</option>
        <option value="Pending">Pending</option>
        <option value="Apporve">Apporve</option>
        <option value="Rejected">Rejected</option>
        
    </select>
    <p style={{color:"red"}}>
            { errors.status && errors.status.message }
        </p>
    </div>

    <br/>
    
    <div>
    <label htmlFor='timestamp'>Application Timestamp</label>
    <input id='timestamp' type='datetime-local' className='form-control' style={{height:"40px"}} {...register("application_timestamp",
    {
        required:{
            value: true,
             message: "This field is required select date time"
        }
    })}/>
    <p style={{color:"red"}}>
            { errors.application_timestamp && errors.application_timestamp.message }
    </p>
    </div>

    <br/>
    
    <div>
    <label htmlFor='remark'>Remark</label>
    <input id='remark' type='text' className='form-control' placeholder='Enter remark' style={{height:"40px"}} {...register("remark", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:5,
                    message:"Please Enter 5 chanracter"
                },
                maxLength:{
                    value:50,
                    message:"Please Enter do enter above 50 chanracter"
                }
    })}/>
    <p style={{color:"red"}}>
            { errors.remark && errors.remark.message }
    </p>
    </div>

    <br/>
    
    <div>
    <center>
    <input type='reset' value="Clear" className='btn2 col-5'/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Save and Next" className='btn2 col-5'/>
    </center>
    </div>

    </form>
    </div>
    </div>
    </>
  )
}

export default Application