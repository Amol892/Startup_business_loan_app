import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Admin_Dashboard from "./Components/Admin/Admin_Dashboard";
import NavBar from "./Components/NavBar";
import Add_application from "./Components/Application_generator/Add_application";
import Check_user from "./Components/Admin/Check_user";


function App() {
  return (
<>
<BrowserRouter>
<NavBar/>
<Routes>
  <Route path="/admin_dashboard" element={<Admin_Dashboard/>}/>
  <Route path="/add_application" element={<Add_application/>}/>
  <Route path="/check_user" element={<Check_user/>}/>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;
