import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import "../Pages/Pages.css"
import jwt from "jwt-decode";
 

function Login({setIslogged, setEmail, setRole }) {

  const {register,formState:{errors}, handleSubmit} = useForm();

  const [Error, setError] = useState("")

  const nav = useNavigate();

  async function loginUser(data){
    try{
      const result = await axios.post("http://127.0.0.1:8000/access/",data)
      const get_access = result.data.access
      const user_id = jwt(get_access) //store user id from get form data
      const resp = await axios.get(`http://127.0.0.1:8000/userview/${user_id.user_id}`)
      const user_role = resp.data.role
      
      sessionStorage.setItem("email", resp.data.email) // officer email id set
      sessionStorage.setItem("role",resp.data.role)   // officer role set
      sessionStorage.setItem("access_token", result.data.access) // set access token
      setIslogged(sessionStorage.getItem('access_token'))
      setEmail(sessionStorage.getItem('email'))
      setRole(sessionStorage.getItem('role'))
      
      nav('/'+user_role)
      

    }
    catch(error){
      //console.log(error.response.data)
      setError(error.response.data.detail)
      console.log(Error)

    }
    
  }



  return (
    <>

    <div className='div_page' style={{height:"750px"}}>
    <div className="row">
            <div className="column left" style={{paddingTop:"300px"}}>
            <div  className='child' style={{marginLeft:"20px",marginRight:"30px"}}>
          <span>
              <h1 style={{fontSize:"45px",}} className='h1'><b>Quick Loan </b></h1>
                  <p>
                    <h3 style={{fontSize:"25px"}} ><b>
                      Destination For All Loan Services</b>
                    </h3>
                  </p>
          </span>
          </div>
            </div>
            
            <div className="column right" style={{paddingTop:"15px", marginLeft:"250px"}}>
              <div style={{width:"700px"}}>
              <div style={{marginLeft:"120px"}}><br/>
            <div className="imgcontainer" >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSus0MbvuRBiMoRF911Wh3vfvVAT6ZFkQk2QobvZ9q_tYwin68KD8KShElkkm6YfwJz7i0&usqp=CAU" alt="Avatar" className="avatar"/>
            </div>
              <center>
            <form onSubmit={handleSubmit(loginUser)} >
          <div style={{textAlign:"left", }}>
            
            <div>
            <label htmlFor='email' style={{fontSize:"25px"}} className='label' ><b>Email &nbsp;&nbsp;</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input id='email' type='email' placeholder='Enter email ID' style={{height:"40px",width:"600px"}}  {...register("email", 
                {required:{
                    value:true,
                    message:"This field is required"
                },
                pattern:{
                    value:/^[a-z0-9]+@gmail.com$/,
                    message:"Please Enter Valid Email Address ends with @gmail.com"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.email && errors.email.message }
                    
                </p>
            <br/><br/>
            </div>
            
            <div>
            <label htmlFor='password' style={{fontSize:"25px"}} className='label'><b>Password &nbsp;&nbsp;</b></label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input id='password' type='password' style={{height:"40px",width:"600px"}}  placeholder='Enter Password' {...register("password", 
                {required:{
                    value:true,
                    message:"This field is required"
                },
                pattern:{
                    value:/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/,
                    message:"Please Enter Valid Password"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.password && errors.password.message }
                </p>
            <br/><br/>
            </div>
            <input type='submit' style={{fontSize:"25px", marginLeft:"25px"}} value="Login" className='input'/>&nbsp;&nbsp;
            <NavLink><button style={{fontSize:"25px"}} className='navlink'>Forget password</button></NavLink>
            <center><span style={{color:"red"}}>{Error}</span></center>
            
          </div>
        </form>
        </center>
        </div>
      </div>
      </div>
      </div>
      </div>
  
    </>
  )
}

export default Login