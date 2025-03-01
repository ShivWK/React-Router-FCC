import React, { useEffect, useState,} from 'react'
import {Link, useLoaderData } from 'react-router-dom';
import useFetchAPI from '../../useFetchApi';

export async function loader() {
    let response = await fetch('/api/host/vans');
    let data = await response.json();
    throw {
        message : "Something went wrong in the fetch request",
    }

    return data.vans;
}

export default function HostVans() {
    // let [vans, setVans] = useState([]);
    // let [loading, setLoading] = useState(true)
    // let [error, fetcher] = useFetchAPI(setLoading, setVans);
    let VansData = useLoaderData();

    // console.log(VansData);

    // useEffect(() => {
    //     // fetch('/api/host/vans').then((response) => {
    //     //     if (!response.ok) {
    //     //         throw new Error("something went wrong")
    //     //     }
    //     //     return response.json();
    //     // }).then((data2) => {
    //     //     setVans(data2.vans)
    //     //     setLoading(false);
    //     //     if(vans.length > 0){
    //     //         setLoading(false);
    //     //     }
    //     // }).catch((error) => {
    //     //     console.log(error.message)
    //     // })

    //     fetcher('/api/host/vans')
    // }, []);

   
    // if(loading) {
    //     return <h1 className='text-2xl font-semibold text-center mt-52'>Loading...</h1>
    // }

    // if(error){
    //     return <h1 className='text-2xl font-semibold text-center mt-52'>Error : {error}</h1>
    // }

    const SelectedVans = VansData.map((data) => {
        return (
            <Link to={data.id} key={data.id}>
                <div  className='md:my-4 my-2 p-3 w-full flex gap-4  bg-white items-center'>
                    <img className='md:w-[8%] md:h-[70%] h-20 w-[25%]' src={data.imageUrl} alt="van pic" />
                    <div className=' flex justify-center flex-col'>
                        <h2 className='text-xl font-semibold'>{data.name}</h2>
                        <p>{data.price}/day</p>
                    </div>
                </div>
            </Link>            
        )
    })

    return (
        <section className='pb-12'>
            <div className='px-[10px] w-full'>
                <h1 className='font-bold text-3xl'>Your listed vans</h1>
                <div className='flex flex-col '>
                    { SelectedVans}
                </div>
            </div>
        </section>

    )

}