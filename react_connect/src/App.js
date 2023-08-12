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
      <Route path='/user_signup' elemen={<UserSignup/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
