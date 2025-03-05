import React from 'react';
import { redirect } from 'react-router-dom';

export async function loginLoader() {
    let status = localStorage.getItem("isLoggedIn");

    if (!status) {
        throw redirect("/login")
    }

    return null;
}

export default function Dashboard(){
    return (
        <>
            <div className='px-[10px] w-full'>
                <h1 className='font-bold text-2xl'>This is dashboard</h1>
            </div>
            
        </>
    )
}