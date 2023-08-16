import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

function CustomerDashboard({userEmail}) {
    const email = userEmail

    const [users,setUser]=useState([])
    console.log(email)
    
    async function fetchData(){
        await axios.get(`http://localhost:8000/customer/loandata/${email}/`).then(response =>{
            setUser(response.data)
        }
        )
      }
  return (
    <>
        <hr style={{color:'white'}}/>
        <div>
        <nav className="navbar navbar-light bg-light">
          <b style={{fontSize:40, marginLeft:20}}>Welcome {email} </b>
        </nav>
        </div>
        <div style={{ display: 'flex'}}>
          <div className ="col-2" style={{ backgroundColor:'white',borderRadius:20,marginTop:10,padding:10,height:1000}} >
              <ul className ="nav navbar-nav">
                <li>
                <NavLink><button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={()=>{fetchData()}} className="btn btn-info">Loan details</button></NavLink>
                </li><br/>
                
                <li>
                <NavLink><button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}}   className="btn btn-secondary">EMI Histroy</button></NavLink>
                </li><br/>

                <li>
                <NavLink><button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}}  className="btn btn-success">Pay EMI</button></NavLink>
                </li><br/>
                
                
              </ul>
            </div>
        <div className='col-10' style={{border:2,padding:30}}>
          <div className='row'>
            
          </div>
        </div>
        </div>
    </>
  )
}

export default CustomerDashboard