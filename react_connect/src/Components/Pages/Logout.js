import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Logout({setIslogged, setEmail, setRole, }) {
    const nav = useNavigate();

    const {handleSubmit} = useForm();

    //const [userRole, setRole] = useState({})
     function getRole(){
      const role = sessionStorage.getItem("role")
      if (role === "operational_head"){
        nav("/all_pending_application")
      }else if(role === "loan_representative"){
        nav("/user_signup")
      }else if(role === "account_head"){
        nav("/apporve_application")
      }else if(role === "loan_s_officer"){
        nav("/all_verify_application")
      }
        console.log(role)
    }
    


    async function logOutUser(){
      sessionStorage.clear();
      setIslogged(sessionStorage.getItem('access_token'))
      setEmail(sessionStorage.getItem('email'))
      setRole(sessionStorage.getItem('role'))
      nav("/login")
    }

    useEffect(()=>{},[])
  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"700px"}}><br/><br/><br/><br/><br/><br/>
    <div style={{height:"230px",backgroundColor:"#ebd8c5", width:"500px", marginLeft:"500px", padding:"20px",textAlign:"center", }}>
    <form onSubmit={handleSubmit(logOutUser)}>
      <h1><b>Are You Sure Want To Logout</b></h1><br/>
      <center><input type='submit' value="yes" className='btn2 col-5'/>&nbsp;&nbsp;&nbsp;
      <button onClick={getRole} className='btn2 col-5' >No</button></center>
    </form>
    </div>
    </div>
    </>
  )
}

export default Logout