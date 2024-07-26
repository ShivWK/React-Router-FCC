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
    const myVanDetails = <div>
        <div className='flex gap-3 md:gap-4 my-3'>
            <img src={myVan.imageUrl} className='md:w-[15%] md:h-[85%] w-[30%] h-[90%]' alt='van-image' />
            <div className='flex flex-col gap-2 md:gap-4 justify-center'>
                <span className={`inline-flex my-1 items-center md:px-4 md:py-1 px-3 py-0 rounded-md text-white ${myVan.type == 'simple' ? 'bg-[#b43333]' : (myVan.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{myVan.type}</span>
                <p className='md:text-2xl text-xl font-semibold'>{myVan.name}</p>
                <p className='font-semibold'>{myVan.price}<span>/day</span></p>
            </div>
        </div>
        <nav className='my-4 flex md:gap-3 gap-4'>
                        <NavLink to='' className={({ isActive }) => `hover:font-semibold ${isActive ? 'underline' : ''}`} style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? '700' : ''
                            }
                        }}>Details</NavLink>

                        <NavLink to='' className={({ isActive }) => `hover:font-semibold ${isActive ? 'underline' : ''}`} style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? '700' : ''
                            }
                        }}>Pricing</NavLink>

                        <NavLink to='' className={({ isActive }) => `hover:font-semibold ${isActive ? 'underline' : ''}`} style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? '700' : ''
                            }
                        }}>Photos</NavLink>
                    </nav>
    </div>

    function backHandler() {
        history.back();
    }


    return (
        <>
            <section className='px-[10px] bg-white'>
                <Link className='mt-4 mb-8 underline text-sm font-semibold' onClick={backHandler}>back to all vars</Link>
                <div className=' w-full'>
                    {loading ? <p className='text-xl font-semibold text-center'>Loading...</p> : myVanDetails}           
                </div>
                <Outlet />
            </section>
        </>

    )
}