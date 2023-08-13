import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';

function Guarantor() {

  const {register, handleSubmit, setValue} = useForm();
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
    console.log(response.data)
    setGuarenter(response.data)
    sessionStorage.setItem("guarenter_id",response.data.id)
    nav("/documents")
  }

  useEffect(()=>{
    const response = sessionStorage.getItem('application_id')
    setValue("application", response) 
  })

  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Guarantor Application</h1>
    <label htmlFor='application'>Application ID</label>
    <input id="application" type='text' readOnly={true} className='form-control' {...register("application")} />
    <br/><br/>
    <label htmlFor='relation_with_customer'>Relation with Member</label>
    <input id="relation_with_customer" type='text' className='form-control' {...register("relation_with_customer")} />
    <br/><br/>
    <label htmlFor='name'>Name</label>
    <input id="name" type='text' className='form-control' {...register("name")}/>
    <br/><br/>
    <label htmlFor='date'>Date Of Birth</label>
    <input id="date" type='date' className='form-control' {...register("date")}/>
    <br/><br/>
    <label htmlFor='gender'>Gender</label>&nbsp;&nbsp;
    <select id="gender" {...register("gender")}>
        <option value=""></option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='email'>Email</label>+
    <input id='email' type='email' className='form-control' {...register("email")}/>
    <br/><br/>
    <label htmlFor='address'>Address</label>
    <input id="address" type='text' className='form-control' {...register("address")}/>
    <br/><br/>
    <label htmlFor='city'>City</label>
    <input id="city" type='text' className='form-control' {...register("city")}/>
    <br/><br/>
    <label htmlFor='state'>State</label>&nbsp;&nbsp;
    <select id="state" {...register("state")}>
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
    <br/><br/><br/>
    <label htmlFor='country'>Country</label>
    <input id='country' type='text' className='form-control' {...register("country")} />
    <br/><br/>
    <label htmlFor='pin_code'>PIN code</label>
    <input id="pin_code" type='number' className='form-control' {...register("pin_code")}/>
    <br/><br/>
    <label htmlFor='mobile'>Mobile</label>
    <input id='mobile' type='text' className='form-control' {...register("mobile")}/>
    <br/><br/>
    <label htmlFor='photo'>Photo</label>
    <input id='photo' type='file' accept="image/png, image/jpeg" className='form-control' {...register("photo")} />
    <br/><br/>
    <label htmlFor='profession'>Profession</label>
    <input id='profession' type='text' className='form-control' {...register("profession")} />
    <br/><br/>
    <label htmlFor='income_certificate'>Income Certficate</label>
    <input id='income_certificate' type='file' accept='file/pdf' className='form-control' {...register("income_certificate")} />
    <br/><br/>
    <label htmlFor='bank_name'>Bank Name</label>
    <input id='bank_name' type='text' className='form-control' {...register("bank_name")} />
    <br/><br/>
    <label htmlFor='current_account_no'>Current Account No</label>
    <input id='current_account_no' type='text' className='form-control' {...register("current_account_no")} />
    <br/><br/>
    <label htmlFor='passbook_copy'>Passbook Copy</label>
    <input id='passbook_copy' type='file' accept="file/pdf" className='form-control' {...register("passbook_copy")} />
    <br/><br/>
    <label htmlFor='ifsc_code'>IFSC Code</label>
    <input id='ifsc_code' type='text' className='form-control' {...register("ifsc_code")} />
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

export default Guarantor