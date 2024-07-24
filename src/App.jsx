import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Van from './Components/Pages/Vans/Van';
import VansDetails from './Components/Pages/Vans/VansDetails';
import Dashboard from './Components/Pages/Host/Dashboard';
import Income from './Components/Pages/Host/Income';
import Reviews from './Components/Pages/Host/Reviews';

import './server';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/van" element={<Van/>}/>
          <Route path="/van/:id" element={<VansDetails/>}/>
          <Route path="*" element={<h1 className='text-center font-semibold text-4xl'>404 Not Found</h1>}/>
        </Route> 
        <Route path="/host" element={<Dashboard/>}>
          <Route path="/host/income" element={<Income/>}/>
          <Route path="/host/reviews" element={<Reviews/>}/> 
        </Route>    
      </Routes>
    </Router>
  )
}origin 