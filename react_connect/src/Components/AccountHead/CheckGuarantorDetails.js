import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function CheckGuarantorDetails() {

    const {register, handleSubmit, setValue} = useForm();
    const nav = useNavigate();
    
   
    const [gdata, setGdata] = useState({})

    async function getGaruntor(){
        const get_id = sessionStorage.getItem("id")
        const resp = await axios.get(`http://127.0.0.1:8000/guarantor_details/${get_id}`)
        setGdata(resp.data)
        console.log(resp.data)
        setValue("application",resp.data.application);setValue("relation_with_customer",resp.data.relation_with_customer);setValue("name",resp.data.name);
        setValue("dob",resp.data.dob);setValue("gender",resp.data.gender);
        setValue("email",resp.data.email);setValue("address",resp.data.address);setValue("city",resp.data.city);setValue("state",resp.data.state);
        setValue("country",resp.data.country);setValue("pin_code",resp.data.pin_code);setValue("mobile",resp.data.mobile);
        setValue("profession",resp.data.profession);setValue("bank_name",resp.data.bank_name);setValue("current_account_no",resp.data.current_account_no);setValue("ifsc_code",resp.data.ifsc_code);
    }

    useEffect(()=>{
        getGaruntor();
    },[])

  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"2000px"}}>
    <br/><br/>
    <div className='container' style={{width:"700px"}}>
    <form>
    <h1 style={{color:"white", textAlign:"center"}}>Guarantor Application</h1>
    <div style={{color:"white"}}>
    <label htmlFor='application'>Application ID</label>
    <input id="application" type='text' readOnly={true} className='form-control' style={{height:"40px"}} {...register("application")} />
    <br/><br/>
    <label htmlFor='relation_with_customer'>Relation with Member</label>
    <input id="relation_with_customer" type='text' className='form-control' style={{height:"40px"}} readOnly={true} {...register("relation_with_customer")} />
    <br/><br/>
    <label htmlFor='name'>Name</label>
    <input id="name" type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("name")}/>
    <br/><br/>
    <label htmlFor='date'>Date Of Birth</label>
    <input id="date" type='date' className='form-control' readOnly={true} style={{height:"40px"}} {...register("dob")}/>
    <br/><br/>
    <label htmlFor='gender'>Gender</label>&nbsp;&nbsp;
    <select id="gender" readOnly={true} style={{height:"30px", width:"300px", textAlign:"center"}} {...register("gender")}>
        <option value=""></option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
    </select>
    <br/><br/>
    <label htmlFor='email'>Email</label>+
    <input id='email' type='email' className='form-control' readOnly={true} style={{height:"40px"}} {...register("email")}/>
    <br/><br/>
    <label htmlFor='address'>Address</label>
    <input id="address" type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("address")}/>
    <br/><br/>
    <label htmlFor='city'>City</label>
    <input id="city" type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("city")}/>
    <br/><br/>
    <label htmlFor='state'>State</label>&nbsp;&nbsp;
    <select id="state" readOnly={true} style={{height:"30px", width:"300px", textAlign:"center"}} {...register("state")}>
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
    <br/><br/>
    <label htmlFor='country'>Country</label>
    <input id='country' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("country")} />
    <br/><br/>
    <label htmlFor='pin_code'>PIN code</label>
    <input id="pin_code" type='number' className='form-control' readOnly={true} style={{height:"40px"}} {...register("pin_code")}/>
    <br/><br/>
    <label htmlFor='mobile'>Mobile</label>
    <input id='mobile' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("mobile")}/>
    <br/><br/>
    <label htmlFor='photo'>Photo</label>
    <input id='photo' type='file' accept="image/png, image/jpeg" readOnly={true} style={{height:"40px"}} className='form-control' {...register("photo")} />
    <br/><br/>
    <label htmlFor='profession'>Profession</label>
    <input id='profession' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("profession")} />
    <br/><br/>
    <label htmlFor='income_certificate'>Income Certficate</label>
    <input id='income_certificate' type='file' accept='file/pdf' readOnly={true} style={{height:"40px"}} className='form-control' {...register("income_certificate")} />
    <br/><br/>
    <label htmlFor='bank_name'>Bank Name</label>
    <input id='bank_name' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("bank_name")} />
    <br/><br/>
    <label htmlFor='current_account_no'>Current Account No</label>
    <input id='current_account_no' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("current_account_no")} />
    <br/><br/>
    <label htmlFor='passbook_copy'>Passbook Copy</label>
    <input id='passbook_copy' type='file' accept="file/pdf" className='form-control' readOnly={true} style={{height:"40px"}} {...register("passbook_copy")} />
    <br/><br/>
    <label htmlFor='ifsc_code'>IFSC Code</label>
    <input id='ifsc_code' type='text' className='form-control' readOnly={true} style={{height:"40px"}} {...register("ifsc_code")} />
    <br/><br/>
    </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default CheckGuarantorDetails