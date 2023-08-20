import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate } from 'react-router-dom';

function ApplicaationDocumentDetails() {
    const {register, handleSubmit} = useForm();
    const [doc, setDocument] = useState({})
    const [extra,setextra] = useState('')
    const nav = useNavigate();

    async function getDocument(data){
            const result = await axios.get(`http://127.0.0.1:8000/application_document_details/${data.application}`)
            setDocument(result.data.documents)
            const baseurl = "http://127.0.0.1:8000"
            setextra(baseurl)
            console.log(extra)
            nav(`/document_table/${data.application}/`)
    }
    
    useEffect(()=>{},[]);

  return (
    <>
    <br/><br/>
    <div className='container' style={{width:"500px", height:"350px", backgroundColor:"lightgray"}}>
        <br/>
        <center><h1 style={{color:"rebeccapurple"}}><b>Customer Documents</b></h1></center><br/>
        <form onSubmit={handleSubmit(getDocument)}>
            <center><label htmlFor='application_id'><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='text' id='application_id' className='form-control' {...register("application")}/><br/><br/>
            <input type='submit' value="Search" className='btn btn-success col-9' />
            </center>
        </form>
    </div><br/><br/>
    </>
  )
}

export default ApplicaationDocumentDetails