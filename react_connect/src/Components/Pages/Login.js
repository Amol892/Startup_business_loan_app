import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";


function Login() {

  const {register, handleSubmit} = useForm();

  const nav = useNavigate();

  async function loginUser(data){
    const result = await axios.post("http://127.0.0.1:8000/access/", data)
    console.log(result.data.access)
    localStorage.setItem("item", JSON.stringify(result.data.access))
    nav("/user_signup")
  }


  return (
    <>
    <br/><br/><br/>
        <div className='container' style={{backgroundColor:"lightgray", width:"700px"}}>
            <center><h1>Login Form</h1></center>
        <form onSubmit={handleSubmit(loginUser)}>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' className='form-control' {...register("email")}/>
        <br/><br/>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' className='form-control' {...register("username")}/>
        <br/><br/>
        <label htmlFor='password'>Password</label>
        <input id='password' type='password' className='form-control' {...register("password")}/>
        <br/><br/>
        <center><input type='submit' value="Login" className='btn btn-success col-5'/>&nbsp;&nbsp;&nbsp;
        <NavLink to="#"><button className='btn btn-warning col-5'>SignUp</button></NavLink></center>
        </form>
        </div>
    </>
  )
}

export default Login