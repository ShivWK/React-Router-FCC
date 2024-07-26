import React, {useEffect, useState} from 'react';
import { Link, useSearchParams, NavLink } from 'react-router-dom';

export default function Van(){

    let [vanData, setVanData] = useState([]);
    let [loading, setLoading] = useState(true)
    let [searchParam, setSearchParams0] = useSearchParams();
    
    // console.log(searchParam.get('type'));

    // will be printed for two times as first it will be exevuted then fetch will work and will update the vanData then compo will rerender and you will see console two times

    const whatToFetch = searchParam.get('type');

    useEffect(()=>{
            fetch("/api/vans")
            .then((data) =>{ 
                // always check the 'ok' status if it's true then proceed further
                if(!data.ok){
                    throw new Error("Something went wrong");
                }else
                return data.json()
            })
            .then((actullData)=>{
                //before update any state check whether the response data is an array or not if you want to use map function on that 
                if(!Array.isArray(actullData.vans)){
                    throw new Error("responce isn't an array")
                }else
                setVanData(actullData.vans)
                // console.log(actullData.vans)
                setLoading(false)
            })
            .catch((error)=>{
                console.log(error.message);
            })
    }, [])


    const filtereData = whatToFetch ? vanData.filter((data)=> data.type === whatToFetch) : vanData;
    
//optimise the app we can cash the the data came from api so that it sould not fetch data each time when user come here , mostly in van detail page an van page navigation
    
    const vansList = filtereData.map((data)=>
          ( <div key={data.id} className='w-full md:w-60 p-1'>
            <Link to={`/van/${data.id}`}><img className='rounded-md' src={data.imageUrl} alt="Van Image" /></Link>
            <h2 className='font-semibold mt-1'>{data.name}</h2>
            <p>{data.price}/day</p>
            <div className={`flex my-1 items-center justify-center px-4 py-2 rounded-md text-white ${data.type == 'simple' ? 'bg-[#b43333]' : (data.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{data.type}</div>
        </div> )
    );

    return (
        <div className='p-2 mx-auto w-full'>
            <nav className='flex md:gap-4 gap-2 px-[10px] my-4'>
                <NavLink to='?type=simple' className='border-1 rounded-md  py-1 w-20 flex items-center justify-center bg-[#b43333] text-white'>Simple</NavLink>
                <NavLink to='?type=rugged' className='border-1 rounded-md  py-1 w-20 flex items-center justify-center bg-[rgb(4,80,35)] text-white'>Rugged</NavLink>
                <NavLink to='?type=luxury' className='border-1 rounded-md  py-1 w-20 flex items-center justify-center bg-[#0c0702] text-white'>Luxury</NavLink>
                <NavLink to='.' className='border-1 rounded-md  py-1 w-20 flex items-center justify-center bg-[rgb(116,250,82)] text-red-700'>Clear</NavLink>

                {/* to clear out the url to remove filter we can goive ''  in to of clear button and we can also give '.' because . point the current directory which is van so whole url will change to go to the van page that's our parent page or dir withount any search param*/}

                {/* <NavLink to=''>Svec</NavLink> */}
            </nav>
            <div className='flex gap-2 md:gap-3 pb-12 px-[10px] flex-wrap mx-auto  w-full'>
                {loading? <p className='text-4xl font-semibold absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] '>Loading...</p> : vansList}
            </div>
        </div>
    )
}