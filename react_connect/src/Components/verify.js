import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function verify(Component) {
    const nav = useNavigate()

    const token  = sessionStorage.getItem('access_token')
    function NewComponent(props){
        if(token){
           return  <Component isLogged={token}/>
        }
        else{
            <NavLink to={'/login'}/>
        }

    }


 return NewComponent
}

export default verify