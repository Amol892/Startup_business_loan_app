import React,{ useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {useForm} from "react-hook-form";
import axios from 'axios';
function CustDetails() {

    const {state} = useLocation()
    const {user} = state
    console.log(user)
    const {register,formState:{errors}, handleSubmit, setValue} = useForm();
    const access = sessionStorage.getItem('access')
    const [message, setMessage] = useState(' ');
    const [error,setError]=useState([])

    async function handlePaymentSuccess(response){

        let bodyData = new FormData(); 
  
        // we will send the response we've got from razorpay to the backend to validate the payment
        bodyData.append("response", JSON.stringify(response));
  
        await axios.post('http://localhost:8000/disburstment/paymentsuccess/',bodyData,
        {headers: {
          Accept: "application/json",
          "Content-Type": "application/json","Authorization":'Bearer' + " " + access
        }}).then(response=>{
          setMessage(response)
        }).catch(error=>{
          console.log(error)
          setError(error)
        })
      }
  
      // this will load a script tag which will open up Razorpay payment card to make //transactions
      const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
      };

    async function PayLoanAmount(data){
        data.insurance_doc = data.insurance_doc[0]
        data.receipt_doc = data.receipt_doc[0]
        console.log(data)
        const res =  loadScript();

        const result = await axios.post('http://localhost:8000/disburstment/payloanamount/',data,
        {headers:{'Content-Type':'multipart/form-data',"Authorization":'Bearer' + " " + access}}
        ).then(response=>{
          console.log(response.data)
          return response.data
        }).catch(error=>{
          setError(error.reponse.data)
        });

        var options = {
            key_id: process.env.PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
            key_secret: process.env.SECRET_KEY,
            amount: result.payment.amount,
            currency: "INR",
            name: "Org. Name",
            description: "Test teansaction",
            image: "", // add image url
            order_id: result.payment.id,
            handler: function (response) {
              // we will handle success by calling handlePaymentSuccess method and
              // will pass the response that we've got from razorpay
              handlePaymentSuccess(response);
            },
            prefill: {
              name: "User's name",
              email: "User's email",
              contact: "User's phone",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
    
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
    
    }
  return (
    <>
        <hr style={{color:'white'}}/>
        <div className='row' style={{padding:30,backgroundColor:'white',display:'flex'}}>
            <h2 className='col-4'><span style={{color:'brown'}}>{user.loan_obj.application.user.first_name} {user.loan_obj.application.user.last_name} Loan details</span> </h2>
            
        </div>
        
        <div className='row' style={{backgroundColor:'white',borderRadius:20,display:'flex',marginLeft:30,marginRight:30,marginTop:10}}>
            <div className='col-6' style={{padding:20,fontSize:21}}>
                <h1>Loan details</h1>
                <table className='table table-dark'>
                    <tbody>
                    <tr>
                    <th>Application Id</th> <td>{user.loan_obj.application.id}</td>
                    </tr>
                    <tr>
                    <th>Application Name</th> <td>{user.loan_obj.application.user.first_name} {user.loan_obj.application.user.last_name}</td>
                    </tr>
                    <tr>
                    <th>Loan Pricipal amount</th> <td>{user.loan_obj.loan_principal_amount}</td>
                    </tr>
                    <tr>
                    <th>Loan tenure</th> <td>{user.loan_obj.loan_tenure}</td>
                    </tr>
                    <tr>
                    <th>Interest rate</th> <td>{user.loan_obj.interest_rate}</td>
                    </tr>
                    
                    <tr>
                    <th>Installments</th> <td>{user.loan_obj.installment}</td>
                    </tr>
                    <tr>
                    <th>Loan sanctioning date</th> <td>{user.loan_obj.response_timestamp}</td>
                    </tr>
                    <tr>
                    <th>Loan Maturity date</th> <td>{user.loan_obj.maturity_date}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className='col-6' style={{padding:20,fontSize:20}}>
                <h1>Bank details</h1>
                <img src={user.bank_obj[0].user.photo} alt='Not found' width={200} height={200}/>
                <table className='table table-dark'>
                    <tbody>
                    <tr>
                    <th>Bank Name</th> <td>{user.bank_obj[0].bank_name}</td>
                    </tr>
                    <tr>
                    <th>Account Number</th> <td>{user.bank_obj[0].account_number}</td>
                    </tr>
                    <tr>
                    <th>IFSC code</th> <td>{user.bank_obj[0].ifsc_code}</td>
                    </tr>
                    <tr>
                    <th>Bank address</th> <td>{user.bank_obj[0].bank_address}</td>
                    </tr>
                    
                    </tbody>
                </table>
            </div>

        </div>
        <div className='row' style={{backgroundColor:'white',borderRadius:20,display:'flex',marginLeft:30,marginRight:30,marginTop:10}}>
        <div className='col-6' style={{padding:20,fontSize:30}}>
                <h1>Disburstment amount details</h1>
                
                <table className='table table-dark'>
                    <tbody>
                    <tr>
                    <th>Loan Id</th> <td>{user.loan_obj.id}</td>
                    </tr>
                    <tr>
                    <th>Loan amount</th> <td>{user.loan_amount}</td>
                    </tr>
                    <tr>
                    <th>Processing Fee with GST</th> <td>{user.PF_withGST}</td>
                    </tr>
                    <tr>
                    <th>Loan amount after processing fee</th> <td>{user.loan_amount_after_PF_withGST}</td>
                    </tr>
                    <tr>
                    <th>GST amount</th> <td>{user.GST_on_loan_amount}</td>
                    </tr>
                    <tr>
                    <th>Total disburstment amount</th> <td style={{backgroundColor:'greenyellow',color:'black'}}>{user.disburstment_amount} 
                    
                    </td>
                    </tr>
                    
                    </tbody>
                </table>
            </div>
            <div className='col-6' style={{backgroundColor:'lightblue',borderRadius:20}}>
            <form onSubmit={handleSubmit(PayLoanAmount)}>
                <h1 style={{color:"black", textAlign:"center"}}>Amount Disbursed</h1>
                <div style={{color:"black"}}>

                <div>
                <label htmlFor='ln'>Loan Id</label>
                <input id="ln" type='number' className='form-control' placeholder='Enter loan ID here'  style={{height:"40px"}} {...register("loan", 
                            {required:{
                                
                                message: "This field is required"
                            },
                            min:{
                                value:1,
                                message:"Loan Id not negative"
                            }
                            })} />
                            <p style={{color:"red"}}>
                                { errors.loan && errors.loan.message }
                            </p>
                
                </div>

                <div>
                <label htmlFor='idoc'>Insurance Document</label>
                <input id="idoc" type='file' accept='file/pdf' className='form-control' style={{height:"40px"}} {...register("insurance_doc", 
                            {required:{
                                value: true,
                                message: "This field is required"
                            }
                            })} />
                            <p style={{color:"red"}}>
                                { errors.insurance_doc && errors.insurance_doc.message }
                            </p>
                <br/>
                </div>

                <div>
                <label htmlFor='pmode'>Payment Mode</label>&nbsp;&nbsp;
                <select id="pmode" style={{width:"300px", textAlign:"center", height:"30px"}}  {...register("payment_mode", 
                            {required:{
                                value: true,
                                message: "This field is required"
                            }
                            })} >
                            <p style={{color:"red"}}>
                                { errors.payment_mode && errors.payment_mode.message }
                            </p>
                    <option value="">Select</option>
                    <option value="neft">NEFT</option>
                    <option value="rtgs">RTGS</option>
                    <option value="imps">IMPS</option>
                </select>
                <br/><br/>
                </div>

                <div>
                <label htmlFor='netdisbursedamount'>Net Disbursed Amount</label>
                <input id="netdisbursedamount" type='number' placeholder='Enter Net Disbursed amount'  className='form-control' style={{height:"40px"}} {...register("net_disbursed_amount", 
                            {required:{
                                value: true,
                                message: "This field is required"
                            },
                            min:{
                                value:1,
                                message:"Disburment amount should not be less than one"
                            }
                            })} />
                            <p style={{color:"red"}}>
                                { errors.net_disbursed_amount && errors.net_disbursed_amount.message }
                            </p>
                </div>

                <div>
                <label htmlFor='disbursedtoaccountno'>Loan Disbursed Account Number</label>
                <input id="disbursedtoaccountno" type='text' placeholder='Enter account no'  className='form-control' style={{height:"40px"}} {...register("disbursed_to_account_no", 
                            {required:{
                                value: true,
                                message: "This field is required"
                            },
                
                            })} />
                            <p style={{color:"red"}}>
                                { errors.disbursed_to_account_no && errors.disbursed_to_account_no.message }
                            </p>
                </div>

                <div>
                <label htmlFor='receiptdoc'>Receipt Document</label>
                <input id="receiptdoc" type='file' accept='file/pdf' className='form-control' style={{height:"40px"}} {...register("receipt_doc", 
                            {required:{
                                value: true,
                                message: "This field is required"
                            },
                
                            })} />
                            <p style={{color:"red"}}>
                                { errors.receipt_doc && errors.receipt_doc.message }
                            </p>
                <br/>
                </div>

                

                

                <div>
                <center><input type='submit' value="Payment" className='btn btn-success col-4'/></center>
                </div>
                </div>
                </form><br/><br/>
            </div>
            

        </div><br/><br/><hr/><br/>
    </>
  )
}

export default CustDetails