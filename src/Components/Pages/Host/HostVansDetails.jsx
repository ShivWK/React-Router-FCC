import React from 'react';
import {Link} from 'react-router-dom'

export default function HostVansDetails(){
    function backHandler(){
        history.back();
    }
    return (
        <>
         
        <div className='px-[10px] w-full'>
        <Link onClick={backHandler}>back to all vars</Link>
            <h1 className='font-bold text-2xl'>Your listed vans</h1>
        </div>
        </>
       
    )
}