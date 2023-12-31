import { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
function Installments() {

            
            const {state} = useLocation();
            const { user } = state; // Read values passed on state 
            console.log(user)   
            const [message,setMessage] = useState([])
            const [error,setError] = useState([])
            function addDefaulter(data){
                const access = sessionStorage.getItem('access')
                console.log('Bearer' + " " + access)
                axios.get(`http://localhost:8000/admin_app/checkdefaulter/${data}/`,
                    {headers:{'Authorization':'Bearer' + " " + access}}
                    ).then(response=>{
                        setMessage(response.data.message)
                        console.log(response.data.message)
                    }).catch(error=>{
                        setError(error.response.data)
                    })
                }
            
            
  return (
    <>  
    
        <hr style={{color:'white'}}/>
        <center>
        <div style={{color:'black',backgroundColor:'yellow',padding:20,borderRadius:10}} className='container'>
            {message && <h3>{message}</h3>}
            {error && <h3>{error.message}</h3>}
            
        </div>
        </center>
        <div className='row' style={{backgroundColor:'white',borderRadius:10,width:1800,marginLeft:120,borderRadius:20}}>
        <div>
            <h1 style={{backgroundColor:'mediumorchid',padding:20}}> 
            <NavLink style={{padding:10,fontSize:30,marginLeft:20,marginRight:400}} to="/adminDashboard" className='btn btn-secondary col-2'>Back to Dashboard</NavLink>
            Installments details
            <button style={{padding:15,borderRadius:20,backgroundColor:'red',fontSize:30,fontWeight:500,marginLeft:400}} value={user[0].loan.application.id} onClick={(e)=>{addDefaulter(e.target.value)}}>Add to Defaulter</button></h1><hr/>
            
            <table className='table' style={{textAlign:'center'}}>
                <thead >
                    <tr>
                        <th><h2>Applicant Name</h2></th>
                        <th><h2>Applicant id</h2></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><h2>{user[0].loan.application.user.first_name} {user[0].loan.application.user.last_name}</h2></td>
                        <td><h2>{user[0].loan.application.id}</h2></td>
                    </tr>
                </tbody>
            </table>
            
        </div>
            <div style={{color:'white'}}>
                <table className='table table-dark' style={{textAlign:'center',fontSize:20}}>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Remaining amount</th>
                            <th>Installment number</th>
                            <th>Monthly Installment number</th>
                            <th>Installment expected date</th>
                            <th>Installment paid date</th>
                            <th>Penalty amount</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                    user.map(obj=>{

                        let status_color = ''
                        if (obj.status==='ok') {
                            status_color = 'btn btn-success col-12'
                        }else if ((obj.status==='pending')){
                            status_color = 'btn btn-warning col-12'
                        }else if ((obj.status==='late')){
                            status_color = 'btn btn-danger col-12'
                        }
                                return(
                            
                                    <tr>
                                        <td>{obj.id}</td>
                                        <td>{obj.remaining_amount}</td>
                                        <td>{obj.installment_number}</td>
                                        <td>{obj.monthly_installment_number}</td>
                                        <td>{obj.installment_expected_date}</td>
                                        <td>{obj.installment_paid_date}</td>
                                        <td>{obj.penalty_amount}</td>
                                        <td><button className={status_color}>{obj.status}</button></td>
                                    </tr>
                                
                            )
                            }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Installments