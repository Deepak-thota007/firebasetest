import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Write from './Components/Write';
import Read from './Components/Read';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Components/HomePage';
import Update from './Components/Update';
import Navbar from './Components/Navbar';
import Events from './Components/Events';
import WriteEvent from './Components/WriteEvent';


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2000} />
      
     <Router>
     <Navbar/>
      <Routes>
        <Route path = "/" element = {<HomePage />}/>
        <Route path = "/write" element = {<Write />}/>
        <Route path = "/read" element = {<Read />}/>
        <Route path = "/update/:id" element = {<Update />}/>
        <Route path="/events" element={<Events />} />
        <Route path="/write_events" element={<WriteEvent />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
