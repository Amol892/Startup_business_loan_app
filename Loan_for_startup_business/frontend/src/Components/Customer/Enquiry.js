import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom';

function Enquiry() {

    const {register,formState:{errors},handleSubmit, watch}=useForm({mode:'all'})
    const [message, setMessage] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate()

    const [gen_OTP, setGenOTP] = useState('');
    const watchedEmail = watch('email');
    
    
    const sendMail = (watchedEmai) => {
        
        const data = {'email':watchedEmai,'OTP':true};
        console.log(data)
         axios.post('http://localhost:8000/customer/enquiry/',data).then(response=>{
            console.log(response.data)
            setGenOTP(response.data.gen_OTP)
            setMessage(response.data.message)
            
        }).catch(error=>{
            setError(error.response.data.email)
        })

    }

    async function saveData(data){
        
        if(gen_OTP === parseInt(data['email_otp'])){
            
            await axios.post('http://localhost:8000/customer/enquiry/',data).then(response=>{
                console.log(response.data)
                setMessage(response.data.message)
                navigate('/loan_status')
            }).catch(error=>{
                console.log(error.response.data)
                setError(error.response.data.email)
            })
        }
        else{
            setError("Enter Correct OTP/Create new OTP")
        }
        }


  return (
    <>
        <div className='container' style={{width:700,backgroundColor:'#6a5acd',borderRadius:30,marginTop:30,marginLeft:950,padding:40}}>
            <center style={{color:'#ffff00'}}>
            <h1>Welcome to TechGrow</h1>
            <h4>Grow your Business with TechGrow</h4>
            </center><hr/>
            <center style={{color:'aqua'}}><h3>{message}</h3></center><br/>
            <center style={{color:'red'}}><h3>{error}</h3></center><br/>
            
            <form onSubmit={handleSubmit(saveData)}>

                <label htmlFor='fn'><b>First Name</b></label>
                <input type='text' id='fn' className='form-control' placeholder='Enter First Name' {...register('first_name',{required : 'first_name is required'})}/><br/>
                <p style={{'color':'red'}}>{errors.first_name && errors.first_name.message}</p>

                <label htmlFor='ln'><b>Last Name</b></label>
                <input type='text' id='ln' className='form-control' placeholder='Enter Last Name' {...register('last_name',{required : 'last_name is required'})}/><br/>
                <p style={{'color':'red'}}>{errors.last_name && errors.last_name.message}</p>

                <label htmlFor='em'><b>Email Id</b></label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type='email' id='em'  className='form-control' placeholder='Enter Email' {...register('email',{required : 'Email id is required',
                                                                        pattern:{value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:'Enter valid email'}})} style={{ marginRight: '20px' }}/>
                <NavLink onClick={() => sendMail(watchedEmail)} className='btn btn-info col-3'>Create OTP</NavLink>
                </div><br/>
                <p style={{'color':'red'}}>{errors.email && errors.email.message}</p>
               
                <b>Enter OTP</b> :<input type='text' id='otp' className='form-control' placeholder='Enter valid OTP' {...register('email_otp',{required : 'OTP is required'})}/><br/>
                <p style={{'color':'red'}}>{errors.email_otp && errors.email_otp.message}</p>
                
                <label htmlFor='mob'><b>Mobile number</b></label>
                <input type='text' id='mob' className='form-control' placeholder='Enter Mobile number' {...register('mobile',{required : 'Mobile number is required'})}/><br/>
                <p style={{'color':'red'}}>{errors.mobile && errors.mobile.message}</p>

                <label htmlFor='lp'><b>Loan Purpose</b></label>
                <input type='text' id='lp' className='form-control' placeholder='Loan Purpose' {...register('message',{required : 'Loan purpose is required'})}/><br/>
                <p style={{'color':'red'}}>{errors.message && errors.message.message}</p>

                <input type='submit' value='Submit application' className='btn btn-success col-12'/><br/><br/>
                
            </form>
        </div>
    </>
  )
}

export default Enquiry