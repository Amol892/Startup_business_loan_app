import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import EMICaclculator from './Components/Admin/EMICaclculator';
import LoanInstallment from './Components/Admin/LoanInstallment';
import NavBar from './Components/NavBar/NavBar';
import DefaultersListPage from './Components/Admin/DefaultersListPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/emi_calculator' element={<EMICaclculator/>}/>
      <Route path='/loan_installment' element={<LoanInstallment/>}/>
      <Route path='/defaulters' element={<DefaultersListPage />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
