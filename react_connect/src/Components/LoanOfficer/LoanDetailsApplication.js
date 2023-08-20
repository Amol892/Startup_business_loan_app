import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

function LoanDetailsApplication() {
    const {register, handleSubmit} = useForm();
    async function saveData(data){
      data.sanction_letter = data.sanction_letter[0]
      const result = await axios.post("http://127.0.0.1:8000/loan/",data,{
        headers:{"Content-Type":"multipart/form-data"}
    })
      console.log(result)
    }
  return (
    <>
    <br/><br/>
    <div className='container' style={{backgroundColor:"lightgray",  width:"1200px", height:"1300px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"red", textAlign:"center"}}>Loan Details Application</h1>
    <label htmlFor='application_id'>Application Id</label>
    <input id="application_id" type='text' className='form-control'  {...register("application")} />
    <br/><br/>
    <label htmlFor='loan_principal_amount'>Loan Principal Amount</label>
    <input id="loan_principal_amount" type='number' className='form-control' {...register("loan_principal_amount")} />
    <br/><br/>
    <label htmlFor='loan_tenure'>Loan Tenure</label>
    <input id="loan_tenure" type='number'  className='form-control' {...register("loan_tenure")} />
    <br/><br/>
    <label htmlFor='interest_rate'>Intrest Rate</label>
    <input id="interest_rate" type='number'  className='form-control' {...register("interest_rate")} />
    <br/><br/>
    
    <label htmlFor='total_amount_and_processing_fees'>Total Amount and Processing Fees</label>
    <input id="disbursed_to_account_no" type='number' className='form-control' {...register("total_amount_and_processing_fees")}/>
    <br/><br/>
    <label htmlFor='installment'>Installment</label>
    <input id="installment" type='number'  className='form-control' {...register("installment")} />
    <br/><br/>
    <label htmlFor='maturity_date'>Mutrity date</label>
    <input id="maturity_date" type='date'  className='form-control' {...register("maturity_date")} />
    <br/><br/>
    <label htmlFor='sanction_letter'>Sanction Latter</label>
    <input id="sanction_letter" type='file' accept='file/pdf' className='form-control' {...register("sanction_letter")} />
    <br/><br/>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" style={{width:"250px", textAlign:"center"}} {...register("status")}>
        <option value=""></option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
        <option value="Disbursed">Disbursed</option>
    </select>
    <br/><br/><br/>
    <label htmlFor='response_timestamp'>Timestamp</label>
    <input id="response_timestamp" type='datetime-local'  className='form-control' {...register("response_timestamp")} />
    <br/><br/>
    <label htmlFor='remark'>Remark</label>
    <input id="remark" type='text'  className='form-control' {...register("remark")} />
    <br/><br/>
    <center><input type='submit' value="Save" className='btn btn-success col-8'/></center>
    </form>
    </div>

    </>
  )
}

export default LoanDetailsApplication