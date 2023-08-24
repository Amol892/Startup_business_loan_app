import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function ApplicationRergardingMail() {

    const {register,formState:{errors}, handleSubmit} = useForm()
    const nav = useNavigate();


    async function sendMail(data){
        await axios.post("http://127.0.0.1:8000/application_regarding_mail/", data)
        nav("/application")

    }
  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"700px"}}>
    <br/><br/>
    <div className='container' style={{width:"600px", height:"550px",}}>
        <br/><center><h1 style={{color:"white"}}><b>Application Regarding Mail</b></h1></center><br/><br/>
        <div style={{color:"white"}}>
        <form onSubmit={handleSubmit(sendMail)}>

            <div>
            <label htmlFor='name'>Customer Name</label>
            <input type='text' id='name' className='form-control' placeholder='Enter customer name here' style={{height:"40px"}} {...register("name", 
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
                    message:"Please Enter do enter above 20 chanracter"
                }
    })} />
    <p style={{color:"red"}}>
        { errors.name && errors.name.message }
    </p>
            
            </div>

            <div>
            <label htmlFor='email'>Customer Email</label>
            <input type='email' id='email' className='form-control' placeholder='Enter email here ex. example@gmail.com' style={{height:"40px"}} {...register("email",{required:{
                    value:true,
                    message:"This Field is required"
                },
                pattern:{
                    value:/^[a-z]+[0-9]+@gmail.com$/,
                    message:"Please Enter Valid Email Address ends with @gmail.com"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.email && errors.email.message }
                </p>
            
            </div>

            <div>
            <label htmlFor='message'>Message</label>
            <input type='text' id='message' className='form-control' placeholder='Enter your message here' style={{height:"40px"}} {...register("message", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:5,
                    message:"Please Enter at least 5 chanracter"
                }
    })} />
    <p style={{color:"red"}}>
        { errors.message && errors.message.message }
    </p>
            <br/><br/>
            </div>
            <center><input type='submit' value="Send" className='btn2 col-8'/></center>
        </form></div>
    </div>
    </div>
    </>
  )
}

export default ApplicationRergardingMail