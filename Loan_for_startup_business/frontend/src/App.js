import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Application from './components/Application';
import Documents from './components/Documents';
import OpHeadDashboard from './components/OpHeadDashboard';
import Approval from './components/Approval';

function App() {
  return (
   <>
    <BrowserRouter>
    <OpHeadDashboard/>
    <Routes>
    <Route path='Application/' element={<Application/>}/>
    <Route path='Documents/:userId/' element={<Documents/>}/>
    <Route path='Approval/:userId/' element={<Approval/>}/>

    </Routes >
    </BrowserRouter>
   </>
  );
}

export default App;
