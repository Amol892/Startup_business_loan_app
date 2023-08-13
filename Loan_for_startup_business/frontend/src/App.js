import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
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

function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(sessionStorage.getItem('access'))
  const [userRole,setUserRole] = useState(sessionStorage.getItem('role'))
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
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole}/>}/>
          <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole}/>}/>


          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/lrDashboard' element={<LRDashboard/>}/>
          <Route path='/ohDashboard' element={<OHDashboard/>}/>
          <Route path='/lsoDashboard' element={<LSODashboard/>}/>
          <Route path='/ahDashboard' element={<AHDashboard/>}/>
          <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
          

          
        </Routes>
      
      </BrowserRouter>
    
    </>
  );
}

export default App;
