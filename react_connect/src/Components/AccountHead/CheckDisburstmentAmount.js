import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';

function CheckDisburstmentAmount() {
    const {register, handleSubmit} = useForm();
    //const {applicatinId} = useParams();
    const nav = useNavigate();
    const [disursement_amount, setAmoumt] = useState()


    async function getAmount(data){
        console.log(data.application)
        const result = await axios.get(`http://127.0.0.1:8000/loan_details/${data.application}`);
        const resp = await axios.get(`http://127.0.0.1:8000/disbursement_details/${result.data.id}`);
        setAmoumt(resp.data.net_disbursed_amount)
        console.log(result.data)
        //console.log(result.data.id)
        console.log(resp.data)
    }


    useEffect(()=>{
    },[])

  return (
    <>
    <br/><br/>
    <div className='container' style={{width:"600px", height:"500px", backgroundColor:"lightgray"}}>
        <br/>
        <center><h1 style={{color:"rebeccapurple"}}><b>Check Disbursed Amount</b></h1></center><br/>
        <form onSubmit={handleSubmit(getAmount)}>

            <center>
                <div>
                <label htmlFor='application_id'><h2><b>Enter Application Id</b></h2></label><br/><br/>
                <input type='text' id='application_id' className='form-control' {...register("application")}/><br/><br/>
                </div>
                <input type='submit' value="Check Amount" className='btn btn-success col-9' /><br/><br/><br/>
                <label htmlFor='gst'><h3><b>Disbursement Amount</b></h3></label><br/><br/>
                <h2 style={{color:"red"}}><b>{disursement_amount}</b></h2>
            </center>
        </form>
    </div><br/><br/>
    </>
  )
}

export default CheckDisburstmentAmount