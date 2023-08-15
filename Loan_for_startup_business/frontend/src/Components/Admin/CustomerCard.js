import React from 'react'
import { NavLink } from 'react-router-dom'

function CustomerCard({users}) {
  return (
    <>
        {
            users.map(obj=>{
                let status_color = ''
                let check_installment = ''
                console.log(obj)
                if (obj.status=='Pending') {
                        status_color = 'btn btn-warning'
                }else if ((obj.status=='Apporve')){
                        status_color = 'btn btn-info'
                }else if ((obj.status=='Rejected')){
                        status_color = 'btn btn-danger'
                }else if ((obj.status=='Disbursed')){
                    status_color = 'btn btn-success'
                    check_installment = <NavLink style={{marginLeft:10}} className="btn btn-outline-info"><b>Check Installments</b></NavLink>
                }
                return(
                    
                    <div style={{backgroundColor:'white',borderRadius:20,display:'flex',width:700,marginRight:30,marginTop:10}}>
                        
                        <img src={obj.user.photo} width={250} height={230} alt='not found'></img>
                        <div style={{textAlign:'left',marginLeft:'10px',padding:5}}>
                        <h5>User Id        : {obj.user.id}</h5>
                        <h5>Application Id : {obj.id}</h5>
                        <h5>Full Name      : {obj.user.first_name} {obj.user.last_name}</h5>
                        <h5>Email Id       : {obj.user.email}</h5>
                        <h5>Date of birth  : {obj.user.dob}</h5>
                        <h5>Contact No     : {obj.user.mobile}</h5>
                        <h5>Loan Status    : <NavLink className={status_color}><b>{obj.status}</b></NavLink>{check_installment}</h5>
                        </div>
                                
                        
                    </div>   
                )
            })
        }
    
    
    </>
  )
}

export default CustomerCard