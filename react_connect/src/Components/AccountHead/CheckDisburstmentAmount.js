import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';

function CheckDisburstmentAmount() {
    const {register,formState:{errors}, handleSubmit} = useForm();
    //const {applicatinId} = useParams();
    const nav = useNavigate();
    const [disursement_amount, setAmoumt] = useState()
    const [err , setError] = useState("")


    async function getAmount(data){
        console.log(data.application)
        try{
            const result = await axios.get(`http://127.0.0.1:8000/loan_details/${data.application}`);
            const resp = await axios.get(`http://127.0.0.1:8000/disbursement_details/${result.data.id}`);
            setAmoumt(resp.data.net_disbursed_amount)
            console.log(result)
            console.log(result.data.id)
            console.log(resp)
            //console.log(result.response.data)
        }
        catch(error){
                const chetan = "Sorry No Details Found"
                setError(chetan)
                console.log(err)
                //alert("No details found")
        }
        
    }


    useEffect(()=>{
    },[])

  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"700px"}}>
    <br/><br/>
    <div className='container' style={{width:"600px", height:"500px"}}>
        <br/>
        <center><h1 style={{color:"white"}}><b>Check Disbursed Amount</b></h1></center><br/>
        <form onSubmit={handleSubmit(getAmount)}>

            <center>
                <div>
                <label htmlFor='application_id' style={{color:"#e8e8be"}}><h2><b>Enter Application Id</b></h2></label><br/><br/>
                <input type='number' id='application_id' className='form-control' placeholder='Enter Application Id here' style={{height:"40px",textAlign:"center", width:"400px"}} {...register("application", 
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
                    { errors.application && errors.application.message }
                    {err}
                </p><br/>
                </div>

                <input type='submit' value="Check Amount" className='btn2 col-7' /><br/><br/><br/>

                <label htmlFor='gst' style={{color:'#e8e8be'}}><h3><b>Disbursement Amount</b></h3></label><br/><br/>
                <h2 style={{color:"#e8e8be"}}><b>Rs. {disursement_amount}</b></h2>
            </center>
        </form>
    </div><br/><br/>
    </div>
    </>
  )
}

export default CheckDisburstmentAmount