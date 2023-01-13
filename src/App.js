import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register';
import Home from './Pages/Home';
import Header from './Components/Header';
import Edititem from './Pages/Edit/edititem'


function App() {
  return (
    <>
     <Router>
      <div>
        
                
      
      <Routes>
     
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
       <Route path='/edit/:id' element={<Edititem/>}/>
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
