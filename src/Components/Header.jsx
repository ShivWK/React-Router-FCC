import React from 'react';
import {Link, NavLink}  from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink to='/' style={({isActive})=>{ 
                    return {color : isActive ? 'blue' : '',textDecoration : 'none' }}}>Home</NavLink>
                <NavLink to='/about' style={({isActive})=>{ 
                    return {color : isActive ? 'blue' : '',textDecoration : 'none' }}}>About</NavLink>
                <NavLink to='/van' style={({isActive})=>{ 
                    return {color : isActive ? 'blue' : '',
                        textDecoration : 'none'
                     }}}>Vans</NavLink>
            </nav>
        </header>
    )
}