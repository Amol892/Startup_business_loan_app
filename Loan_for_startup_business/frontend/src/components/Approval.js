import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Approval() {
    const {register,handleSubmit,setValue}=useForm()
    const [user,setuser]=useState()
    const {userId}=useParams()
    const navigate=useNavigate()
    

    async function fetchData(){

        const result = await axios.get(`http://localhost:8000/document_verification/documents/${userId}/`)
        setValue('status',result.data.status)
        setValue('remark',result.data.remark)
      
      }

      function changestatus(data){
        axios.patch(`http://localhost:8000/document_verification/documents/${userId}/`,data)
        navigate('/Applications')
        }



      useEffect(()=>{fetchData()},[])
  return (
    <>
    <center><div style={{color:'green'}}>Document Approval Page</div></center>
    <form onSubmit={handleSubmit(changestatus)}>
            <label htmlFor='ap'>Application Status</label>
          
            <label htmlFor='rm'>remark</label>
            <input type='text' id='rm' className='form-control' {...register('remark')}/>
            <button className='btn btn-success col-5' type='submit'>Submit</button>
            <input type='Reset' className='btn btn-warning col-5' name='reset' />

    </form>
   


    

    </>
  )
}

export default Approval