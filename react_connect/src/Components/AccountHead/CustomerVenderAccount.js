import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CustomerVenderAccount() {

    const nav = useNavigate()
    const [ac_no, setAccount] = useState({})
    const [loanid, setLoanid] = useState({})

    async function getAccount(){
        const get_applicationid = sessionStorage.getItem("id")
        console.log(get_applicationid)
        const get_account_type = sessionStorage.getItem("account_type")
        console.log(get_account_type)
        if (get_account_type === "customer"){
          console.log(get_account_type)
            const resp = await axios.get(`http://127.0.0.1:8000/application_details/${get_applicationid}`)
            const result = await axios.get(`http://127.0.0.1:8000/record/${resp.data.user}`)
            //const set_loan = sessionStorage.setItem("loan_id", resp.data.id)
            console.log(resp.data.user)
            console.log(result)

           // nav("/application")
        }else if (get_account_type === "vender"){
            const result = await axios.get(`http://127.0.0.1:8000/vendor_details/${get_applicationid}`)
            const resp = await axios.get(`http://127.0.0.1:8000/loan_details/${get_applicationid}`)
            const set_acno = sessionStorage.setItem("ac_no", result.data.current_account_no)
            const set_loan = sessionStorage.setItem("loan_id", resp.data.id)
            nav("/loan_amount_disbursed")
            
    }
    }
    

  useEffect(()=>{getAccount()},[])

  return (
    <></>
  )
}

export default CustomerVenderAccount