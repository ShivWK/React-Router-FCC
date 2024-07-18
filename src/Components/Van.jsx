import React, {useEffect, useState} from 'react';

export default function Van(){

    let [vanData, setVanData] = useState([]);
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
            fetch("/api/vans")
            .then((data) =>{ 
                if(!data.ok){
                    throw new Error("Something went wrong");
                }else
                return data.json()
            })
            .then((actullData)=>{
                setVanData(actullData.vans)
                // console.log(actullData.vans)
                setLoading(false)
            })
            .catch((error)=>{
                console.log(error.message);
            })
    }, [])
    
    const vansList = vanData.map((data)=>
          ( <div key={data.id} className='w-full md:w-60 p-1'>
            <img className='rounded-md' src={data.imageUrl} alt="Van Image" />
            <h2 className='font-semibold mt-1'>{data.name}</h2>
            <p>{data.price}/day</p>
            <div className={`flex my-1 items-center justify-center px-4 py-2 rounded-md text-white ${data.type == 'simple' ? 'bg-[#b43333]' : (data.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{data.type}</div>
        </div> )
    );

    return (
        <div className='p-2 mx-auto w-full'>
            <div className='flex gap-2 md:gap-3 flex-wrap mx-auto justify-between w-full'>
                {loading? <p>Loading...</p> : vansList}
            </div>
        </div>
    )
}