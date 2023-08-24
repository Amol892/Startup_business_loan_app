import axios from 'axios';
import React, { useEffect } from 'react'
import {useForm} from "react-hook-form";


function LoanAmountDisbursed() {
    const {register,formState:{errors}, handleSubmit, setValue} = useForm();

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
    <div style={{backgroundColor:"#3d3840", height:"1200px"}}>
    <br/><br/>
    <div className='container' style={{width:"700px", height:"850px"}}>
    <form onSubmit={handleSubmit(saveData)}>
    <h1 style={{color:"white", textAlign:"center"}}>Amount Disbursed</h1>
    <div style={{color:"white"}}>

    <div>
    <label htmlFor='loan'>Loan Id</label>
    <input id="loan" type='text' className='form-control' placeholder='Enter loan ID here' readOnly={true} style={{height:"40px"}} {...register("loan", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Loan Id not negative"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.loan && errors.loan.message }
                </p>
    
    </div>

    <div>
    <label htmlFor='insurance_doc'>Insurance Document</label>
    <input id="insurance_doc" type='file' accept='file/pdf' className='form-control' style={{height:"40px"}} {...register("insurance_doc", 
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.insurance_doc && errors.insurance_doc.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='payment_mode'>Paymemnt Mode</label>&nbsp;&nbsp;
    <select id="payment_mode" style={{width:"300px", textAlign:"center", height:"30px"}}  {...register("payment_mode", 
                {required:{
                    value: true,
                    message: "This field is required"
                }
                })} >
                <p style={{color:"red"}}>
                    { errors.payment_mode && errors.payment_mode.message }
                </p>
        <option value="">Select</option>
        <option value="neft">NEFT</option>
        <option value="rtgs">RTGS</option>
        <option value="imps">IMPS</option>
    </select>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='net_disbursed_amount'>Net Disbursed Amount</label>
    <input id="net_disbursed_amount" type='number' placeholder='Enter Net Disbursed amount'  className='form-control' style={{height:"40px"}} {...register("net_disbursed_amount", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Disburment amount should not be less than one"
                }
                })} />
                <p style={{color:"red"}}>
                    { errors.net_disbursed_amount && errors.net_disbursed_amount.message }
                </p>
    </div>

    <div>
    <label htmlFor='disbursed_to_account_no'>Loan Disbursed Account Number</label>
    <input id="disbursed_to_account_no" type='text' placeholder='Enter account no' readOnly={true} className='form-control' style={{height:"40px"}} {...register("disbursed_to_account_no", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
    
                })} />
                <p style={{color:"red"}}>
                    { errors.disbursed_to_account_no && errors.disbursed_to_account_no.message }
                </p>
    </div>

    <div>
    <label htmlFor='receipt_doc'>Receipt Document</label>
    <input id="receipt_doc" type='file' accept='file/pdf' className='form-control' style={{height:"40px"}} {...register("receipt_doc", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
    
                })} />
                <p style={{color:"red"}}>
                    { errors.receipt_doc && errors.receipt_doc.message }
                </p>
    <br/>
    </div>

    <div>
    <label htmlFor='status'>Status</label>&nbsp;&nbsp;
    <select id="status" style={{width:"300px", textAlign:"center", height:"30px"}} {...register("status", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
    
                })} >
                <p style={{color:"red"}}>
                    { errors.status && errors.status.message }
                </p>
        <option value="">Select</option>
        <option value="Disbursed">Disbursed</option>
    </select>
    <br/><br/>
    </div>

    <div>
    <label htmlFor='response_timestamp'>Timestamp</label>
    <input id="response_timestamp" type='datetime-local' style={{height:"40px"}} className='form-control' {...register("response_timestamp", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
    
                })} />
                <p style={{color:"red"}}>
                    { errors.response_timestamp && errors.response_timestamp.message }
                </p>
    <br/>
    </div>

    <div>
    <center><input type='submit' value="Disbursed" className='btn2 col-8'/></center>
    </div>
    </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default LoanAmountDisbursed