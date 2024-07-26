import Raect from 'react';
import { NavLink, Outlet } from 'react-router-dom'

export default function HostLayout() {
    return (
        <>
            <nav className='h-10 flex mb-5 md:gap-4 px-[10px] gap-3 items-center justify-start' >
                <NavLink to="/host" end className={({ isActive }) =>`hover:font-semibold ${isActive ? 'underline' : ''}`
                } style={({ isActive }) => {return {fontWeight: isActive ? '700' : '' }}}>Dashboard</NavLink>

                <NavLink to="/host/income" className={({isActive})=>`hover:font-semibold ${isActive ? 'underline' : ''}` } style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? '700' : ''
                    }
                }}>Income</NavLink>
                <NavLink to="/host/vans" className={({isActive})=>`hover:font-semibold ${isActive ? 'underline' : ''}` } style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? '700' : ''
                    }
                }}>Vans</NavLink>
                <NavLink to="/host/reviews" className={({isActive})=>`hover:font-semibold ${isActive ? 'underline' : ''}` } style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? '700' : ''
                    }
                }}>Reviews</NavLink>
            </nav>
            <Outlet />
        </>

    )
} 