import Home from './Components/Home';
import React from 'react';
import Completed from './Components/Completed'
import Create from './Components/Create'
import './App.css';
import { Route, Routes } from 'react-router-dom'; // Import Routes component

function App() {
  return (
    <Routes> 
      <Route path='/' element={<Home />} /> 
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/create' element={<Create/>}/>
    </Routes>
  );
}

export default App;
