import axios from 'axios'
import {useForm} from 'react-hook-form'
import React, { useEffect, useState } from 'react'
function PayEmi({userData}) {

    const [message, setMessage] = useState(' ');
    const [error,setError]=useState([])
    const {register,handleSubmit,setValue,watch} = useForm()
    console.log(userData)
    const Installment_data = userData.Installment_data
    const Loan_amount = userData.Loan_amount
    const EMI_amount = userData.EMI_amount
    const Loan_disbursement_date =userData.Loan_disbursement_date
    const parsedDate = new Date(Loan_disbursement_date);
    const RIN = userData.remaining_installment_numbers
    const  EMI_schedule_list = userData.EMI_schedule_list 
    var today = new Date()
    const access = sessionStorage.getItem('access')
    console.log(RIN)
    

    async function handlePaymentSuccess(response){

      let bodyData = new FormData(); 

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios.post('http://localhost:8000/customer/paymentsuccess/',bodyData,
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

    async function PayInstallment(data){
      console.log(data)
      const res =  loadScript();

      const result = await axios.post('http://localhost:8000/customer/pay/',data,
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
    console.log(EMI_schedule_list)

  return (
    <>
      {

        
        EMI_schedule_list.map(obj=>{
          
          if (RIN.includes(obj.installment_number)){
            
              var dateObject = new Date(obj.expected_date);
          
              const penalty_amount = 30
              var Emi_amount = parseFloat(obj.emi_amount)
              while (dateObject < today) {
                Emi_amount += penalty_amount;
                dateObject.setDate(dateObject.getDate() + 1); // Increment dateObject by 1 day
              }

              const currentDate = new Date();

              const options1 = {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              };
              
              const formattedDatetime = currentDate.toLocaleString('en-IN', options1)
              const pay_data = {'loanid':userData.loan_id,
              'loan_amount':userData.Loan_amount,
              'installment_number' : obj.installment_number,
              'installment_expected_date' : obj.expected_date,
              'installment_paid_date' : formattedDatetime,
              'EMI_amount' : obj.emi_amount,
              'paid_amount' : Emi_amount.toFixed(2)}
            
              return(
                <div className='row' style={{backgroundColor:'lightcyan',width:1000,borderRadius:20,height:110,padding:10,marginTop:40}}>

                  
                  
                    <table className='table table-lightcyan' style={{textAlign:'center'}}>
                      <thead>
                        <tr>
                        <th>Installment Number</th>
                        <th>Expected date to pay</th>
                        <th>EMI Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{obj.installment_number}</td>
                          <td>{obj.expected_date}</td>
                          <td><strong>{Emi_amount.toFixed(2)}
                          </strong> <button onClick={()=>{PayInstallment(pay_data)}} 
                          style={{padding:0,fontSize:20,borderRadius:20,marginLeft:20}} className='btn btn-success col-4'>Pay EMI</button></td>
                        </tr>
                        
                      </tbody>
                      
                    </table>
      
                </div>
              )
          }
      })
        
      
        
      }
        
    </>
  )
}

export default PayEmi