import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';
import "./PagesCss/UserCss.css"

function Guarantor() {

  const {register, handleSubmit,formState:{errors}, setValue} = useForm();
  const nav = useNavigate();
  /*const access_token = JSON.parse(localStorage.getItem("item"));
  console.log(access_token)
  

  async function saveData(data){
      if (access_token){
      await axios.post("http://127.0.0.1:8000/guarantor/",data,{
          headers:{Authorization: "Bearer"+" "+access_token}
          
      })
      nav("/documents")
      }else{
          nav("/login")
      }
  };

  useEffect(()=>{
      //getUser();
      const token = access_token;
      if (!token){
          nav("/login")
      }
  },[])*/

  const [guarenter, setGuarenter] = useState({});
  
  async function saveData(data){
    data.photo = data.photo[0]
    data.passbook_copy = data.passbook_copy[0]
    data.income_certificate = data.income_certificate[0]
    const response = await axios.post("http://127.0.0.1:8000/guarantor/",data,{
        headers:{"Content-Type":"multipart/form-data"}
    })
    nav("/success_message")
    console.log(response.data)
    setGuarenter(response.data)
    sessionStorage.setItem("guarenter_id",response.data.id)
  }

  useEffect(()=>{
    const response = sessionStorage.getItem('application_id')
    setValue("application", response) 
  })

  return (
    <>
    
    <div style={{backgroundColor:"#3d3840"}}><br/>
    <div className='container' style={{width:"700px", color:"white"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{ textAlign:"center"}}>Guarantor Application</h1>
    <label htmlFor='application'>Application ID</label>
    <input id="application" type='text'  className='form-control' readOnly={true} style={{height:"40px"}} {...register("application")} />
    <br/><br/>

    <div>
    <label htmlFor='relation_with_customer'>Relation With Customer</label>
    <input id="relation_with_customer" type='text' placeholder='Enter relation with customer' className='form-control' style={{height:"40px"}} {...register("relation_with_customer", 
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
                    message:"relationship with should not be greater than 12 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.relation_with_customer && errors.relation_with_customer.message }
                </p>
    </div>

    <div>
    <label htmlFor='name'>Name</label>
    <input id="name" type='text' className='form-control' placeholder='Enter your full name here' style={{height:"40px"}} {...register("name",
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Please Enter at least 3 character"
                },
                maxLength:{
                    value:50,
                    message:"Name Shound not be greater than 50 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.name && errors.name.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='date'>Date Of Birth</label>
    <input id="date" type='date' className='form-control' style={{height:"40px"}} {...register("date",
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.date && errors.date.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='gender'>Gender</label>&nbsp;&nbsp;
    <select id="gender" style={{width:"300px",height:"30px", textAlign:"center"}} {...register("gender",
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })}>
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
        <p style={{color:"red"}}>
                    { errors.gender && errors.gender.message }
        </p>
    </select>
    </div><br/>

    <div>
    <label htmlFor='email'>Email</label>+
    <input id='email' type='email' className='form-control' placeholder='ex. example@gmail.com' style={{height:"40px"}} {...register("email", 
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
    <input id="address" type='text' className='form-control' placeholder='Enter your address here' style={{height:"40px"}} {...register("address", 
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
    <input id="city" type='text' className='form-control' placeholder='Enter your city, Town here' style={{height:"40px"}} {...register("city", 
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
    <br/>
    </div>

    <div>
    <label htmlFor='state'>State</label>&nbsp;&nbsp;
    <select id="state" style={{textAlign:"center",height:"30px", width:"300px"}} {...register("state",
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })}>
        <option value="">Select</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand</option><option value="West Bengal">West Bengal</option><option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Chandigarh">Chandigarh</option><option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option><option value="Daman and Diu">Daman and Diu</option><option value="Lakshadweep">Lakshadweep</option><option value="National Capital Territory of Delhi">National Capital Territory of Delhi</option>
        <option value="Puducherry">Puducherry</option>
    </select>
                <p style={{color:"red"}}>
                    { errors.state && errors.state.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='country'>Country</label>
    <input id='country' type='text' className='form-control' placeholder='Enter your country here' style={{height:"40px"}} {...register("country", 
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
    <br/>
    </div>

    <div>
    <label htmlFor='pin_code'>PIN code</label>
    <input id="pin_code" type='number' className='form-control' placeholder='Enter Your pin code' style={{height:"40px"}} {...register("pin_code", 
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
                pattern:{
                    value:/^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$/,
                    message:"Please Enter Valid Pin code"
                }
                     })} />
                <p style={{color:"red"}}>
                    { errors.pin_code && errors.pin_code.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='mobile'>Mobile</label>
    <input id='mobile' type='text' className='form-control' placeholder='Enter mobile number here' style={{height:"40px"}} {...register("mobile",{required:{
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
    <br/>
    </div>

    <div>
    <label htmlFor='photo'>Photo</label>
    <input id='photo' type='file' accept="image/png, image/jpeg" className='form-control' style={{height:"40px"}} {...register("photo",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.photo && errors.photo.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='profession'>Profession</label>
    <input id='profession' type='text' className='form-control' placeholder='Enter profession here' style={{height:"40px"}} {...register("profession", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Profession can not less than 3 character"
                },
                maxLength:{
                    value:50,
                    message:"Professin can not greater than 50 character"
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid Profession start with capital letter do not add special character and number"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.profession && errors.profession.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='income_certificate'>Income Certficate</label>
    <input id='income_certificate' type='file' accept='file/pdf' className='form-control' style={{height:"40px"}} {...register("income_certificate",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.income_certificate && errors.income_certificate.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='bank_name'>Bank Name</label>
    <input id='bank_name' type='text' className='form-control' placeholder='Enter Your bank name here' style={{height:"40px"}} {...register("bank_name", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Bank can not less than 3 character"
                },
                maxLength:{
                    value:20,
                    message:"Bank can not greater than 20 character"
                },
                pattern:{
                    value:/^[A-Z]{1}[a-zA-Z]+$/,
                    message:"Please Enter valid bank name start with capital letter do not add special character and number"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.bank_name && errors.bank_name.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='current_account_no'>Current Account No</label>
    <input id='current_account_no' type='text' className='form-control' placeholder='Enter Your Current account number' style={{height:"40px"}} {...register("current_account_no", 
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
    <br/>
    </div>
    
    <div>
    <label htmlFor='passbook_copy'>Passbook Copy</label>
    <input id='passbook_copy' type='file' accept="file/pdf" className='form-control' style={{height:"40px"}} {...register("passbook_copy",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.passbook_copy && errors.passbook_copy.message }
                </p>
    <br/>
    </div>


    <div>
    <label htmlFor='ifsc_code'>IFSC Code</label>
    <input id='ifsc_code' type='text' className='form-control' placeholder='Enter your IFSC code here' style={{height:"40px"}} {...register("ifsc_code", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:11,
                    message:"IFSC can not less than 11 character"
                },
                maxLength:{
                    value:11,
                    message:"IFSC can not greater than 11 character"
                },
                pattern:{
                    value:/^[A-Z]{4}[0-9]{7}$/,
                    message:"Invalid IFSc code enter valid format ex ABCD0004578"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.ifsc_code && errors.ifsc_code.message }
                </p>
    <br/>
    </div>

    <div>
    <center>
    <input type='reset' value="Clear" className='btn2 col-5'/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Save" className='btn2 col-5'/>
    </center>
    </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default Guarantor