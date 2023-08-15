import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login';
import Application from './Components/Pages/Application';
import Guarantor from './Components/Pages/Guarantor';
import Documents from './Components/Pages/Documents';
import Home from './Components/Pages/Home';
import Logout from './Components/Pages/Logout';
import UserSignup from './Components/Pages/UserSignup';
import ApplicationStatusDetails from './Components/Pages/ApplicationStatusDetails';
import ApplicationRergardingMail from './Components/Pages/ApplicationRergardingMail';
import ApplicaationDocumentDetails from './Components/Pages/ApplicaationDocumentDetails';
import AllApporveApplication from './Components/LoanOfficer/AllApporveApplication';
import ViewApplication from './Components/LoanOfficer/ViewApplication';
import CalculateGST from './Components/AccountHead/CalculateGST';
import CheckDisburstmentAmount from './Components/AccountHead/CheckDisburstmentAmount';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/application' element={<Application/>} />
      <Route path='/guarantor' element={<Guarantor/>} />
      <Route path='/documents' element={<Documents/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/logout' element={<Logout/>} />
      <Route path='/user_signup' element={<UserSignup/>} />
      <Route path='/application_status' element={<ApplicationStatusDetails/>} />
      <Route path='/application_email'element={<ApplicationRergardingMail/>} />
      <Route path='/application_document_details' element={<ApplicaationDocumentDetails/>} />
      <Route path='/apporve_application' element={<AllApporveApplication/>} />
      <Route path='/view_application/:id/' element={<ViewApplication/>} />
      <Route path='/gst_calculate' element={<CalculateGST/>} />
      <Route path='/disburs_ammount' element={<CheckDisburstmentAmount/>} />
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
