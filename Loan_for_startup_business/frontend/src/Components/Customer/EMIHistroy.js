import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
function EMIHistroy({userData}) {
  return (
    <div className='row' style={{backgroundColor:'white',width:1500,marginLeft:80,borderRadius:20}}>
    <div>
        <h1 style={{backgroundColor:'orange',padding:20}}> 
        Paid EMI History
        </h1><hr/>
      
    </div>
        <div style={{color:'white'}}>
            <table className='table table-dark' style={{textAlign:'center',fontSize:20}}>
                <thead>
                    <tr>
                        <th>Installment Id</th>
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
                userData.map(obj=>{

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
                                    <td><NavLink className={status_color}>{obj.status}</NavLink></td>
                                </tr>
                            
                        )
                        }
                )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EMIHistroy