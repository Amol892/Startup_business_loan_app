import React , {useState} from 'react'
import axios from 'axios';
import './EMICALCULATOR.css';
function EMICaclculator() {
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
            const response = await axios.post('http://127.0.0.1:8000/api/emicalci/', userValues);

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
    <h1 className='emi-heading'>EMI Calculator</h1>
    <form onSubmit={handleSubmitValues} className='emi-form'>
    <div>
        <div className='form-group'>
        <label>Loan Amount:</label>
        <input
            type='text'
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
        <p>Range: 50,000 to 50,00,000</p>
        </div>
        <div className='form-group'>
        <label>Interest Rate (% per annum):</label>
        <input
            type='text'
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
        <p>Range: 9.75% to 30%</p>
        </div>
        <div className='form-group'>
        <label>Tenure(In Years):</label><br/>
        <input
            type='text'
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
        />
        <p>Range: 1 to 6 years</p>
        </div>
        <button type='submit'>Calculate</button>
    </div>
    </form>
    {results.monthlyPayment  && (
                <div className='results'>
                    <h2>EMI Details</h2>
                    <p>Monthly Payment: {results.monthlyPayment}</p>
                    <p>Total Interest: {results.totalInterest}</p>
                    <p>Total Payable Amount: {results.totalPaymableAmount}</p>
                </div>
            )}
    </>
  );
}

export default EMICaclculator