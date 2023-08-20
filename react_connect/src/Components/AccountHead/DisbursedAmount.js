import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

function DisbursedAmount() {

  const nav = useNavigate();
  const {register, handleSubmit} = useForm();

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
    <br/><br/>
    <div className='container' style={{width:"500px", height:"550px", backgroundColor:"lightgray"}}>
        <br/>
        <center><h1 style={{color:"rebeccapurple"}}><b>Disbursed Amount</b></h1></center><br/>
        <form onSubmit={handleSubmit(getBank)}>
            <center><label htmlFor='application_id'><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='text' id='application_id' style={{width:"400px", textAlign:"center"}} className='form-control' {...register("application_id")}/><br/><br/>
            <center><label htmlFor='ex'><h2 ><b>Select Account</b></h2></label></center><br/><br/>
            <center><select id="ex" style={{width:"250px", textAlign:"center"}} {...register('type_details')}>
                <option value=""></option>
                <option value="customer"><b>Customer</b></option>
                <option value="vender"><b>Vender</b></option>
            </select></center><br/><br/>
            <input type='submit' value="Search" className='btn btn-success col-9' />
            </center>
        </form>
    </div><br/><br/>
    </>
  )
}

export default DisbursedAmount