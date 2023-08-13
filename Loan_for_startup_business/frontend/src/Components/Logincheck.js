import React from 'react'
import { Navigate } from 'react-router-dom'

function LoginCheck(OriginalComponent) {
    const isLoggedIn = sessionStorage.getItem('access')
    function NewComponent(props){
        if(isLoggedIn){
            return <OriginalComponent isLoggedIn={isLoggedIn}/>
        }
        else
        {
            return <Navigate to='/login'/>
        }
    }
  return NewComponent
}

export default LoginCheck