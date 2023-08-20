import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Logout({setToken, setEmail, setRole, }) {
    const nav = useNavigate();

    const {handleSubmit} = useForm();

    async function logOutUser(){
      sessionStorage.clear();
      
      nav("/login")
    }
    useEffect(()=>{},[])
  return (
    <>
    <form onSubmit={handleSubmit(logOutUser)}>
      <h>do you want logout</h>
      <input type='submit' value="yes"/>
    </form>
    </>
  )
}

export default Logout