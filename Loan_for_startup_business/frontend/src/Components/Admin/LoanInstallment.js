import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LoanInstallment = () => {
  const [applicationData, setApplicationData] = useState([]);
  //const { id } = useParams();  // Get the parameter from the URL
  //const response = await axios.get(`http://127.0.0.1:8000/api/appli_installment/${id}/`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appli_installment/3/');
        setApplicationData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const markAsDefaulter = async () => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/mark_as_defaulter/${applicationData.id}/`);
        console.log(response.data.message);
    } catch (error) {
      console.error('Error marking as defaulter:', error);
    }
  };


  return (
    <div>
      {applicationData && applicationData.loans && (
        <div>
          <h2>Application Details</h2>
          <p>ID: {applicationData.id}</p>
          <p>Aadhar No: {applicationData.aaddar_no}</p>
          <p>PAN No: {applicationData.pan_no}</p>
          <p>Type of Employment: {applicationData.type_of_employment}</p>
          <p>Business Title: {applicationData.business_title}</p>
          <p>Business Type: {applicationData.business_type}</p>
          <p>Business Address: {applicationData.business_address}</p>
          <p>GST Registration No: {applicationData.gst_registration_no}</p>
          <p>Business License No: {applicationData.business_license_no}</p>
          <p>Expected Average Annual Turnover: {applicationData.expected_average_annual_turnover}</p>
          <p>Years in Current Business: {applicationData.years_in_current_business}</p>
          <p>Collateral: {applicationData.collateral}</p>
          <p>Status: {applicationData.status}</p>
          <p>Application Timestamp: {applicationData.application_timestamp}</p>
          <p>Remark: {applicationData.remark}</p>
          <p>User: {applicationData.user}</p>

          <h3>Loan Details</h3>
          <p>Loan ID: {applicationData.loans.id}</p>
          <p>Loan Principal Amount: {applicationData.loans.loan_principal_amount}</p>
          <p>Loan Tenure: {applicationData.loans.loan_tenure}</p>
          <p>Interest Rate: {applicationData.loans.interest_rate}</p>
          <p>Total Amount and Processing Fees: {applicationData.loans.total_amount_and_processing_fees}</p>
          <p>Installment: {applicationData.loans.installment}</p>
          <p>Maturity Date: {applicationData.loans.maturity_date}</p>
          <p>Sanction Letter: {applicationData.loans.sanction_letter}</p>
          <p>Loan Status: {applicationData.loans.status}</p>
          <p>Response Timestamp: {applicationData.loans.response_timestamp}</p>
          <p>Loan Remark: {applicationData.loans.remark}</p>
          <p>Loan Application ID: {applicationData.loans.application}</p>

          <h3>Installments</h3>
          <ul>
            {applicationData.loans.installments.map(installment => (
              <li key={installment.id}>
                <p>Installment ID: {installment.id}</p>
                <p>Remaining Amount: {installment.remaining_amount}</p>
                <p>Installment Number: {installment.installment_number}</p>
                <p>Monthly Installment Number: {installment.monthly_installment_number}</p>
                <p>Installment Expected Date: {installment.installment_expected_date}</p>
                <p>Installment Paid Date: {installment.installment_paid_date}</p>
                <p>Penalty Amount: {installment.penalty_amount}</p>
                <p>Installment Status: {installment.status}</p>
                <p>Installment Loan ID: {installment.loan}</p>
              </li>
            ))}
          </ul>
          <button onClick={markAsDefaulter}>Mark as Defaulter</button>
        </div>
      )}
    </div>
  );
};

export default LoanInstallment;