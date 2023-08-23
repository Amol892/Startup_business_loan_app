import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Loandata from './Loandata';
import EMIHistroy from './EMIHistroy';
import PayEmi from './PayEmi';
import CustProfile from './CustProfile';


function CustomerDashboard({userEmail}) {

    const [message, setMessage] = useState(' ');
    const [error,setError]=useState([])
    const email = userEmail
    const navigate = useNavigate()
    const [userData,setUserData]=useState([])
    const [PageResp,setPageResp] = useState([])
    const access = sessionStorage.getItem('access')
    console.log(userData)
    let Page;
    if(PageResp === 'loandata'){
      Page = <Loandata userData={userData}/>
      
    }else if(PageResp === 'emihistory'){
      Page = <EMIHistroy userData={userData}/>
    }else if(PageResp === 'payemi'){
      Page = <PayEmi userData={userData}/>
    }else{
      Page = <CustProfile/>
    }
    
    
    async function fetchData(data){
        console.log(data)
        
        await axios.get(`http://localhost:8000/customer/loandata/${email}/`,
            {headers:{'Content-Type':'multipart/form-data',"Authorization":'Bearer' + " " + access}
        }
        ).then(response =>{
            setUserData(response.data)
            console.log(response.data)
            setMessage(response.data.message)
            setPageResp(data)
        }
        ).catch(error=>{
          setError(error.response.data)
        })
        
      }

      async function fetchDataEMI(data){
        console.log(data)
        
        await axios.get(`http://localhost:8000/customer/installmentdata/${email}/`,
          {headers:{'Content-Type':'multipart/form-data',"Authorization":'Bearer' + " " + access}}
        ).then(response =>{
            setUserData(response.data)
            console.log(response.data)
            setMessage(response.data.message)
            setPageResp(data)
        }
        ).catch(error=>{
          setError(error.response.data)
        })
        
      }

      async function fetchDataEMIPay(data){
        console.log(data)
        
        await axios.get(`http://localhost:8000/customer/EMIPayment/${email}/`,
        {headers:{'Content-Type':'multipart/form-data',"Authorization":'Bearer' + " " + access}}
        ).then(response =>{
            setUserData(response.data)
            console.log(response.data)
            setMessage(response.data.message)
            setPageResp(data)
        }
        ).catch(error=>{
          setError(error.response.data)
        })
        
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
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>{fetchData(e.target.value)}} value='loandata' className="btn btn-info">Loan details</button>
                </li><br/>
                
                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>{fetchDataEMI(e.target.value)}} value='emihistory'  className="btn btn-secondary">EMI Histroy</button>
                </li><br/>

                <li>
                <button style={{width:300,padding:10,fontSize:20,fontWeight:'bold'}} onClick={(e)=>{fetchDataEMIPay(e.target.value)}} value='payemi' className="btn btn-success">EMI Payment</button>
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

export default CustomerDashboard