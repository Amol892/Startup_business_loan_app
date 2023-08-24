import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import "./PagesCss/UserCss.css"

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
    <div style={{backgroundColor:"#3d3840"}}>
    <br/>
    <div className='container' style={{color:"white",width:"700px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{ textAlign:"center"}}>Vendor Bank Details</h1>

    <div>
    <label htmlFor='loan'>Application Id</label>
    <input id="loan" type='number' className='form-control' placeholder='Enter application id here' style={{height:"40px"}} {...register("application",{required:{
                    value:true,
                    message:"This Field is required"
                },
                min:{
                  value:1,
                  message:"Application Id should not less than zero"
                },
                })}/>
                <p style={{color:"red"}}>
                    { errors.application && errors.application.message }
                </p>
    </div>

    <div>
    <label htmlFor='name'>Name</label>
    <input id="name" type='text' className='form-control' placeholder='Enter name here' style={{height:"40px"}} {...register("name",
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
    </div>

    <div>
    <label htmlFor='vendor_type'>Vendor Type</label>
    <input id="vendor_type" type='text' className='form-control' placeholder='Enter Vender type here' style={{height:"40px"}} {...register("vendor_type",
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
                    message:"Vendor type Shound be greater than 50 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.vendor_type && errors.vendor_type.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='email'>Email</label>
    <input id="email" type='email'  className='form-control' placeholder='Enter email address here' style={{height:"40px"}} {...register("email", 
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
    
    </div>

    <div>
    <label htmlFor='address'>Address</label>
    <input id="address" type='text' style={{height:"40px"}} placeholder='Enter address here'  className='form-control' {...register("address", 
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
    
    </div>
    
    <div>
    <label htmlFor='city'>City</label>
    <input id="city" type='text' className='form-control' placeholder='Enter city here' style={{height:"40px"}} {...register("city", 
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
    </div>

    <div>
    <label htmlFor='state'>State</label>
    <input id="state" type='text'  className='form-control' placeholder='Enter state here' style={{height:"40px"}} {...register("state", 
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
    </div>

    <div>
    <label htmlFor='country'>Country</label>
    <input id="country" type='text'  className='form-control' placeholder='Enter Country here' style={{height:"40px"}} {...register("country", 
                {required:{
                    value:true,
                    message:"This Fields is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter Country name at least 3 chracter"
                },
                maxLength:{
                    value:50,
                    message:"please do not enter country name above 50 character "
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid address do not add special character and number"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.country && errors.country.message }
                </p>
    </div>

    <div>
    <label htmlFor='pincode'>Pin Code</label>
    <input id="pincode" type='number'  className='form-control' placeholder='Enter pin code here' style={{height:"40px"}} {...register("pin_code", 
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
    </div>

    <div>
    <label htmlFor='mobile'>Mobile</label>
    <input id="mobile" type='text'  className='form-control' placeholder='Enter mobile number here' style={{height:"40px"}} {...register("mobile",{required:{
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
    </div>

    <div>
    <label htmlFor='bank_name'>Bank Name</label>
    <input id="bank_name" type='text'  className='form-control' placeholder='Enter bank name here' style={{height:"40px"}} {...register("bank_name", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Bank name can not less than 3 character"
                },
                maxLength:{
                    value:20,
                    message:"Bank name can not greater than 20 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.bank_name && errors.bank_name.message }
                </p>
    </div>

    <div>
    <label htmlFor='passbook'>Passbook Copy</label>
    <input id="passbook" type='file'accept='file/pdf' className='form-control' style={{height:"40px"}} {...register("passbook_copy",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.passbook_copy && errors.passbook_copy.message }
                </p>
    </div>

    <div>
    <label htmlFor='c_account'>Current Account Number</label>
    <input id="c_account" type='text'  className='form-control' placeholder='Enter current bank account number' style={{height:"40px"}} {...register("current_account_no", 
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
    </div>

    <div>
    <label htmlFor='ifsc_code'>IFSC Code</label>
    <input id="ifsc_code" type='text'  className='form-control' placeholder='Enter IFSC Code' style={{height:"40px"}} {...register("ifsc_code", 
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
                },
                pattern:{
                    value:/^[A-Z]{4}[0-9]{7}$/,
                    message:"Invalid IFSc code enter valid format ex ABCD0004578"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.ifsc_code && errors.ifsc_code.message }
                </p>
    </div>
    
    <div>
    <center><input type='submit' value="Save" className='btn2 col-8'/></center>
    </div>
    </form>
    </div>
    </div>
    </>
    
  )
}

export default VenderApplication