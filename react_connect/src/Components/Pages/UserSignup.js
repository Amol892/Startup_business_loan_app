import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import "./PagesCss/UserCss.css"

function UserSignup() {
    const {register, formState:{errors}, handleSubmit} = useForm();
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
    <div style={{backgroundColor:"#3d3840"}}>
    <br/><br/>
    <div className='container' style={{ color:"white", width:"650px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"", textAlign:"center"}}>Registration</h1>

    <div >
    <label htmlFor='dob'>DOB</label>
    <input id="dob" type='date' className='form-control' style={{height:"40px"}}  {...register("dob",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.dob && errors.dob.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='gender'>Gender</label>&nbsp;&nbsp;
    <select id="gender" style={{width:"300px", height:"30px", textAlign:"center"}} {...register("gender",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}>
                <p style={{color:"red"}}>
                    { errors.gender && errors.gender.message }
                </p>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="transgender">Transgender</option>
    </select>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='email'>Email</label>
    <input id="email" type='email' className='form-control' placeholder='ex. example@gmail.com' style={{height:"40px"}} {...register("email",{required:{
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
    <br/>
    </div>

    <div>
    <label htmlFor='permanent_address'>Permanent Address</label>&nbsp;&nbsp;
    <input id="permanent_address" type='text' style={{height:"40px"}} placeholder='Enter Permanent address here' className='form-control' {...register("permanent_address",
                {required:{
                    value:true,
                    message:"This Field is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter address at least 3 chracter"
                },
                maxLength:{
                    value:50,
                    message:"please do not enter address above 50 character "
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid address do not add special character and number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.permanent_address && errors.permanent_address.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='current_address'>Current Address</label>&nbsp;&nbsp;
    <input id="current_address" type='text' style={{height:"40px"}} placeholder='Enter current address here' className='form-control' {...register("current_address",
                {required:{
                    value:true,
                    message:"This Field is required"
                },
                minLength:{
                    value:6,
                    message:"Please Enter address at least 3 chracter"
                },
                maxLength:{
                    value:50,
                    message:"please do not enter address above 50 character "
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid address do not add special character and number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.current_address && errors.current_address.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='mobile'>Mobile</label>
    <input id='mocile' type='text' style={{height:"40px"}} placeholder='Enter mobile number here start with +91' className='form-control' {...register("mobile",
                {required:{
                    value:true,
                    message:"This Field is required"
                },
                minLength:{
                  value:13,
                  message:"Mobile No must start with +91 and should have 10 digits"
                },
                maxLength:{
                  value:13,
                  message:"Mobile No must start with +91 and should have 10 digits "
                },
                
                })}/>
                <p style={{color:"red"}}>
                    { errors.mobile && errors.mobile.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='photo'>Photo</label>
    <input id='photo' type='file' accept="image/png, image/jpeg" style={{height:"40px"}}  className='form-control' {...register("photo",{required:{
                    value:true,
                    message:"This Field is required"
                },
                
                })}/>
                <p style={{color:"red"}}>
                    { errors.photo && errors.photo.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='signature'>Sign</label>
    <input id='signature' type='file' accept="image/png, image/jpeg" style={{height:"40px"}} className='form-control' {...register("signature",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.signature && errors.signature.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='role'>Role</label>&nbsp;&nbsp;
    <select id="role" style={{width:"300px",height:"30px", textAlign:"center"}} {...register("role",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}>
                <p style={{color:"red"}}>
                    { errors.role && errors.role.message }
                </p>
        <option value="customer">Customer</option> 
    </select>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='username'>Username</label>
    <input id='username' type='text' style={{height:"40px"}} className='form-control' placeholder='ex. Example123, Example@123 ...' {...register("username",{required:{
                    value:true,
                    message:"This Field is required"
                },
                minLength:{
                  value:5,
                  message:"Username can not less than 10 character"
                },
                maxLength:{
                  value:10,
                  message:"username can not greater than 15 character"
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z0-9]{2,15}$/,
                    message:"please Enter valid Username ex: Xabcd101"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.username && errors.username.message }
                </p>
    
    </div>
    <br/>
    <div>
    <center>
    <input type='reset' value="Clear" className='btn2' style={{height:"50px", width:"300px"}}/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Save and Next" style={{height:"50px", width:"300px"}} className='btn2'/>
    </center>
    </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default UserSignup