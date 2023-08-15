import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom';

function LoanApplication() {

    const {register,formState:{errors},handleSubmit, watch}=useForm({mode:'all'})
    const [message, setMessage] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate()

    async function saveData(data){
        
    
            
            await axios.post('http://localhost:8000/admin_app/family/',data).then(response=>{
                console.log(response.data)
                setMessage(response.data.message)
                navigate('/loanapplication')
            }).catch(error=>{
                console.log(error.response.data)
                setError(error.response.data)
            })
        }
  return (
    <>
        <div style={{ display: 'flex'}}>
        <div className ="col-2" style={{ marginTop:100}} >
            <ul className ="nav navbar-nav">
            <li>
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'aquamarine',fontWeight: 'bold' }} className ="btn btn col-10" to="/createuser"> Create User </NavLink>
            </li>
            <li className ="nav-item">
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'coral',fontWeight: 'bold'}} className ="btn btn col-10" to="/loanapplication"> Loan Application </NavLink>
            </li>
            <li className ="nav-item">
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'darkgoldenrod',fontWeight: 'bold' }} className ="btn btn col-10" to="/family"> Family details </NavLink>
            </li>
            <li className ="nav-item">
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'slateblue',fontWeight: 'bold' }} className ="btn btn col-10" to="/bank"> Bank details </NavLink>
            </li>
            </ul>
            </div>



        <div className='col-12' style={{backgroundColor:'palegoldenrod',borderRadius:20,padding:40,width:1400}}>
                <center style={{color:'midnightblue'}}>
                <h1>Loan Application</h1>
                </center><hr/>              
                
                <form onSubmit={handleSubmit(saveData)}>

                <label htmlFor='fn'><b>First Name</b></label>
                    <input type='text' id='fn' className='form-control' placeholder='Enter First Name' {...register('first_name',{required : 'first_name is required'})}/><br/>
                    <p style={{'color':'red'}}>{errors.first_name && errors.first_name.message}</p>

                    <label htmlFor='ln'><b>Last Name</b></label>
                    <input type='text' id='ln' className='form-control' placeholder='Enter Last Name' {...register('last_name',{required : 'last_name is required'})}/><br/>
                    <p style={{'color':'red'}}>{errors.last_name && errors.last_name.message}</p>

                    
                    <hr/>
                    <center>
                    <input type='submit' value='Register' style={{padding:10,fontSize:20}} className='btn btn-success col-8'/><br/><br/>
                    </center>
                    
                </form>
            </div>
            </div>
    
    </>
  )
}

export default LoanApplication