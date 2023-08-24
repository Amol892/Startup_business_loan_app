import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function CheckDocumentdetails() {
    const [doc, setDocument] = useState({})
    const [extra,setextra] = useState('')

    async function getDocument(){

            const get_id = sessionStorage.getItem("id")
            console.log(get_id)
            const result = await axios.get(`http://127.0.0.1:8000/application_document_details/${get_id}`)
            setDocument(result.data.documents)
            const baseurl = "http://127.0.0.1:8000"
            setextra(baseurl)
            console.log(extra)
            
    }
    
    useEffect(()=>{
        getDocument();
    },[]);
  return (
    <>
     <div style={{backgroundColor:"#3d3840", height:"1800px"}}>
    <div style={{marginLeft:"10px", marginRight:"10px"}}>
    <center><h1 style={{color:"white", paddingTop:"100px"}}><b>Application Document</b></h1></center>
    <br/><br/>
    <div style={{marginLeft:"320px"}}>
    <div style={{width:"100px"}}>
    <table className="table table-dark table-striped" style={{textAlign:"center"}}>
        <thead>
            <tr>
                
                <th>Aadhar Card</th>
                <th>PAN Card</th>
                <th>Business Address Proof</th>
                <th>Electricity Bill</th>
                <th>MSME Certificate</th>
                <th>GST Ceritificate</th>
                </tr>
        </thead>
        <tbody>
        <tr>
                <td><NavLink to={extra+doc.aadhar_card}><button className='btn2 col-10' style={{height:"30", width:"30"}}>View</button></NavLink></td>
                <td><NavLink to={extra+doc.pan_card}><button className='btn2  col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.business_address_proff_or_copy_of_rent_agreement}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.electricity_bill}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.msme_certificate}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.gst_cerificate}><button className='btn2 col-10'>View</button></NavLink></td>
        </tr>
        </tbody>
        <br/><br/>
        <thead>
                <tr>
                <th>Udhyog Adhar Registration</th>
                <th>Business License</th>
                <th>Bussiness Plan Or Proposal</th>
                <th>Three Years ITR</th>
                <th>Collatrral Document</th>
                <th>Stamp Duty</th>
                </tr>
        </thead>
    
        <tbody className='table table-dark table-striped' style={{textAlign:"center"}}>
            
               <tr> 
                <td><NavLink to={extra+doc.udhyog_adhar_registration}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.business_lincense}><butto className='btn2 col-10'>View</butto></NavLink></td>
                <td><NavLink to={extra+doc.business_plan_or_proposal}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.three_year_itr_with_balance_sheet}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.collateral_document}><button className='btn2 col-10'>View</button></NavLink></td>
                <td><NavLink to={extra+doc.stamp_duty}><button className='btn2 col-10'>View</button></NavLink></td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    </>
    
  )
}

export default CheckDocumentdetails