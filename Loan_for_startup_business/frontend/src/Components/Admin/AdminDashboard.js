import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import CustomerCard from './CustomerCard'
import QuaterlyReport from './QuaterlyReport'
import MACReport from './MACReport'
import Info from './Info'

function AdminDashboard() {
  const [PageResp,setPageResp] = useState([])
  const navigate = useNavigate()
  const[users,setUsers]=useState([])
  const[monthly,setMonthly]=useState([])
  const[quaterly,setQuaterly]=useState([])
  const data = {}
  const access = sessionStorage.getItem('access')
  console.log(monthly)
  console.log(quaterly)
  let Page;
    if(PageResp === 'customer_list'){
      Page = <CustomerCard users={users}/>
    }else if (PageResp === 'monthly_data'){
      Page = <MACReport monthly={monthly}/>
    }else if (PageResp === 'quaterly_data'){
      console.log(quaterly)
      Page = <QuaterlyReport quaterly={quaterly}/>
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

  async function fetchDataM(data){
    console.log(data)
    await axios.post('http://localhost:8000/admin_app/mqareport/',data,
        {headers:{'Content-Type':'multipart/form-data', "Authorization":'Bearer' + " " + access}}
        ).then(response=>{
            setPageResp('monthly_data')
            setMonthly(response.data)
            console.log(response.data)
        }).catch(error=>{
          
        })
        
      }

  

  async function fetchDataQ(){
  
    await axios.get('http://localhost:8000/admin_app/mqareport/',
      {headers:{'Content-Type':'multipart/form-data',
      "Authorization":'Bearer' + " " + access}}
    ).then(response=>{
            setPageResp('quaterly_data')
            setQuaterly(response.data)
            
            console.log(response.data)
        }).catch(error=>{

        })
    }
  return (
    <>
      <hr style={{color:'white'}}/>
        <div>
        <nav className="navbar navbar-light bg-light">
          <b style={{fontSize:40, marginLeft:20}}>Admin dashboard</b>
          
          
        </nav>
        </div>
        <div style={{ display: 'flex'}}>
          <div className ="col-2" style={{ backgroundColor:'white',borderRadius:20,marginTop:10,padding:10,height:1000}} >
              <ul className ="nav navbar-nav">
                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold',borderRadius:10,backgroundColor:'peru'}} value = {2023} onClick={(e)=>fetchDataM(e.target.value)}  >Monthly Reports</button>
                </li><br/>
                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold',borderRadius:10,backgroundColor:'springgreen'}} onClick={()=>fetchDataQ()}  >Quaterly Reports</button>
                </li><br/>
                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='all' className="btn btn-secondary">All Applications</button>
                </li><br/>
                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Disbursed' className="btn btn-success">Disbursed Applications</button>
                </li><br/>
                <li className ="nav-item">
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Apporve' className="btn btn-info">Approved Applications</button>
                </li><br/>
                <li className ="nav-item">
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>fetchData(e.target.value)} value='Pending' className="btn btn-warning">Pending Applications</button>
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

export default AdminDashboard