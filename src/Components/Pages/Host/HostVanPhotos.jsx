import React  from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanDetails(){

    const data = useOutletContext()

    return (
        <img src={data.imageUrl} className='md:w-[8%] md:h-[78%] w-[30%] h-[90%]' alt='van-image' />
    )
}