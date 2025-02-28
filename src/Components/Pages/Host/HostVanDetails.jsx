import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanDetails() {

    const {name, type, description} = useOutletContext()

    return (
        <>
            <section>
                <p className='text-sm mb-4'><span className='font-semibold  '>Name:</span> {name}</p>
                <p className='text-sm mb-4'><span className='font-semibold  '>Category:</span> {type}</p>
                <p className='text-sm mb-4'><span className='font-semibold'>Description:</span> {description}</p>
                <p className='text-sm mb-4'><span className='font-semibold '>Vidibility:</span> Public</p>
            </section>

        </>

    )
}