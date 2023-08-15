import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function CalculateGST() {
    const {register, handleSubmit} = useForm();
    const [gst_amount, SetGSTamount] = useState();

    async function checkGST(data){
        var temp = 0;
        console.log(data)
        temp = data.amount*(data.rate/100)
        console.log(temp)
        SetGSTamount(temp)
    }
  return (
    <>
    <br/><br/>
    <div className='container' style={{width:"500px", height:"600px", backgroundColor:"lightgray"}}><br/>
        <center><h1 style={{color:"purple"}}><b>Calculate GST</b></h1></center><br/>
        <form onSubmit={handleSubmit(checkGST)}>
            
            <center>
            <div>    
            <label htmlFor='amount'><h3><b>Amount</b></h3></label><br/><br/>
            <input type='number' className='form-control' {...register("amount")} />
            <br/><br/>
            </div>
            <div>    
            <label htmlFor='rate'><h3><b>GST Rate</b></h3></label><br/><br/>
            <input type='rate' className='form-control' {...register("rate")} />
            <br/><br/>
            </div>
            <input type='submit' value="Check" className='btn btn-success col-10'/>
            <br/><br/>
            <label htmlFor='gst'><h3><b>GST Amount</b></h3></label><br/><br/>
            <h2 style={{color:"red"}}><b>{gst_amount}</b></h2>
            </center>
        </form>
    </div>
    </>
  )
}

export default CalculateGST