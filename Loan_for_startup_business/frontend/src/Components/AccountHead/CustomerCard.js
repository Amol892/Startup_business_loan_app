import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

function CustomerCard({users}) {
    
        const navigate = useNavigate()
        const [message, setMessage] = useState('');
        const [error,setError]=useState([]);
        const access = sessionStorage.getItem('access');

        
          
       async function fetchInformation(data){
            await axios.get(`http://localhost:8000/disburstment/information/${data}/`,
                    {headers:{'Content-Type':'multipart/form-data',"Authorization":'Bearer' + " " + access}}
            ).then(response=>{
                const Info_data = response.data
                console.log(Info_data)
                setMessage(response.data.message)
                navigate('/information',{state:{user: Info_data}})
            }).catch(error=>{
                setError(error.response.data)
                
                
            })
            
        }

        

  return (
    <>  
        
        <div>
            {message && <h3>{message}</h3>}
            {error && <h3>{error.message}</h3>}
            
        </div>
        {   
            
            users.map(obj=>{
                let status_color = ''
                let check_information = ''
                console.log(obj)
                if (obj.status==='Pending') {
                        status_color = 'btn btn-warning'
                        
                }else if ((obj.status==='Apporve')){
                        status_color = 'btn btn-info'
                        check_information = <button style={{padding:10,fontSize:15,borderRadius:10,marginLeft:15,backgroundColor:'aqua'}} onClick={(e)=>fetchInformation(e.target.value)} value={obj.user.id} >Check Information</button>
                }else if ((obj.status==='Rejected')){
                        status_color = 'btn btn-danger'
                }else if ((obj.status==='Disbursed')){
                        
                        status_color = 'btn btn-success'
                        
                }
                return(
                    
                    <div style={{backgroundColor:'white',borderRadius:20,display:'flex',width:700,marginRight:30,marginTop:10}}>
                        
                        <img src={obj.user.photo} width={250} height={230} alt='not found'></img>
                        <div style={{textAlign:'left',marginLeft:'10px',padding:5}}>
                        <h5>User Id        : {obj.user.id}</h5>
                        <h5>Application Id : {obj.id}</h5>
                        <h5>Full Name      : {obj.user.first_name} {obj.user.last_name}</h5>
                        <h5>Email Id       : {obj.user.email}</h5>
                        <h5>Contact No     : {obj.user.mobile}</h5>
                        <h5>Remark  : <span style={{color:'brown'}}>{obj.remark}</span></h5>
                        <h5>Loan Status    : <NavLink className={status_color}><b>{obj.status}</b></NavLink>{check_information}</h5>
                        </div>
                                
                        
                    </div>   
                )
            })
        }
    
    
    </>
  )
}

export default CustomerCard