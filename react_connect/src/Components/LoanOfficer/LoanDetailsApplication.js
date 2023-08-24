import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

function LoanDetailsApplication() {
    const {register,formState:{errors}, handleSubmit} = useForm();
    async function saveData(data){
      data.sanction_letter = data.sanction_letter[0]
      const result = await axios.post("http://127.0.0.1:8000/loan/",data,{
        headers:{"Content-Type":"multipart/form-data"}
    })
      console.log(result)
    }
  return (
    <>
    <div style={{backgroundColor:"#3d3840"}}>
    <br/><br/>

    <div className='container' style={{width:"700px", color:"white"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"white", textAlign:"center"}}><b>Loan Details Application</b></h1>

    <div>
    <label htmlFor='application_id'>Application Id</label>
    <input id="application_id" type='number' className='form-control' placeholder='Enter application ID here' style={{height:"40px"}} {...register("application", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Application id should not be less than one"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.application && errors.application.message }
                </p>
    </div>

    <div>
    <label htmlFor='loan_principal_amount'>Loan Principal Amount</label>
    <input id="loan_principal_amount" type='number' className='form-control'placeholder='Enter loan principal amount' style={{height:"40px"}} {...register("loan_principal_amount", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"loan principal amount should not be less than 1"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.loan_principal_amount && errors.loan_principal_amount.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='loan_tenure'>Loan Tenure</label>
    <input id="loan_tenure" type='number'  className='form-control'placeholder='Enter loan tenure here' style={{height:"40px"}} {...register("loan_tenure", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"loan tenure  should not be less than 1"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.loan_tenure && errors.loan_tenure.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='interest_rate'>Intrest Rate</label>
    <input id="interest_rate" type='number'  className='form-control' placeholder='Enter interest rate here' style={{height:"40px"}} {...register("interest_rate", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"intrest should not be less than 1"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.interest_rate && errors.interest_rate.message }
                </p>
    
    </div>
    
    <div>
    <label htmlFor='total_amount_and_processing_fees'>Total Amount and Processing Fees</label>
    <input id="disbursed_to_account_no" type='number' className='form-control' placeholder='Enter total amount and processing fees' style={{height:"40px"}} {...register("total_amount_and_processing_fees", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Total amount and processing fees  should not be less than 1"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.total_amount_and_processing_fees && errors.total_amount_and_processing_fees.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='installment'>Installment</label>
    <input id="installment" type='number'  className='form-control' placeholder='Enter your installement' style={{height:"40px"}} {...register("installment", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Installment shuld not be less than 1"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.installment && errors.installment.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='maturity_date'>Maturity date</label>
    <input id="maturity_date" type='date'  className='form-control' placeholder='Enter maturity date 'style={{height:"40px"}} {...register("maturity_date", 
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.maturity_date && errors.maturity_date.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='sanction_letter'>Sanction Letter</label>
    <input id="sanction_letter" type='file' accept='file/pdf' style={{height:"40px"}} className='form-control' {...register("sanction_letter", 
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.sanction_letter && errors.sanction_letter.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" style={{width:"250px",height:"30px", textAlign:"center"}} {...register("status", 
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} >
                
        <option value="">select</option>
        <option value="Apporve">Apporve</option>
        <p style={{color:"red"}}>
                    { errors.status && errors.status.message }
        </p>
    </select>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='response_timestamp'>Timestamp</label>
    <input id="response_timestamp" type='datetime-local' style={{height:"40px"}}  className='form-control' {...register("response_timestamp", 
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.response_timestamp && errors.response_timestamp.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='remark'>Remark</label>
    <input id="remark" type='text'  className='form-control' placeholder='Enter remark here' style={{height:"40px"}} {...register("remark", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                minLength:{
                    value:3,
                    message:"Remark can not less than 3 character"
                },
                maxLength:{
                    value:50,
                    message:"Remark can not greater than 20 character"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.remark && errors.remark.message }
                </p>
    
    </div>

    <div>
    <center><input type='submit' value="Save" className='btn2 col-8'/></center>
    </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default LoanDetailsApplication