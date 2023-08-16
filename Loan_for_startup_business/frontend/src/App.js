import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useState } from 'react';
import Enquiry from './Components/Customer/Enquiry';
import Home from './Components/Home';
import Loan_status from './Components/Customer/Loan_status';
import About from './Components/About';
import Signup from './Components/Admin/Signup';
import Login from './Components/Admin/Login';
import CustomerDashboard from './Components/Customer/CustomerDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import LRDashboard from './Components/LoanRepresentative/LRDashboard';
import LSODashboard from './Components/LoanSancOfficer/LSODashboard';
import OHDashboard from './Components/OperationalHead/OHDashboard';
import Logout from './Components/Admin/Logout';
import AdminNavbar from './Components/NavBar/AdminNavbar';
import GuestNavbar from './Components/NavBar/GuestNavbar';
import LRNavbar from './Components/NavBar/LRNavbar';
import OHNavbar from './Components/NavBar/OHNavbar';
import LSONavbar from './Components/NavBar/LSONavbar';
import AHNavbar from './Components/NavBar/AHNavbar';
import CustomerNavbar from './Components/NavBar/CustomerNavbar';
import AHDashboard from './Components/AccountHead/AHDashboard';
import Family from './Components/Customer/Family';
import Bank from './Components/Customer/Bank';
import CreateUser from './Components/LoanRepresentative/CreateUser';
import LoanApplication from './Components/Customer/LoanApplication';
import EMICal from './Components/Homepage/EMICal';
import Installments from './Components/Admin/Installments';


function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(sessionStorage.getItem('access'))
  const [userRole,setUserRole] = useState(sessionStorage.getItem('role'))
  const [userEmail,setUserEmail] = useState(sessionStorage.getItem('email'))
  console.log(isLoggedIn)

  let navbarComponent;

  if (isLoggedIn) {
    if (userRole === 'adminDashboard') {
      navbarComponent = <AdminNavbar/>;
    } 
    else if (userRole === 'lrDashboard') {
      navbarComponent = <LRNavbar/>;
    }
    else if (userRole === 'ohDashboard') {
      navbarComponent = <OHNavbar/>;
    }
    else if (userRole === 'lsoDashboard') {
      navbarComponent = <LSONavbar/>;
    }
    else if (userRole === 'ahDashboard') {
      navbarComponent = <AHNavbar/>;
    }
    else if (userRole === 'customerDashboard') {
      navbarComponent = <CustomerNavbar/>;
    }
  } else {
    navbarComponent = <GuestNavbar />;
  }

  return (
    <>
     
      <BrowserRouter>
        {navbarComponent}

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/enquiry' element={<Enquiry/>}/>
          <Route path='/loan_status' element={<Loan_status/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserEmail={setUserEmail}/>}/>
          <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} setUserEmail={setUserEmail}/>}/>

          /* Home page */
          <Route path='emical' element={<EMICal/>}/>

          /* Dashboards */
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/lrDashboard' element={<LRDashboard/>}/>
          <Route path='/ohDashboard' element={<OHDashboard/>}/>
          <Route path='/lsoDashboard' element={<LSODashboard/>}/>
          <Route path='/ahDashboard' element={<AHDashboard/>}/>
          <Route path='/customerDashboard' element={<CustomerDashboard userEmail={userEmail}/>}/>

          /* Loan Representative */
          <Route path='/createuser' element={<CreateUser/>}/>
          <Route path='/loanapplication'  element={<LoanApplication/>}/>
          <Route path='/family' element={<Family/>}/>
          <Route path='/bank' element={<Bank/>}/>

          /* Installments */
          <Route path='/installments' element={<Installments/>}/>
          


          
          

          
        </Routes>
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
