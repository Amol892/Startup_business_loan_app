import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

function Admin_Dashboard() {
    const[users,setUsers]=useState([])
    const  [status1,setStatus]=useState('all')
    const data = {}
    async function fetchData(data){
        data = {'status' : data}
        console.log(data)
        await axios.post('http://localhost:8000/admin_app/fetch/',data).then(response=>{
            setUsers(response.data)
            console.log(response.data)
        })
        
    }

    
  return (
   
    <>
    
        <button onClick={(e)=>fetchData(e.target.value)} value='all' className="btn btn-warning">ALL</button>
        <div style={{float: 'right'}}>
        <button onClick={(e)=>fetchData(e.target.value)} value='Pending' className="btn btn-success">Pending status</button>
        <button onClick={(e)=>fetchData(e.target.value)} value='Apporve' className="btn btn-warning">Approved status</button>
        <button onClick={(e)=>fetchData(e.target.value)} value='Rejected' className="btn btn-danger">Rejected status</button>
    </div>
    <br/>
    <br/>
    <table className='table table-dark'>
        <thead>
            <tr>
                <th>User</th>
                <th>Username</th>
                
                <th>Type of Employement</th>
                
                <th>business_type</th>
             
                <th>annual_turnover</th>
    
                
                <th>status</th>
                
                <th>remark</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map(obj=>{
                    return(
                        <tr>
                            <td>{obj.id}</td>
                            <td>{obj.user.get_first_name}</td>
                            
                            <td>{obj.type_of_employment}</td>
                            
                            <td>{obj.business_type}</td>
                            
                            
                            <td>{obj.expected_average_annual_turnover}</td>
                           
                            
                            <td><NavLink to={`/check_user${obj.id}`}>{obj.status}</NavLink></td>
                            <td>{obj.remark}</td>
                            <td>{obj.application_timestamp}</td>
                            
                            
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
    
    </>
  )
}

export default Admin_Dashboard