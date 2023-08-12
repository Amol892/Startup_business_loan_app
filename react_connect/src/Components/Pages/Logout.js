import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function Logout() {
    const nav = useNavigate();
    useEffect(()=>{
        localStorage.clear();
        nav("/login")
    },[])
  return (
    <>
    
    </>
  )
}

export default Logout