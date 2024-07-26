import Raect from 'react';
import { NavLink, Outlet } from 'react-router-dom'

export default function HostLayout() {
    return (
        <>
            <nav className='h-10 flex mb-2 md:gap-4 px-[10px] gap-3 items-center justify-start' >

                {/* use 'end' to stop counting path from here */}
                <NavLink 
                    to="." 
                    end 
                    className={({ isActive }) =>`hover:font-semibold ${isActive ? 'underline' : ''}`
                    } 
                    style={({ isActive }) => {return {fontWeight: isActive ? '700' : '' }}}
                >Dashboard</NavLink>

                {/* the link which is to be clicked when page load give to same as the parent route path, and there give index to the child route which is handling this link. We can also give '.' single dot represents the current directory mean when when page will load let say hav url=/host then '.' is pointing to /host the current dir */}

                {/* relative routes are relative to the Routes on app.jsx page not to the path that we have given to the routes */}

                <NavLink to="income" className={({isActive})=>`hover:font-semibold ${isActive ? 'underline' : ''}` } style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? '700' : ''
                    }
                }}>Income</NavLink>

                {/* sice these will be manged by a parent Route which has path '/host' so here in 'to' attribute also no need to give /host/vans only vans will also work because we are working with relative path */}

                {/* all parent routes path will be included in the child path automatically so don't repeat, in url bar when click these link you will see /host/vans or income so on, because the parent route has path = host and grande parent has pathh = / so /host/vans mid '/' will be given by react or browser automatically */}

                <NavLink to="vans" className={({isActive})=>`hover:font-semibold ${isActive ? 'underline' : ''}` } style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? '700' : ''
                    }
                }}>Vans</NavLink>
                <NavLink to="reviews" className={({isActive})=>`hover:font-semibold ${isActive ? 'underline' : ''}` } style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? '700' : ''
                    }
                }}>Reviews</NavLink>
            </nav>
            <Outlet />
        </>

    )
} 