import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CheckCibil() {

    const nav = useNavigate();

    function cibilCheck(){
      nav("/https://www.coacheasily.com/livemasterclass51737183")
    
    }
    useEffect(()=>{cibilCheck();})
  return (
    <></>
  )
}

export default CheckCibil