import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function CheckDetails() {

    const {register, formState:{errors}, handleSubmit} = useForm();
    const nav = useNavigate();

    async function navigateData(data){
        const application_id = sessionStorage.setItem("id", data.application_id);
        const type_deatils = sessionStorage.setItem("type", data.type_deatils);
        nav("/check_type_details")
    }

  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"700px"}}>
    <br/><br/>
    <div className='container' style={{width:"500px", height:"600px", backgroundColor:""}}>
        <br/>
        <center><h1 style={{color:"white"}}><b>Check Details</b></h1></center><br/>
        <form onSubmit={handleSubmit(navigateData)}>
            
            <center>
            <div>    
            <label htmlFor='application_id' style={{color:"#e8e8be"}}><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='number' id='application_id' className='form-control' placeholder='Enter application ID here' style={{textAlign:"center", width:"400px", height:"40px"}} {...register("application_id", 
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
            <center><label htmlFor='ex' style={{color:"#e8e8be"}}><h2 ><b>Check Details</b></h2></label></center><br/><br/>
            <center><select id="ex" style={{width:"300px", height:"30px", textAlign:"center"}}  {...register('type_deatils',
                {
                    required:{
                        value: true,
                        message: "This field is required"
                    }
                })}>
                <option value="">Select</option>
                <option value="application_details" >Application Details</option>
                <option value="gaurantor_details" >Gauranter Deatils</option>
                <option  value="document_details" >Document Deatils</option>
                <option value="document_details" >Bank Details</option>
                <p style={{color:"red"}}>
                    { errors.type_deatils && errors.type_deatils.message }
                </p>
            </select></center><br/><br/>
            </div>


            <input type='submit' value="Search" className='btn2 col-9' />
            </center>
        </form>
    </div><br/><br/>
    </div>
    </>
  )
}

export default CheckDetails