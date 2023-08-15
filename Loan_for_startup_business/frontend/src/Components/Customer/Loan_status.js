import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function Loan_status() {

    const {register,handleSubmit}=useForm()
    const [message, setMessage] = useState([]);
    
    
    
    async function saveData(data){
        await axios.post('http://localhost:8000/customer/enquiry_status/',data).then(response=>{
            
                    setMessage(response.data[0].status)
                    console.group(response.data[0].status)
               }).catch(error=>{
                
                setMessage(error.response.data.message)
               })
        
    }

  return (
    <>
        <hr style={{color:'white'}}/>
        <div className='container' style={{width:700,backgroundColor:'#b0e0e6',borderRadius:30,marginTop:50,marginLeft:600,padding:40}}>
            <center style={{color:'#800080'}}>
            <h1>Check Loan Application status</h1>
            
            </center><hr/>
            <form onSubmit={handleSubmit(saveData)}>

                <label htmlFor='em'><b>Enter Email</b></label>
                <input type='email' id='em' className='form-control' placeholder='Enter Email' {...register('email')}/><br/><hr/>
                <center style={{color:'#191970'}}><h1>{message}</h1></center><br/><hr/>
                <input type='submit' value='Check' className='btn btn-success col-12'/><br/><br/>
                
            </form>
        </div>
    
    </>
  )
}

export default Loan_status