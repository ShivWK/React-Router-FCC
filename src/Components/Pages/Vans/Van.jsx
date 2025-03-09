import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { Link, useSearchParams, NavLink, useLoaderData , Await} from 'react-router-dom';
// import { defer } from 'react-router-dom/server';
import { requiredAuth } from '../../../util';

export async function loader() {
    await requiredAuth();
    // let responce = await fetch('/api/vans');
    // let data = await responce.json();
    // return data;

    let response = fetch('/api/vans');
    return { vans : response.then(data => data.json()) }
}

export default function Van() {

    let [searchParams, setSearchParams] = useSearchParams();
    let vanDataPromise = useLoaderData();

    // console.log(searchParam)
    // console.log(searchParam.toString());

    // will be printed for two times as first it will be exevuted then fetch will work and will update the vanData then compo will rerender and you will see console two times

    const whatToFetch = searchParams.get('type'); 
    
    //we are not doing this in useEffect because getting is really quick so we dont need to do it as side effect

    // we can use whattofetch to check whether type is present or not means filter is applied or not, because when no filter no type attribute means whattofetch will be null fslse 

    // useEffect(() => {
    //     fetch("/api/vans")
    //         .then((data) => {
    //             // always check the 'ok' status if it's true then proceed further
    //             if (!data.ok) {
    //                 throw new Error("Something went wrong");
    //             } else
    //                 return data.json()
    //         })
    //         .then((actullData) => {
    //             //before update any state check whether the response data is an array or not if you want to use map function on that 
    //             if (!Array.isArray(actullData.vans)) {
    //                 throw new Error("responce isn't an array")
    //             } else {
    //                 setVanData(actullData.vans)
    //              setLoading(false)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         })

    //         // return () => controller.abort(); // optimization if compo unmounts before fetch coild complete the react will abort the state update
    // }, [])

    // const filtereData = whatToFetch ? vanData.filter((data) => data.type === whatToFetch) : vanData;

    //optimise the app we can cash the the data came from api so that it sould not fetch data each time when user come here , mostly in van detail page an van page navigation

    //here we memoise the filtered data so that it should not be fetched on each render

    // const filtereData = useMemo(() => {
    //     return whatToFetch 
    //     ? vanData.filter((data) => data.type === whatToFetch) 
    //     : vanData;
    // }, [vanData, whatToFetch])

    // const vansList = filtereData.map((data) =>
    // (<div key={data.id} className='w-full md:w-60 p-1'>
    //     <Link to={`${data.id}`} state={{search : searchParam.toString(), type : whatToFetch}}>
    //     <img className='rounded-md' src={data.imageUrl} alt="Van Image" />
    //     </Link>
    //     <h2 className='font-semibold mt-1'>{data.name}</h2>
    //     <p>{data.price}/day</p>
    //     <div className={`flex my-1 items-center justify-center px-4 py-2 rounded-md text-white ${data.type == 'simple' ? 'bg-[#b43333]' : (data.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{data.type}</div>
    // </div>)
    // );

    // function genNewSearchParamString(key, value) {
    //     const sp = new URLSearchParams(searchParams);

    //     if (value === null) {
    //         sp.delete(key);
    //     } else {
    //         sp.set(key, value);
    //     }
    //     return `?${sp.toString()}`;
    // }

    function handleFilterChange(key, value){
        setSearchParams((prev)=>{
            const newParam = new URLSearchParams(prev);
            if(value === null){
                newParam.delete(key);
            }else{
                newParam.set(key , value)
            }
      
            return newParam;
        })
    }

    return (
        <div className='p-2 mx-auto w-full'>
            
                {/* <NavLink 
                to='?type=simple' 
                className= 'active:bg-white active:text-black  rounded-md  py-1 w-20 flex items-center justify-center bg-[#b43333] text-white'
                >Simple</NavLink>  */}

                {/* <NavLink to={genNewSearchParamString('type', "simple")}
                // we want it to run as the document is loaded so that to attribute can get its value
                    className='active:bg-white active:text-black  rounded-md  py-1 w-20 flex items-center justify-center bg-[#b43333] text-white'
                >Simple</NavLink>

                <NavLink to={genNewSearchParamString("type", "rugged")} className='active:bg-white active:text-black  rounded-md py-1 w-20 flex items-center justify-center bg-[rgb(4,80,35)] text-white'>Rugged</NavLink>

                <NavLink to={genNewSearchParamString("type", "luxury")} className='active:bg-white active:text-black  rounded-md py-1 w-20 flex items-center justify-center bg-[#0c0702] text-white'>Luxury</NavLink>

                <NavLink to={genNewSearchParamString("type", null)} className='active:bg-white active:text-black  rounded-md  py-1 w-20 flex items-center justify-center bg-[rgb(116,250,82)] text-red-700'>Clear</NavLink>

                <button
                    onClick={() => setSearchParams({ type: 'simple' })}
                    className='active:bg-white active:text-black  rounded-md  py-1 w-20 flex items-center justify-center bg-[#b43333] text-white'
                >Simple</button> */}

                {/* dont use link or navlink to give onClick event they might not work properly use Button instead */}

                {/* to clear out the url to remove filter we can give ''  in to of clear button and we can also give '.' because . point the current directory which is van so whole url will change to go to the van page that's our parent page or dir without any search param*/}

                {/* instead of using to attribute in navlink we can use useSearchParams setter function the data we will give that will directly given to the url  */}
                
                <Suspense fallback={<h1 className='text-2xl font-semibold text-center mt-52'>Loading...</h1>}>
                <Await resolve={vanDataPromise.vans}>
                    {
                        (Data) => {
                            let vanData = Data.vans
                            const filtereData = useMemo(() => {
                                return whatToFetch 
                                ? vanData.filter((data) => data.type === whatToFetch) 
                                : vanData || [];
                            }, [vanData, whatToFetch])
                        
                            const vansList = filtereData.map((data) =>
                            (<div key={data.id} className='w-full md:w-60 p-1'>
                                <Link to={`${data.id}`} state={{search : searchParams.toString(), type : whatToFetch}}>
                                <img className='rounded-md' src={data.imageUrl} alt="Van Image" />
                                </Link>
                                <h2 className='font-semibold mt-1'>{data.name}</h2>
                                <p>${data.price}/day</p>
                                <div className={`flex my-1 items-center justify-center px-4 py-2 rounded-md text-white ${data.type === 'simple' ? 'bg-[#b43333]' : (data.type === 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{data.type}</div>
                            </div>)
                            );

                            return <>
                                <nav className='flex md:gap-4 gap-2 px-[10px] my-4'>
                                 <button 
                                    onClick={() => handleFilterChange( "type" ,'simple')}
                                    className={`active:bg-white active:text-black hover:bg-[#b43333]  rounded-md  py-1 w-20 flex items-center justify-center ${whatToFetch === 'simple' ? 'bg-[#b43333]' : 'bg-gray-400'} text-white`}
                                >Simple</button>

                                <button 
                                    onClick={() => handleFilterChange("type" ,"rugged")} 
                                    className={`active:bg-white active:text-black border-1 rounded-md hover:bg-[rgb(4,80,35)] py-1 w-20 flex items-center justify-center  ${whatToFetch === 'rugged' ? 'bg-[rgb(4,80,35)]' : 'bg-gray-400'} text-white`}
                                >Rugged</button>

                                <button 
                                    onClick={() => handleFilterChange("type" ,"luxury")} 
                                    className={`active:bg-white active:text-black border-1 rounded-md hover:bg-[#0c0702] py-1 w-20 flex items-center justify-center ${whatToFetch === 'luxury' ? 'bg-[#0c0702]' : 'bg-gray-400' } text-white`}
                                >Luxury</button>

                                {whatToFetch ? <button
                                onClick={()=>handleFilterChange("type",null)}
                                className= 'active:bg-white active:text-black  rounded-md  py-1 w-20 flex items-center justify-center bg-[#b43333] text-white'
                                >Clear</button> : null}
                
                                </nav>

                                <div className='flex gap-2 md:gap-3 pb-12 px-[10px] flex-wrap mx-auto  w-full'>
                                    {vansList}
                                </div>
                            </>
                        }
                    }
                </Await>
                </Suspense>
        </div>
    )

}