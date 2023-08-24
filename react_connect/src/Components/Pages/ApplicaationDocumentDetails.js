import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate } from 'react-router-dom';

function ApplicaationDocumentDetails() {
    const {register,formState:{errors}, handleSubmit} = useForm();
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
    <div style={{backgroundColor:"#3d3840", height:"700px"}}>
    <div className='container' style={{width:"500px", height:"350px", paddingTop:"130px"}}>
        <br/>
        <center><h1 style={{color:"white"}}><b>Customer Documents</b></h1></center><br/>
        <form onSubmit={handleSubmit(getDocument)}>
            <center><label htmlFor='application_id' style={{color:"#e8dcd3"}}><h2><b>Enter Application Id</b></h2></label><br/><br/>
            <input type='number' id='application_id' className='form-control' placeholder='Enter Application ID here' style={{textAlign:"center"}} {...register("application",{
              required:{
                value:true,
                message:"Required please enter application Id"
              },
              min:{
                value:1,
                message:"Application Id should not less than 1"
              }
              
            })}/>
            <p style={{color:"red"}}>
                    { errors.application && errors.application.message }
            </p>
            <br/>
            <input type='submit' value="Search" className='btn2 col-9' />
            </center>
        </form>
    </div><br/><br/>
    </div>
    </>
  )
}

export default ApplicaationDocumentDetails