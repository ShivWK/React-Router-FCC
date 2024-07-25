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
import HostLayout from './Components/HostLayout';
import './server';


export default function App(){
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
        {/* initial '/' will be given by the react itself */}
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="van" element={<Van/>}/>
          <Route path="van/:id" element={<VansDetails/>}/>
            <Route path="host" element={<HostLayout/>}>
            {/* we haven't given / in host layout because it's child of main layout */}
                <Route index element={<Dashboard/>}/>
                {/* if we dont give route here then that components content won't be show on page althoug we create link to navigate to that page but we arent handling that url parameter as route so no render for that*/}
                <Route path="income" element={<Income/>}/>
                <Route path="reviews" element={<Reviews/>}/> 
            </Route> 
          <Route path="*" element={<h1 className='text-center font-semibold text-4xl'>404 Not Found</h1>}/>
        </Route> 
           
      </Routes>
    </Router>
  )
}origin 