import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import G1 from '../Backgroundimage/G1.jpg'


function Login({setIsLoggedIn,setUserRole}) {

    const {register,handleSubmit}=useForm()
    const navigate = useNavigate()
    const [error, setError] = useState('');
    

        async function saveData(data){
            await axios.post('http://localhost:8000/admin_app/loginpage/',data).then(response=>{
                
                sessionStorage.setItem('access',response.data.access)  
                sessionStorage.setItem('role',response.data.redirectURL)   
                setError(response.data.message)
                const redirectURL = response.data.redirectURL
                setIsLoggedIn(sessionStorage.getItem('access'))
                setUserRole(sessionStorage.getItem('role'))
                navigate('/'+ redirectURL) ;
                   
            }).catch(error=>{
                
                setError(error.response.data.detail)
                   
            }
            )
           
          console.log(sessionStorage.getItem('access'))  
    }
   
  return (
   <>
        <hr style={{color:'white'}}/>
        <div style={{ display: 'flex'}}>
            <div className ="col-6" style={{ marginTop:30}} >
                <img src={G1} alt='not found' width={1300} height={800} style={{padding:30}}></img>

            </div>
            <div className='container' style={{backgroundColor:'thistle',borderRadius:20,padding:40,width:500,height:600,marginTop:120,marginLeft:350}}>
                <center style={{color:'midnightblue'}}>
                <h1>Welcome to TechGrow</h1>
                <h4>Grow your Business with TechGrow</h4><hr style={{color:'black'}}/>
                <h1 style={{color:'black'}}>Login</h1>
                {error && <h3>{error}</h3>}
                </center><hr/>
                
                            
                
                <form onSubmit={handleSubmit(saveData)}>

                    <label htmlFor='un'>Email id</label>
                    <input type='email' id='un' style={{padding:20}} placeholder='Enter user registered email id' className='form-control' {...register('email')}/><br/><br/>

                    <label htmlFor='pw'>Password</label>
                    <input type='password' id='pw' style={{padding:20}} placeholder='Enter user password' className='form-control' {...register('password')}/><br/><br/>

                    
                    <input type='submit' value='Login me' className='btn btn-success col-4'/><br/><br/>


                </form>
            </div>
            </div>
   
   </>
  )
}

export default Login