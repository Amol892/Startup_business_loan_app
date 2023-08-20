import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CheckTypeDetails() {

    const nav = useNavigate();

    async function checkData(){
        
        const get_type = sessionStorage.getItem("type")
        console.log(get_type)
        if (get_type === "application_details"){
            nav("/check_application_details")
        }else if (get_type === "gaurantor_details"){
            nav("/check_guarantor_details")
        }else if (get_type === "document_details"){
            nav("/check_document_details")
        }else if (get_type === "bank_details"){
            nav("/check_customer_bank_details")
        }

    }
    
    useEffect(()=>{
        checkData();
    },[])
  return (
    <>
    
    </>
  )
}

export default CheckTypeDetails