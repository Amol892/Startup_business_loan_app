import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CheckCibil() {

    const nav = useNavigate();

    function cibilCheck(){
      nav("/https://creditreport.paisabazaar.com/credit-report/apply?utm_source=Admitad&utm_medium=emailer_new&utm_term=2085116__&admitad_uid=bf34b9df8f8665d1521c168eadc619af&utm_campaign=credit_score_cpm_2085116__")
    
    }
    useEffect(()=>{cibilCheck();})
  return (
    <></>
  )
}

export default CheckCibil