import axios from 'axios';
import React, { useEffect } from 'react'
import {useForm} from "react-hook-form";


function LoanAmountDisbursed() {
    const {register, handleSubmit, setValue} = useForm();

    async function getData(){
      const ac_no = sessionStorage.getItem("ac_no")
      console.log(ac_no)
      const loan_id = sessionStorage.getItem("loan_id")
      console.log(loan_id)
      setValue("loan", loan_id); setValue("disbursed_to_account_no", ac_no)
    }

    async function saveData(data){
      data.insurance_doc = data.insurance_doc[0];data.receipt_doc = data.receipt_doc[0]
      const result = await axios.post("http://127.0.0.1:8000/disbursement/",data,{
        headers:{"Content-Type":"multipart/form-data"}
    })
      console.log(result)

    }
  

    useEffect(()=>{getData();})
  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px", height:"850px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Amount Disbursed</h1>
    <label htmlFor='loan'>Loan Id</label>
    <input id="loan" type='text' className='form-control' readOnly={true} {...register("loan")} />
    <br/><br/>
    <label htmlFor='insurance_doc'>Insurance Document</label>
    <input id="insurance_doc" type='file' accept='file/pdf' className='form-control' {...register("insurance_doc")} />
    <br/><br/>
    <label htmlFor='payment_mode'>Paymemnt Mode</label>&nbsp;&nbsp;
    <select id="payment_mode" style={{width:"250px", textAlign:"center"}} {...register("payment_mode")}>
        <option value=""></option>
        <option value="neft">NEFT</option>
        <option value="rtgs">RTGS</option>
        <option value="imps">IMPS</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='net_disbursed_amount'>Net Disbursed Amount</label>
    <input id="net_disbursed_amount" type='number'  className='form-control' {...register("net_disbursed_amount")} />
    <br/><br/>
    <label htmlFor='disbursed_to_account_no'>Loan Disbursed Account Number</label>
    <input id="disbursed_to_account_no" type='text' readOnly={true} className='form-control' {...register("disbursed_to_account_no")}/>
    <br/><br/>
    <label htmlFor='receipt_doc'>Receipt Document</label>
    <input id="receipt_doc" type='file' accept='file/pdf' className='form-control' {...register("receipt_doc")} />
    <br/><br/>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" style={{width:"250px", textAlign:"center"}} {...register("status")}>
        <option value=""></option>
        <option value="Disbursed">Disbursed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='response_timestamp'>Timestamp</label>
    <input id="response_timestamp" type='datetime-local'  className='form-control' {...register("response_timestamp")} />
    <br/><br/>
    <center><input type='submit' value="Disbursed" className='btn btn-success col-8'/></center>
    </form>
    </div>

    </>
  )
}

export default LoanAmountDisbursed