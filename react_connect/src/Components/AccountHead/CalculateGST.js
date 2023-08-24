import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function CalculateGST() {
    const {register, formState:{errors}, handleSubmit} = useForm();
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
    <div style={{backgroundColor:"#3d3840", height:"700px"}}> 
    <br/><br/>
    <div className='container' style={{width:"500px", height:"600px"}}><br/>
        <center><h1 style={{color:"white"}}><b>Calculate GST</b></h1></center><br/>
        <form onSubmit={handleSubmit(checkGST)}>
            
            <center>
            <div style={{color:'#e8e8be'}}>     
            <label htmlFor='amount'><h3><b>Amount</b></h3></label><br/><br/>
            <input type='number' className='form-control' placeholder='Enter amount here' style={{textAlign:"center"}} {...register("amount", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:1,
                    message:"Amount Should not be less than  1"
                }
              })}/>
              <p style={{color:"red"}}>
                  { errors.amount && errors.amount.message }
              </p>
                    
            </div>

            <div style={{color:'#e8e8be'}}>    
            <label htmlFor='rate'><h3><b>GST Rate</b></h3></label><br/><br/>
            <input type='number' className='form-control' placeholder='Enter intrest rate here' style={{textAlign:"center"}} {...register("rate", 
                {required:{
                    value: true,
                    message: "This field is required"
                },
                min:{
                    value:0,
                    message:"Interst Rate should not less than zero"
                }
            })}/>
            <p style={{color:"red"}}>
                { errors.amount && errors.amount.message }
            </p>
                    <br/>
            </div>

            <input type='submit' value="Check" className='btn2 col-10'/>
            <br/><br/>
            <label htmlFor='gst' style={{color:'#e8e8be'}}><h3><b>GST Amount</b></h3></label><br/><br/>
            <h2 style={{color:"#e9f5eb"}}><b>Rs.  {gst_amount}</b></h2>
            </center>
        </form>
    </div>
    </div>
    </>
  )
}

export default CalculateGST