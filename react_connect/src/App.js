import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import LoanPresentative from './Components/NavBar/LoanPresentative';
import Login from './Components/Pages/Login';
import { useState } from 'react';
import Home from './Components/Home';
import Application from './Components/Pages/Application';
import Guarantor from './Components/Pages/Guarantor';
import Documents from './Components/Pages/Documents';
import Logout from './Components/Pages/Logout';
import UserSignup from './Components/Pages/UserSignup';
import ApplicationStatusDetails from './Components/Pages/ApplicationStatusDetails';
import ApplicationRergardingMail from './Components/Pages/ApplicationRergardingMail';
import ApplicaationDocumentDetails from './Components/Pages/ApplicaationDocumentDetails';
import AllApporveApplication from './Components/LoanOfficer/AllApporveApplication';
import ViewApplication from './Components/LoanOfficer/ViewApplication';
import CalculateGST from './Components/AccountHead/CalculateGST';
import CheckDisburstmentAmount from './Components/AccountHead/CheckDisburstmentAmount';
import DocumentTable from './Components/Pages/DocumentTable';
import CheckDetails from './Components/AccountHead/CheckDetails';
import CheckTypeDetails from './Components/AccountHead/CheckTypeDetails';
import CheckApplicationDetails from './Components/AccountHead/CheckApplicationDetails';
import CheckDocumentdetails from './Components/AccountHead/CheckDocumentdetails';
import CheckGuarantorDetails from './Components/AccountHead/CheckGuarantorDetails';
import CheckCustomerBankDetails from './Components/AccountHead/CheckCustomerBankDetails';
import DisbursedAmount from './Components/AccountHead/DisbursedAmount';
import LoanAmountDisbursed from './Components/AccountHead/LoanAmountDisbursed';
import LoanDetailsApplication from './Components/LoanOfficer/LoanDetailsApplication';
import CustomerVenderAccount from './Components/AccountHead/CustomerVenderAccount';
import CheckCibil from './Components/Pages/CheckCibil';
import VenderApplication from './Components/Pages/VenderApplication';
import AccountHead from './Components/NavBar/AccountHead';
import OperationalOfficer from './Components/NavBar/OperationalOfficer';
import LoanOffiecr from './Components/NavBar/LoanOffiecr';
import FormSuccess from './Components/Messege/FormSuccess';
import AllPendingApplication from './Components/OperationalHead/AllPendingApplication';
import AllVerifyApplication from './Components/LoanOfficer/AllVerifyApplication';






function App() {


  const [isLogged, setIsLogged] = useState(sessionStorage.getItem('access_token'));
  const [role, setRole] = useState(sessionStorage.getItem('role'));
  const [email, setEmail] = useState(sessionStorage.getItem('email'));
  console.log(isLogged)
  console.log(role)
  let chetan;
  if (isLogged){
    if (role === 'loan_representative'){
      chetan = <LoanPresentative/>
    }else if (role === 'operational_head'){
      chetan = <OperationalOfficer/>
    }else if(role === 'account_head'){
      chetan = <AccountHead/>
    }
    else if(role === 'loan_s_officer'){
      chetan = <LoanOffiecr/>
}  }
  return (
    <>
    <BrowserRouter>   
    {chetan}
    
    <Routes>
      
      <Route path="/login" element={<Login setEmail={setEmail} setRole={setRole} setIslogged={setIsLogged}/>} />
    
      
     
        
      <Route path='/application' element={<Application/>} />
      <Route path='/guarantor' element={<Guarantor/>} />
      <Route path='/documents' element={<Documents/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/logout' element={<Logout  />} />
      <Route path='/user_signup' element={<UserSignup/>} />
      <Route path='/application_status' element={<ApplicationStatusDetails/>} />
      <Route path='/application_email'element={<ApplicationRergardingMail/>} />
      <Route path='/application_document_details' element={<ApplicaationDocumentDetails/>} />
      <Route path='/apporve_application' element={<AllApporveApplication/>} />
      <Route path='/view_application/:id/' element={<ViewApplication/>} />
      <Route path='/gst_calculate' element={<CalculateGST/>} />
      <Route path='/disburs_ammount' element={<CheckDisburstmentAmount/>} />
      <Route path='/document_table/:id/' element={<DocumentTable/>} />
      <Route path='/check_details' element={<CheckDetails/>} />
      <Route path='/check_type_details' element={<CheckTypeDetails/>} />
      <Route path="/check_application_details" element={<CheckApplicationDetails/>} />
      <Route path='/check_document_details' element={<CheckDocumentdetails/>} />
      <Route path='/check_guarantor_details' element={<CheckGuarantorDetails/>} />
      <Route path='/check_customer_bank_details' element={<CheckCustomerBankDetails/>} />
      <Route path='/disbursed_amount_customer' element={<DisbursedAmount/>} />
      <Route path='/loan_amount_disbursed' element={<LoanAmountDisbursed/>} />
      <Route path='/loan_details_application' element={<LoanDetailsApplication/>} />
      <Route path='/checkCustomervender_account' element={<CustomerVenderAccount/>} />
      <Route path='/check_cibil' element={<CheckCibil/>} />
      <Route path='/vendor_application' element={<VenderApplication/>} />
      <Route path='/success_message' element={<FormSuccess/>} />
      <Route path='/all_pending_application' element={<AllPendingApplication/>} />
      <Route path='/all_verify_application' element={<AllVerifyApplication/>} />
      
      
    </Routes>
    
</BrowserRouter>    
    </>
  );
}

export default App;
