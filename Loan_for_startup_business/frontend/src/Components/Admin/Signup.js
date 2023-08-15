import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
function Signup() {

        const {register,handleSubmit}=useForm()
        const navigate = useNavigate()
        const [message, setMessage] = useState(' ');
        const [error,setError]=useState([])
        async function saveData(data){
                console.log(data.role)
                data.photo = data.photo[0]
                data.signature = data.signature[0]
               await axios.post('http://localhost:8000/admin_app/signup/',data,
               {headers:{"content-Type":"multipart/form-data"}}).then(response=>{
                    setMessage(response.data.message)
                    navigate('/signup')
               }).catch(error=>{
                
                    console.log(error.response.data)
                    setError(error.response.data)
               })
               
        }

  return (
    <>
            <hr style={{color:'white'}}/>
            <div className='container' style={{backgroundColor:'palegoldenrod',borderRadius:20,padding:40}}>
                <center style={{color:'midnightblue'}}>
                <h1>Create your Account</h1><hr/>
                  {message && <h3>{message}</h3>}
                  
                </center>
                <form onSubmit={handleSubmit(saveData)}>

                    <label htmlFor='fn'>First Name</label>
                    <input type='text' id='fn' className='form-control' {...register('first_name',{required : 'first_name is required'})}/><br/>
                    <p style={{'color':'red'}}>{error.first_name && error.first_name.message}</p><br/>

                    <label htmlFor='ln'>Last Name</label>
                    <input type='text' id='ln' className='form-control' {...register('last_name',{required : 'last_name is required'})}/><br/>
                    <p style={{'color':'red'}}>{error.last_name && error.last_name.message}</p><br/>

                    <label htmlFor='un'>Username</label>
                    <input type='text' id='un' className='form-control' {...register('username',{required : 'Username is required'})}/><br/>
                    <p style={{color:'red'}}>{error.username}</p><br/>

                    <label htmlFor='ps'>Password</label>
                    <input type='password' id='psd' className='form-control' {...register('password',{required : 'password is required'})}/><br/>
                    {error.password && <h4 style={{color:'red'}}>{error.password}</h4>}<br/>
                    
                    <label htmlFor='em'>Email Id</label>
                    <input type='email' id='em' className='form-control' {...register('email',{required : 'Email id is required',
                                                                        pattern:{value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:'Enter valid email'}})}/><br/>
                    <p style={{color:'red'}}>{error.email}</p><br/>
                    
                    <label htmlFor='pn'>Phone Number</label><br/><br/>
                    <input type='text' id='pn'  className='form-control' {...register('mobile',{required : 'mobile number is required'})}/><br/>

                    <label htmlFor='dt'>Date of birth</label><br/>
                    <input type='date' id='dt' style={{borderRadius:10,padding:10,backgroundColor:'darkgray'}}   {...register('dob',{required : 'date of birth is required'})}/><br/><br/>

                    <label htmlFor='gen'>Gender</label><br/>
                    <input type='radio' id='gen' value='male' {...register('gender')}/><b>Male</b><br/><br/>
                    <input type='radio' id='gen' value='female' {...register('gender')}/><b>Female</b><br/><br/>
                    <input type='radio' id='gen' value='transgender' {...register('gender')}/><b>Transgender</b><br/><br/>


                    <label htmlFor='ad'>Permanent Address</label>
                    <input type='text' id='ad' className='form-control' {...register('permanent_address')}/><br/>

                    <label htmlFor='ld'>Current Address</label>
                    <input type='text' id='ld' className='form-control' {...register('current_address')}/><br/>

                    <label htmlFor='con'>Profile Photo</label>
                    <input type='file' id='con' className='form-control' {...register('photo',{required : 'Photo is required'})}/><br/>

                    <label htmlFor='st'>Signature Photo</label>
                    <input type='file' id='st' className='form-control' {...register('signature',{required : 'signature is required'})}/><br/>


                    <label htmlFor='ro'>User Role</label>&nbsp;&nbsp;
                    <select className='btn btn-outline-dark' {...register('role',{required : 'User Role is required'})}>
                        <option disabled selected>Select Role</option>
                        <option value='cs'>customer</option>
                        <option value='lr'>loan_representative</option>
                        <option value='oh'>operational_head</option>
                        <option value='lo'>loan_sanctioning_officer</option>
                        <option value='ad'>admin</option>
                        <option value='ah'>account_head</option>
                    </select>
                    <p style={{'color':'red'}}>{error.role && error.role.message}</p><br/>

                    
                    <input type='submit' value='Register' style={{padding:10,fontSize:20}} className='btn btn-success col-6'/><br/><br/>
                    
                   
                </form>
            </div>
            
    </>
  )
}

export default Signup