import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'



function Application() {
  const [user,setuser]=useState([]);
  async function fetchData(){

    const result=await axios.get('http://localhost:8000/document_verification/applications/')
    setuser(result.data);
  }
  useEffect(()=>{fetchData()},[]);
  return (
   <>
   
   <table class='table table-dark table-striped'>
    <thead>
      <tr>
        <th>Serial Number</th>
        <th>Applicants</th>
      </tr>
    </thead>
    <tbody>
      {user.map(obj=>{
        return(
          <tr>
            <td>{obj.user}</td>

          </tr>

        )
      })
      
      }
    </tbody>
   </table>
   </>
  )
}

export default Application