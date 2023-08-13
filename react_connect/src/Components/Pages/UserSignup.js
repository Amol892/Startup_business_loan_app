import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function UserSignup() {
    const {register, handleSubmit} = useForm();
    const nav = useNavigate();
    const [user, setUser] = useState({})

    async function saveData(data){
        data.photo = data.photo[0]
        data.signature = data.signature[0]
        const res = await axios.post("http://127.0.0.1:8000/userview/",data,{
            headers:{"Content-Type": "multipart/form-data"}
          })
        nav("/application")
        setUser(res.data)
        //console.log(user.email)
        sessionStorage.setItem("id",res.data.id)
      //console.log(user.data)
    }


  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>SignUp</h1>
    <label htmlFor='dob'>DOB</label>
    <input id="dob" type='date' className='form-control' {...register("dob")} />
    <br/><br/>
    <label htmlFor='gender'>Gender</label>&nbsp;&nbsp;
    <select id="gender" {...register("gender")}>
        <option value=""></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="transgender">Transgender</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='email'>Email</label>
    <input id="email" type='email' className='form-control' {...register("email")}/>
    <br/><br/>
    <label htmlFor='permanent_address'>Permanent Address</label>&nbsp;&nbsp;
    <input id="permanent_address" type='text' {...register("permanent_address")}/>
    <br/><br/>
    <label htmlFor='current_address'>Current Address</label>&nbsp;&nbsp;
    <input id="current_address" type='text' {...register("current_address")}/>
    <br/><br/>
    <label htmlFor='mobile'>Mobile</label>
    <input id='mocile' type='text' className='form-control' {...register("mobile")}/>
    <br/><br/>
    <label htmlFor='photo'>Photo</label>
    <input id='photo' type='file' accept="image/png, image/jpeg" className='form-control' {...register("photo")}/>
    <br/><br/>
    <label htmlFor='signature'>Sign</label>
    <input id='signature' type='file' accept="image/png, image/jpeg" className='form-control' {...register("signature")}/>
    <br/><br/>
    <label htmlFor='role'>Role</label>&nbsp;&nbsp;
    <select id="role" {...register("role")}>
        <option value=""></option>
        <option value="cs">Customer</option>
        <option value="oh">Operational Head</option>
        <option value="lo">Loan S Officer</option>
        <option value="ad">Admin</option>
        <option value="ah">Account Head</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='username'>Username</label>
    <input id='username' type='text' className='form-control' {...register("username")}/>
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

export default UserSignup