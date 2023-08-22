import React, { useState } from 'react'

function Loandata({userData}) {

    const [data,setData]=useState({userData})
    console.log(data)
  return (

        <div className='row' style={{ backgroundColor:'bisque',borderRadius:20,marginTop:10,padding:10,width:1300,marginLeft:100}}>
            <h1>Your Loan details</h1><hr/>
            <table className='table table-dark' style={{textAlign:'left',fontSize:25}}>
                
                <tbody>
                    <tr>
                    <th>Application Id</th> <td>{userData.application.id}</td>
                    </tr>
                    <tr>
                    <th>Application Name</th> <td>{userData.application.user.first_name} {userData.application.user.last_name}</td>
                    </tr>
                    <tr>
                    <th>Loan Pricipal amount</th> <td>{userData.loan_principal_amount}</td>
                    </tr>
                    <tr>
                    <th>Loan tenure</th> <td>{userData.loan_tenure}</td>
                    </tr>
                    <tr>
                    <th>Interest rate</th> <td>{userData.interest_rate}</td>
                    </tr>
                    <tr>
                    <th>Total amount and Processing fees</th> <td>{userData.total_amount_and_processing_fees}</td>
                    </tr>
                    <tr>
                    <th>Installments</th> <td>{userData.installment}</td>
                    </tr>
                    <tr>
                    <th>Loan sanctioning date</th> <td>{userData.response_timestamp}</td>
                    </tr>
                    <tr>
                    <th>Loan Maturity date</th> <td>{userData.maturity_date}</td>
                    </tr>
                    
                </tbody>
            </table>

        </div>
  )
}

export default Loandata