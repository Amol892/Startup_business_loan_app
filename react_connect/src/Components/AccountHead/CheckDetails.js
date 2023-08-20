import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function CheckDetails() {

    const {register, handleSubmit} = useForm();
    const nav = useNavigate();

    async function navigateData(data){
        const application_id = sessionStorage.setItem("id", data.application_id);
        const type_deatils = sessionStorage.setItem("type", data.type_deatils);
        nav("/check_type_details")
    }

  return (
    <>
    <br/><br/>
    <div className='container' style={{width:"500px", height:"600px", backgroundColor:"lightgray"}}>
        <br/>
        <center><h1 style={{color:"rebeccapurple"}}><b>Check Details</b></h1></center><br/>
        <form onSubmit={handleSubmit(navigateData)}>
            <center><label htmlFor='application_id'><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='text' id='application_id' className='form-control' {...register("application_id")}/><br/><br/>
            <center><label htmlFor='ex'><h2 ><b>Check Details</b></h2></label></center><br/><br/>
            <center><select id="ex"  {...register('type_deatils')}>
                <option value=""></option>
                <option value="application_details" >Application Details</option>
                <option value="gaurantor_details" >Gauranter Deatils</option>
                <option  value="document_details" >Document Deatils</option>
                <option value="document_details" >Bank Details</option>
            </select></center><br/><br/>
            <input type='submit' value="Search" className='btn btn-success col-9' />
            </center>
        </form>
    </div><br/><br/>
    
    </>
  )
}

export default CheckDetails