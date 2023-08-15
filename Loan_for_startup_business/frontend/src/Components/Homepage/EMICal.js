import React , {useState} from 'react'
import axios from 'axios';
import './EMICal.css'
import { useForm } from 'react-hook-form';
function EMICal() {

    const {register}=useForm()
    const [userValues, setUserValues] = useState({
        principal: '',
        interest_rate: '',
        tenure_years: '',
      });
      const [results, setResults] = useState({
        monthlyPayment: '',
        totalInterest: '',
        totalPaymableAmount: '',
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserValues({ ...userValues, [name]: value });
    };

      const handleSubmitValues = async (e) => {
        e.preventDefault();
        const principalAmount = parseFloat(userValues.principal);
        if (isNaN(principalAmount) || principalAmount < 50000 || principalAmount > 5000000) {
            console.error('Principal amount must be between 50,000 and 50,00,000.');
            return;
        }

        // Validate interest rate
        const interestRate = parseFloat(userValues.interest_rate);
        if (isNaN(interestRate) || interestRate < 9.75 || interestRate > 30) {
            console.error('Interest rate must be between 9.75% and 30%.');
            return;
        }

        // Validate tenure
        const tenureYears = parseInt(userValues.tenure_years);
        if (isNaN(tenureYears) || tenureYears < 1 || tenureYears > 6) {
            console.error('Tenure must be between 1 and 6 years.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/admin_app/emicalci/', userValues);

            if (response.status === 200) {
                const resultData = response.data;
                setResults({
                    monthlyPayment: resultData['Monthly Payment'],
                    totalInterest: resultData['Total Interest'],
                    totalPaymableAmount: resultData['Total Paymable Amount'],
                });
            }
        } catch (error) {
            console.error('Error calculating EMI:', error);
        }
    };
  return (
    <>
    <div className='container' style={{width:700,borderBlockColor:'white',backgroundColor:'lavender',padding:40,borderRadius:40}}>
        <center>
        <h1 style={{color:'orange'}}>EMI Calculator</h1><hr style={{color:'black'}}/>
        </center>
        {results.monthlyPayment  && (
                <div className='table'>
                    <h2>EMI Details</h2><hr/>
                    <table className='table' style={{textAlign:'center',fontSize:20,backgroundColor:'yellow'}}>
                        <thead>
                            <tr>
                                <th>Monthly Payment</th>
                                <th>Total Interest</th>
                                <th>Total Payable Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{results.monthlyPayment}</td>
                                <td>{results.totalInterest}</td>
                                <td>{results.totalPaymableAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    
                </div>
            )}
    <form onSubmit={handleSubmitValues} className='emi-form'>
    <div>
        <div className='form-group'>
        <label>Loan Amount:</label>
        <p style={{color:'black',fontSize:20}}>Range: 50,000 to 50,00,000</p>
        <input
            type='number'
            name='principal'
            placeholder='Loan amount'
            value={userValues.principal}
            onChange={handleInputChange}
           
        /> 
         <input
            type='range'
            name='principal'
            min='50000'
            max='5000000'
            step='100000'
            value={userValues.principal}
            onChange={handleInputChange}
        />
        
        </div>
        <div className='form-group'>
        <label>Interest Rate (% per annum):</label>
        <p style={{color:'black',fontSize:20}}>Range: 9.75% to 30%</p>
        <input
            type='number'
            name='interest_rate'
            placeholder='Interest rate'
            value={userValues.interest_rate}
            onChange={handleInputChange}
        />
        <input
            type='range'
            name='interest_rate'
            min='9.75'
            max='30'
            step='0.25'
            value={userValues.interest_rate}
            onChange={handleInputChange}
        />
        
        </div>
        <div className='form-group'>
        <label>Tenure(In Years):</label>
        <p style={{color:'black',fontSize:20}}>Range: 1 to 6 years</p>
        <input
            type='number'
            name='tenure_years'
            placeholder='Tenure Year'
            value={userValues.tenure_years}
            onChange={handleInputChange}
        />
        <input
            type='range'
            name='tenure_years'
            min='1'
            max='6'
            step='1'
            
            value={userValues.tenure_years}
            onChange={handleInputChange}
            list='makers_tenure'
        />
        <datalist id='makers_tenure'>
            <option value='0' label='0'></option>
            <option value='1' label='1'></option>
            <option value='2' label='2'></option>
            <option value='3' label='3'></option>
            <option value='4' label='4'></option>
            <option value='5' label='5'></option>
            <option value='6'label='6' ></option>
        </datalist>
        
        </div>
        <center>
        <button style={{fontSize:30,borderRadius:20,padding:20,color:'darkgoldenrod',fontWeight:500}} type='submit'>Calculate EMI</button>
        </center>
    </div>
    </form>
    
    </div>
    </>
  )
}

export default EMICal