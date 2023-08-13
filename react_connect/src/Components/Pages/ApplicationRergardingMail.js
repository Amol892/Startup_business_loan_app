import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function ApplicationRergardingMail() {

    const {register, handleSubmit} = useForm()
    const nav = useNavigate();


    async function sendMail(data){
        await axios.post("http://127.0.0.1:8000/application_regarding_mail/", data)
        nav("/application")

    }
  return (
    <>
    <br/><br/>
    <div className='container' style={{width:"600px", height:"550px", backgroundColor:"lightgray"}}>
        <br/><center><h1 style={{color:"rebeccapurple"}}><b>Application Regarding Mail</b></h1></center><br/><br/>
        <form onSubmit={handleSubmit(sendMail)}>
        <label htmlFor='name'>Customer Name</label>
            <input type='name' id='text' className='form-control' {...register("name")} />
            <br/><br/>
            <label htmlFor='email'>Customer Email</label>
            <input type='email' id='email' className='form-control' {...register("email")} />
            <br/><br/>
            <label htmlFor='message'>Message</label>
            <input type='textarea' id='message' className='form-control' {...register("message")}/>
            <br/><br/>
            <center><input type='submit' value="Send" className='btn btn-success col-8'/></center>
        </form>
    </div>
    </>
  )
}

export default ApplicationRergardingMail