import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Write from './Components/Write';
import Read from './Components/Read';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Components/HomePage';
import Update from './Components/Update';


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2000} />
     <Router>
      <Routes>
        <Route path = "/" element = {<HomePage />}/>
        <Route path = "/write" element = {<Write />}/>
        <Route path = "/read" element = {<Read />}/>
        <Route path = "/update/:id" element = {<Update />}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
