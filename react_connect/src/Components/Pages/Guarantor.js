import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';

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
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"800px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Guarantor Application</h1>
    <label htmlFor='application'>Application ID</label>
    <input id="application" type='text'  className='form-control' readOnly={true} {...register("application")} />
    <br/><br/>

    <div>
    <label htmlFor='relation_with_customer'>Relation with Member</label>
    <input id="relation_with_customer" type='text' className='form-control' {...register("relation_with_customer", 
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
                    message:"Enter less than 12 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.relation_with_customer && errors.relation_with_customer.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='name'>Name</label>
    <input id="name" type='text' className='form-control' {...register("name",
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
    <label htmlFor='date'>Date Of Birth</label>
    <input id="date" type='date' className='form-control' {...register("date",
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.date && errors.date.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='gender'>Gender</label>&nbsp;&nbsp;
    <select id="gender" style={{width:"300px", textAlign:"center"}} {...register("gender",
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })}>
        <option value=""></option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
        <p style={{color:"red"}}>
                    { errors.gender && errors.gender.message }
        </p>
    </select>
    <br/><br/><br/>
    </div>

    <div>
    <label htmlFor='email'>Email</label>+
    <input id='email' type='email' className='form-control' {...register("email", 
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
    <input id="address" type='text' className='form-control' {...register("address", 
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
    <label htmlFor='state'>State</label>&nbsp;&nbsp;
    <select id="state" style={{textAlign:"center"}} {...register("state",
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })}>
        <option value=""></option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Assam">Assam</option><option value="Bihar">Bihar</option><option value="Chhattisgarh">Chhattisgarh</option>
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
    <br/><br/><br/>
    </div>

    <div>
    <label htmlFor='country'>Country</label>
    <input id='country' type='text' className='form-control' {...register("country", 
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
    <label htmlFor='pin_code'>PIN code</label>
    <input id="pin_code" type='number' className='form-control' {...register("pin_code", 
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
    <input id='mobile' type='text' className='form-control' {...register("mobile",{required:{
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
    <label htmlFor='photo'>Photo</label>
    <input id='photo' type='file' accept="image/png, image/jpeg" className='form-control' {...register("photo",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.photo && errors.photo.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='profession'>Profession</label>
    <input id='profession' type='text' className='form-control' {...register("profession", 
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
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.profession && errors.profession.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='income_certificate'>Income Certficate</label>
    <input id='income_certificate' type='file' accept='file/pdf' className='form-control' {...register("income_certificate",{required:{
                    value:true,
                    message:"This Field is required"
                }
                })}/>
                <p style={{color:"red"}}>
                    { errors.income_certificate && errors.income_certificate.message }
                </p>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='bank_name'>Bank Name</label>
    <input id='bank_name' type='text' className='form-control' {...register("bank_name", 
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
    <label htmlFor='current_account_no'>Current Account No</label>
    <input id='current_account_no' type='text' className='form-control' {...register("current_account_no", 
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
    <label htmlFor='passbook_copy'>Passbook Copy</label>
    <input id='passbook_copy' type='file' accept="file/pdf" className='form-control' {...register("passbook_copy",{required:{
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
    <label htmlFor='ifsc_code'>IFSC Code</label>
    <input id='ifsc_code' type='text' className='form-control' {...register("ifsc_code", 
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
    <center>
    <input type='reset' value="Clear" className='btn btn-warning col-5'/>&nbsp;&nbsp;&nbsp;
    <input type='submit' value="Save" className='btn btn-success col-5'/>
    </center>
    </div>
    </form>
    </div>
    </>
  )
}

export default Guarantor