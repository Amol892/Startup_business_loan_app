import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';



function Application() {
  const [users,setuser]=useState([]);

  
   async function fetchData(){

    const result=await axios.get('http://localhost:8000/document_verification/applications/')
    setuser(result.data);
  };
  useEffect(()=>{fetchData()},[]);

  return (
   <>
   
   <table class='table table-dark table-striped'>
    <thead>
      <tr>
        <th>Applications</th>
        <th>Documents</th>
      </tr>
    </thead>
    <tbody>
      {users.map(obj=>{
        return(
          <tr>
            <td>{obj.user.first_name} {obj.user.last_name}</td>
            <td> <NavLink to={`/Documents/${obj.id}/`}><button className='btn btn-success'>Documents</button></NavLink></td>
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