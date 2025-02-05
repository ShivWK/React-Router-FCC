import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import useFetchAPI from '../../FetchAPI';

export default function HostVans() {
    let [vans, setVans] = useState([]);
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/host/vans').then((response) => {
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            return response.json();
        }).then((data2) => {
            setVans(data2.vans)
            // setLoading(false);
            if(vans.length > 0){
                setLoading(false);
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }, [vans]);

    // const { vans, loading, error} = useFetchAPI({ route : '/api/host/vans'})

    // if(error){
    //     return <div>Error : {error}</div>
    // }

    const SelectedVans = vans.map((data) => {
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
                    {loading ? <h1 className='text-2xl font-semibold text-center mt-52'>Loading...</h1> : SelectedVans}
                </div>
            </div>
        </section>

    )

}