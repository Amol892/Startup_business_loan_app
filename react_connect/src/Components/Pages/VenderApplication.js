import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function VenderApplication() {

  const {register,formState:{errors}, handleSubmit} = useForm();
  const nav = useNavigate();

  

  async function saveData(data){
    data.passbook_copy = data.passbook_copy[0]
    const result = await axios.post("http://127.0.0.1:8000/vendor_application/",data,{
      headers:{"Content-Type":"multipart/form-data"}
  })
  console.log(result)
    nav("/vender_application")
  }

 
  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"800px", height:"2200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Vendor Bank Deatils</h1>

    <div>
    <label htmlFor='loan'>Application Id</label>
    <input id="loan" type='text' className='form-control' {...register("application",{required:{
                    value:true,
                    message:"This Field is required"
                },
                min:{
                  value:1,
                  message:"Application Id Could not less than zero please Correct proper email id Gives In your email"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.application && errors.application.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='name'>Name</label>
    <input id="name" type='text' className='form-control'  {...register("name",
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter at least 3 character"
                },
                maxLength:{
                    value:12,
                    message:"Name Shound be less than 50 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.name && errors.name.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='vendor_type'>Vender Type</label>
    <input id="vendor_type" type='text' className='form-control' {...register("vendor_type",
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter at least 3 character"
                },
                maxLength:{
                    value:12,
                    message:"Name Shound be less than 50 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.vendor_type && errors.vendor_type.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='email'>Email</label>
    <input id="email" type='email'  className='form-control' {...register("email", 
                {required:{
                    value:true,
                    message:"This field is required"
                },
                pattern:{
                    value:/^[a-z]+[0-9]+@gmail.com$/,
                    message:"Please Enter Valid Email Address ends with @gmail.com"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.email && errors.email.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='address'>Address</label>
    <input id="address" type='text'  className='form-control' {...register("address", 
                {required:{
                    value:true,
                    message:"This Fields is required"
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
                    { errors.address && errors.address.message }
                </p>
    <br/><br/>
    </div>
    
    <div>
    <label htmlFor='city'>City</label>
    <input id="city" type='text' className='form-control' {...register("city", 
                {required:{
                    value:true,
                    message:"This Fields is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter city at least 3 chracter"
                },
                maxLength:{
                    value:50,
                    message:"please do not enter city above 50 character "
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid address do not add special character and number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.city && errors.city.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='state'>State</label>
    <input id="state" type='text'  className='form-control' {...register("state", 
                {required:{
                    value:true,
                    message:"This Fields is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter state at least 3 chracter"
                },
                maxLength:{
                    value:50,
                    message:"please do not enter state above 50 character "
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid address do not add special character and number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.state && errors.state.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='country'>Country</label>
    <input id="country" type='text'  className='form-control' {...register("country", 
                {required:{
                    value:true,
                    message:"This Fields is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter Country at least 3 chracter"
                },
                maxLength:{
                    value:50,
                    message:"please do not enter country above 50 character "
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid address do not add special character and number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.country && errors.country.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='pincode'>Pin Code</label>
    <input id="pincode" type='number'  className='form-control' {...register("pin_code", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:6,
                    message:"Pin code can not less than 6 digits"
                },
                maxLength:{
                    value:6,
                    message:"Pin Code can not greater than 6 digits"
                },
                     })} />
                <p style={{color:"red"}}>
                    { errors.pin_code && errors.pin_code.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='mobile'>Mobile</label>
    <input id="mobile" type='number'  className='form-control' {...register("mobile",{required:{
                    value:true,
                    message:"This Field is required"
                },
                minLength:{
                  value:10,
                  message:"Mobile No can not less than 10 digits"
                },
                maxLength:{
                  value:10,
                  message:"Mobile no can not greater than 10 digits"
                },
                pattern:{
                    value:/^[7-9]{1}[0-9]{2,9}$/,
                    message:"please Enter 10 digit valid mobile number"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.mobile && errors.mobile.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='bank_name'>Bank Name</label>
    <input id="bank_name" type='text'  className='form-control' {...register("bank_name", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Profession can not less than 3 character"
                },
                maxLength:{
                    value:20,
                    message:"Professin can not greater than 20 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.bank_name && errors.bank_name.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='passbook'>Passbook Copy</label>
    <input id="passbook" type='file'accept='file/pdf' className='form-control' {...register("passbook_copy",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.passbook_copy && errors.passbook_copy.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='c_account'>Current Account Number</label>
    <input id="c_account" type='text'  className='form-control' {...register("current_account_no", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:4,
                    message:"Account Number can not less than 4 character"
                },
                maxLength:{
                    value:20,
                    message:"Account number can not greater than 20 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.current_account_no && errors.current_account_no.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='ifsc_code'>IFSC Code</label>
    <input id="ifsc_code" type='text'  className='form-control' {...register("ifsc_code", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:4,
                    message:"Account Number can not less than 4 character"
                },
                maxLength:{
                    value:20,
                    message:"Account number can not greater than 20 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.ifsc_code && errors.ifsc_code.message }
                </p>
    <br/><br/>
    </div>
    
    <div>
    <center><input type='submit' value="Save" className='btn btn-success col-8'/></center>
    </div>
    </form>
    </div>
    </>
  )
}

export default VenderApplication