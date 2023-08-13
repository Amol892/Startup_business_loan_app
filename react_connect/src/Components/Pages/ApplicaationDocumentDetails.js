import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

function ApplicaationDocumentDetails() {

    const {register, handleSubmit} = useForm();
    async function getDocument(data){
        await axios.get("http://127.0.0.1:8000/document/")
    }
  return (
    <>
    <br/><br/>
    <div className='container' style={{width:"500px", height:"350px", backgroundColor:"lightgray"}}>
        <br/>
        <center><h1 style={{color:"rebeccapurple"}}><b>Customer Documents</b></h1></center><br/>
        <form onSubmit={handleSubmit(getDocument)}>
            <center><label htmlFor='application_id'><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='text' id='application_id' className='form-control' {...register("b")}/><br/><br/>
            <input type='submit' value="Search" className='btn btn-success col-9' />
            </center>
        </form>
    </div><br/><br/>
    <div className='container'>
    <center><h1 style={{color:"rebeccapurple"}}><b>Application Document</b></h1></center>
    </div>
    </>
  )
}

export default ApplicaationDocumentDetails