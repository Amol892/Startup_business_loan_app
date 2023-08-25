
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomerCard from './CustomerCard'
import Info from '../Admin/Info'
function AHDashboard() {
  const access = sessionStorage.getItem('access')
  const [PageResp,setPageResp] = useState([])
  const navigate = useNavigate()
  const[users,setUsers]=useState([])

  let Page; 
    if(PageResp === 'customer_list'){
      Page = <CustomerCard users={users}/>
    }else{
      Page = <Info/>
    }

  async function fetchData(data){
    data = {'status' : data}
    console.log(data)
    await axios.post('http://localhost:8000/admin_app/allapplications/',data,{
        headers:{'Content-Type':'multipart/form-data',
                  "Authorization":'Bearer' + " " + access
                }
    }).then(response=>{
        setPageResp('customer_list')
        setUsers(response.data)
        console.log(response.data)
    })
    
}

  return (
    <>
      <hr style={{color:'white'}}/>
        <div>
        <nav className="navbar navbar-light bg-light">
          <b style={{fontSize:40, marginLeft:20}}>Account Head dashboard</b>
          
          
        </nav>
        </div>
        <div style={{ display: 'flex'}}>
          <div className ="col-2" style={{ backgroundColor:'white',borderRadius:20,marginTop:10,padding:10,height:1000}} >
              <ul className ="nav navbar-nav">
              

                <li className ="nav-item">
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Apporve' className="btn btn-info">Approved Applications</button>
                </li><br/>

                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Disbursed' className="btn btn-success">Disbursed Applications</button>
                </li><br/>
                
                <li className ="nav-item">
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Rejected' className="btn btn-danger">Rejected Applications</button>
                </li><br/>
              </ul> 
            </div>
        <div className='col-10' style={{border:2,padding:30}}>
          <div className='row'>
            
            {Page}
            
            

          </div>
        </div>
        </div>
    
    </>
  )
}

export default AHDashboard