import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Application from './components/pages/Application';
import Document from './components/pages/Document';
import OpHeadDashboard from './components/pages/OpHeadDashboard';

function App() {
  return (
   <>
    <BrowserRouter>
    <OpHeadDashboard/>
    <Routes>
    <Route path='Application/' element={<Application/>}/>
    <Route path='Documents/' elemnet={<Document/>}/>

    </Routes >
    </BrowserRouter>
   </>
  );
}

export default App;
