import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Document, page, pdfjs } from "react-pdf";
import { NavLink } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.87/pdf.js`;




function ApplicaationDocumentDetails() {
    const {register, handleSubmit} = useForm();
    const [doc, setDocument] = useState({})

    async function getDocument(data){
        //console.log(data.application)
        data.aadhar_card = data.aadhar_card;
            await axios.get(`http://127.0.0.1:8000/application_document_details/${data.application}`,{responseType:"blob", contentType:'application/pdf'}).then((obj)=>{
            const url = window.URL.createObjectURL(
                new Blob([obj.data.document]),
                console.log(obj.data)
              );
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute(
                'download',
                `FileName.pdf`,
              );
      
              // Append to html link element page
              document.body.appendChild(link);
      
              // Start download
              link.click()
              link.remove()
              URL.revokeObjectURL();
            })
        
    }
    
    useEffect(()=>{
    },[])

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
       <p><span>{doc.data}</span></p>
    </div><br/><br/>
    <div>
    <center><h1 style={{color:"rebeccapurple"}}><b>Application Document</b></h1></center>
    <br/><br/>
    <table className='table table-success table-striped' style={{textAlign:"center"}}>
        <thead>
            <tr>
                
                <th>Aadhar Card</th>
                <th>PAN Card</th>
                <th>Business Address Proof</th>
                <th>Electricity Bill</th>
                <th>MSME Certificate</th>
                <th>GST Ceritificate</th>
                <th>Udhyog Adhar Registration</th>
                <th>Business License</th>
                <th>Bussiness Plan Or Proposal</th>
                <th>Three Years ITR</th>
                <th>Collatrral Document</th>
                <th>Stamp Duty</th>
            </tr>
        </thead>
        <tbody className='table table-success table-striped' style={{textAlign:"center"}}>
            <tr>
            <td ><iframe file={doc.aadhar_card}/>
                </td>
            </tr>
            

            
        </tbody>
    </table>
    </div>


    </>
  )
}

export default ApplicaationDocumentDetails