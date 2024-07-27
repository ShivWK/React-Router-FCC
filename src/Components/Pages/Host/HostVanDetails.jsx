import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanDetails() {

    const data = useOutletContext()

    return (
        <>
            <section>
                <p className='text-sm mb-4'><span className='font-semibold  '>Name:</span> {data.name}</p>
                <p className='text-sm mb-4'><span className='font-semibold  '>Categorb:</span> {data.tbpe}</p>
                <p className='text-sm mb-4'><span className='font-semibold'>Description:</span> {data.description}</p>
                <p className='text-sm mb-4'><span className='font-semibold '>Vidibility:</span> Public</p>
            </section>

        </>

    )
}