import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

function DisbursedAmount() {

  const nav = useNavigate();
  const {register,formState:{errors}, handleSubmit} = useForm();

  async function getBank(data){
    const set_applicationid = sessionStorage.setItem("id",data.application_id)
    console.log(set_applicationid)
    const set_account_type = sessionStorage.setItem("account_type", data.type_details)
    console.log(set_account_type)
    nav("/checkCustomervender_account")
    }
    
  

  useEffect(()=>{})
  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"700px"}}>
    <br/><br/>
    <div className='container' style={{width:"500px", height:"550px"}}>
        <br/>
        <center><h1 style={{color:"white"}}><b>Disbursed Amount</b></h1></center><br/>
        <form onSubmit={handleSubmit(getBank)}>
            <center>

            <div>  
            <label htmlFor='application_id' style={{color:"#e8e8be"}}><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='text' id='application_id' placeholder='Enter application ID here' style={{width:"400px",height:"40px", textAlign:"center"}} className='form-control' {...register("application_id", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Appliaction Id not negative"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.application_id && errors.application_id.message }
                </p>
            </div>
            

            <div> 
            <center>
            <label htmlFor='ex' style={{color:"#e8e8be"}}><h2 ><b>Select Account</b></h2></label></center><br/><br/>
            <center>
              <select id="ex" style={{width:"300px",height:"30px", textAlign:"center"}} {...register('type_details', 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Appliaction Id not negative"
                }
                })} >
                <p style={{color:"red"}}>
                    { errors.type_details && errors.type_details.message }
                </p>
                <option value="">select</option>
                <option value="customer"><b>Customer</b></option>
                <option value="vender"><b>Vender</b></option>
            </select>
            </center>
            <br/><br/>
            </div>

            <input type='submit' value="Search" className='btn2 col-9' />
            </center>
        </form>
    </div>
    </div>
    </>
  )
}

export default DisbursedAmount