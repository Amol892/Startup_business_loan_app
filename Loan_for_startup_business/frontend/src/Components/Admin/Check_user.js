import React, { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios';

function Check_user() {
  const {userId}=useParams();

  const {register,handleSubmit,setValue}=useForm();
  const navigate=useNavigate()
  async function fetchData(){
    const result=await axios.get(`http://localhost:8000/admin_app/fetch/${userId}`)
    setValue('loan',result.data.loan)
    setValue('remaining_ammount',result.data.remaining_ammount)
    setValue('installment_no',result.data.installment_no)
    setValue('monthly_installment_no',result.data.monthly_installment_no)
    setValue('installment_expected_date',result.data.installment_expected_date)
    setValue('installment_paid_date',result.data.installment_paid_date)
  }
  async function checkData(data){
    await axios.put(`http://localhost:8000/admin_app/fetch/${userId}/`,data)
    navigate('/admin_dashboard')
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
 
    <>
    <div className='container'>
    <center><h1><b><i>User check Form</i></b></h1></center>
    <form onSubmit={handleSubmit(checkData)}>
      <label htmlFor='loan'>Loan</label>
      <input type='number' id='loan' className='form-control' {...register('loan')}/>
      <br/>
      <br/>

      <label htmlFor='rm'>Remaining Ammout</label>
      <input type='text' id='rm' className='form-control' {...register(' remaining_amount')}/>
      <br/>
      <br/>

      <label htmlFor='in'>Installment No</label>
      <input type='number' id='in' className='form-control' {...register('installment_no')}/>
      <br/>
      <br/>

      <label htmlFor='mi'>Monthly Installment No</label>
      <input type='number' id='mi' className='form-control' {...register('monthly_installment_no')}/>
      <br/>
      <br/>

      <label htmlFor='id'>Installment Expected Date</label>
      <input type='date' id='id' className='form-control' {...register('installment_expected_date')}/>
      <br/>
      <br/>

      <label htmlFor='ipd'>Installment Paid Date</label>
      <input type='date' id='ipd' className='form-control' {...register('installment_paid_date')}/>
      <br/>
      <br/>

      <label htmlFor='st'>Status</label>
      <input type='text' id='st' className='form-control' {...register('status')}/>
      <br/>
      <br/>

      <button type='submit' className='btn btn-warning'>Check</button>
      <input type='reset' className='btn btn-success'/>


    
    </form>
   </div>
    
    
    </>
  )
}

export default Check_user