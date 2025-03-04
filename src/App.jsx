import React from 'react';
import { BrowserRouter as Router, 
          Route, 
          Routes, 
          createBrowserRouter, 
          createRoutesFromElements, 
          RouterProvider,
} from 'react-router-dom';
import { redirect  } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Van , { loader as VanLoader } from './Components/Pages/Vans/Van';
import VansDetails , { loader as VansDetailsLoader } from './Components/Pages/Vans/VansDetails';
import Dashboard from './Components/Pages/Host/Dashboard';
import Income from './Components/Pages/Host/Income';
import Reviews from './Components/Pages/Host/Reviews';
import HostLayout from './Components/HostLayout';
import './server';
import HostVans , { loader as HostVansLoader} from './Components/Pages/Host/HostVans';
import HostVansDetails , {loader as HostVansDetailsLoader} from './Components/Pages/Host/HostVansDetails';
import HostVanDetails from './Components/Pages/Host/HostVanDetails';
import HostVanPricing from './Components/Pages/Host/HostVanPricing';
import HostVanPhotos from './Components/Pages/Host/HostVanPhotos';
import LogIn from './Components/LogIn';
import ErrorComponent from './Components/ErrorComponent';
import { requiredAuth } from './util';

// import ErrorBoundary from './Components/ErrorBoundary';

export default function App(){
  
  // Old routing method
  // return (
    
  //   <Router>

  //     {/* <ErrorBoundary> */}
  //     <Routes>
  //       <Route path='/' element={<Layout/>}>

  //       {/* initial '/' will be given by the react itself */}

  //         <Route index element={<Home/>}/>
  //         <Route path="about" element={<About/>}/>
  //         <Route path="van" element={<Van/>}/>
  //         <Route path="van/:id" element={<VansDetails/>}/>
  //         <Route path="host" element={<HostLayout/>}>
          
  //           {/* we haven't given / in host layout because it's child of main layout */}

  //               <Route index element={<Dashboard/>}/>

  //               {/* if we dont give route here then that components content won't be show on page although we create link to navigate to that page but we arent handling that url parameter as route so no render for that, link will only put the give path or url in the url bar but we need to capture that */}

  //               <Route path="income" element={<Income/>}/>
  //               <Route path="reviews" element={<Reviews/>}/> 
  //               <Route path="vans" element={<HostVans/>}/> 
  //               <Route path="vans/:id" element={<HostVansDetails/>}>
  //                   <Route index element={<HostVanDetails/>}/>
  //                   <Route path='vanPricing' element={<HostVanPricing/>}/>
  //                   <Route path='vanPhotos' element={<HostVanPhotos/>}/>
  //               </Route> 
  //           </Route> 
  //         <Route path="*" element={<h1 className='text-center font-semibold text-4xl'>404 Not Found</h1>}/>
  //           {/* we can give <Outlet> in the element attribute in Route */}
  //         {/* catch all route */}

  //       </Route> 
  //     </Routes>

  //     {/* </ErrorBoundary> */}

  //   </Router>
  // )

  // New 6.4+ way of routing

  let router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>  
      <Route path="about" element={<About/>}/>
      <Route path="login" element={<LogIn />}/>
      <Route 
        path="van" 
        loader={ VanLoader } 
        element={<Van/>}
      />

      <Route 
        path="van/:id" 
        loader={ VansDetailsLoader } 
        element={<VansDetails/>}
      />

      <Route path="host" element={<HostLayout/>} >
            <Route
              index 
              element={<Dashboard/>}
              loader={ 
                // async () => await requiredAuth()
                // We have returned null from the function so that null is passed as return of the loader, loader must pass some value or null otherwise error

                // Also if any fetch operation needs to occur then it would be after await means it will need wait for the authentication before execution, if authetication fails the requiredAuth will redirect the user to login page then no fetch will occur.

                async () => {
                  const isLoggeedIn = 1;

                  if (!isLoggeedIn) {
                    return redirect("/login");
                  }

                  return null;
                }
              }
            />

            <Route 
              path="income" 
              element={<Income/>}
              loader={async () => await requiredAuth()}
            />

            <Route 
              ath="reviews" 
              element={<Reviews/>}
              loader={async ()=> await requiredAuth()}
            />

            <Route
              path="vans" 
              element={<HostVans/>}
              loader={HostVansLoader} 
              errorElement={<ErrorComponent/>}
            />  

            <Route 
              path="vans/:id" 
              element={<HostVansDetails/>}
              loader={HostVansDetailsLoader}
            >
                <Route 
                  index 
                  element={<HostVanDetails/>}
                  loader={async () => await requiredAuth()}     
                />

                <Route 
                  path='vanPricing' 
                  element={<HostVanPricing/>}
                  loader={async ()=> await requiredAuth()}
                />
                <Route 
                  path='vanPhotos' 
                  element={<HostVanPhotos/>}
                  loader={async ()=> await requiredAuth()}  
                />
            </Route> 
        </Route> 
      <Route path="*" element={<h1 className='text-center font-semibold text-4xl'>404 Not Found</h1>}/>
      
  </Route>
  ))

  return <RouterProvider router={router} />
}
// route element = outlet                   