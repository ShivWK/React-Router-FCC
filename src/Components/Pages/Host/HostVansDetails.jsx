import React, { useEffect, useState } from 'react';
import { Link, useParams, NavLink, Outlet } from 'react-router-dom'

export default function HostVansDetails() {

    let van = useParams();

    //useParam returns an object so use objec destructuring to get value from it
    //const { id } = useParams();
  
    let [loading, setLoading] = useState(true);
    let [myVan, setMyVan] = useState([]);

    useEffect(() => {
        fetch(`/api/host/vans/${van.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong")
                }
                else return response.json();
            })
            .then((data) => {
                // console.log(data.vans)
                setMyVan(data.vans[0]);
                setLoading(false);
            })
    }, [])

    // console.log(myVan)
    const myVanDetails = <div className='flex gap-4 my-3'>
        <img src={myVan.imageUrl} className='w-[15%] h-[85%]' alt='van-image'/>
        <div className='flex flex-col gap-4 justify-center'>
            <span className={`inline-flex my-1 items-center px-4 py-1 mt-3 rounded-md text-white ${myVan.type == 'simple' ? 'bg-[#b43333]' : (myVan.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{myVan.type}</span>
            <p className='text-2xl font-semibold'>{myVan.name}</p>
            <p className='font-semibold'>{myVan.price}<span>/day</span></p>
        </div>
    </div>

    function backHandler() {
        history.back();
    }


    return (
        <>
            <section className='px-[10px]'>
                <Link className='mt-4 mb-8 underline text-sm font-semibold' onClick={backHandler}>back to all vars</Link>
                <div className=' w-full border-2'>
                    {loading ? <p className='text-xl font-semibold text-center'>Loading...</p> : myVanDetails}
                    <nav className='my-4 flex md:gap-3 gap-4 px-2'>
                        <NavLink to=''>link 1</NavLink>
                        <NavLink to=''>link 1</NavLink>

                        <NavLink to=''>link 1</NavLink>

                    </nav>
                </div>
                <Outlet/>
            </section>
        </>

    )
}