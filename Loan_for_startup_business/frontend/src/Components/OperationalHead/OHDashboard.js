import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import CustomerCard from '../Admin/CustomerCard'

function OHDashboard() {

  const[users,setUsers]=useState([])
  
  const data = {}
  async function fetchData(data){
      data = {'status' : data}
      console.log(data)
      await axios.post('http://localhost:8000/admin_app/allapplications/',data,{
          headers:{'Content-Type':'multipart/form-data'}
      }).then(response=>{
          setUsers(response.data)
          console.log(response.data)
      })
      
  }
  return (
    <>
      <hr style={{color:'white'}}/>
        <div>
        <nav class="navbar navbar-light bg-light">
          <b style={{fontSize:40, marginLeft:20}}>Operational head dashboard</b>
        </nav>
        </div>
        <div style={{ display: 'flex'}}>
          <div className ="col-2" style={{ backgroundColor:'white',borderRadius:20,marginTop:10,padding:10,height:1000}} >
              <ul className ="nav navbar-nav">
                <li className ="nav-item">
                  <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Pending' className="btn btn-warning">Pending Applications</button>
                </li><br/>
 
              </ul>
            </div>
        <div className='col-10' style={{border:2,padding:30}}>
          <div className='row'>
            <CustomerCard users={users}/>
          </div>
        </div>
        </div>
    
    </>
  )
}

export default OHDashboard