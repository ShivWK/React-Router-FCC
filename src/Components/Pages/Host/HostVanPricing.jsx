import React  from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanDetails(){

    const data = useOutletContext()

    return (
        <p><span className='text-xl font-semibold'>${data.price}</span>/day</p>
    )
}