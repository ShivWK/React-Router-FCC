import Raect from 'react';
import {NavLink, Outlet} from 'react-router-dom'

export default function HostLayout(){
    return (
        <>
         <nav className='h-10 flex md:gap-4 px-[10px] gap-2 items-center justify-start' >
            <NavLink to="/host" className="hover:font-semibold" style={({isActive})=>{
                return { fontWeight : isActive ? '700' : ''}
            }}>Dashboard</NavLink>
            <NavLink to="/host/income" className="hover:font-semibold" style={({isActive})=>{
                return {fontWeight : isActive ? '700' : ''}
            }}>Income</NavLink>
            <NavLink to="/host/reviews" className="hover:font-semibold" style={({isActive})=>{
                return {fontWeight : isActive ? '700' : ''}
            }}>Reviews</NavLink>
        </nav>
        <Outlet/>
        </>
       
    )
} 