import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

export default function VansDetails(){
    let van = useParams();
    
    // console.log(van.id);
    let [specificVan, setSpecificVan] = useState({});
    let [Loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch(`/api/vans/${van.id}`)
        .then((data)=>{
            if(!data.ok) throw new Error("Somthing went wrong");
            else return data.json();
        })
        .then((value)=>{
            // if(!Array.isArray(value.vans)) throw new Error("Response is not an Array");
            setSpecificVan(value.vans);
            setLoading(false);
            // console.log(value.vans)
        })
    }, [] ) //If we dont give this empty array then useEffect will call the callback again and again 

    // console.log(specificVan)
    return (
        <>
         { Loading ? <h1 className='text-4xl font-semibold absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] '>Loading...</h1> : <div className='w-fit my-10'>
            <img className='w-96 mx-auto rounded-md' src={specificVan.imageUrl} alt="van picture" />
            <div className='mx-auto w-11/12'>
                <h2 className='text-3xl font-semibold mx-auto my-4 text-center'>{specificVan.name}</h2>
                <p>{specificVan.description}</p>
                <span className='text-xl font-semibold my-4 mr-3'>${specificVan.price}/day</span>
                <span className={`inline-flex my-1 items-center justify-center px-4 py-1 rounded-md text-white ${specificVan.type == 'simple' ? 'bg-[#b43333]' : (specificVan.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{specificVan.type}</span>
                <button className={`my-1 justify-center px-4 py-2 rounded-md text-white bg-[#ff3636] w-full active:bg-black `}>Rent this Van</button>
            </div>
            
        </div>}
        
        </>
       
    )
}

//when encounter this error "Objects are not valid as a React child (found: object with keys {id}). If you meant to render a collection of children, use an array instead." this mean in return of our component we are returning an object (directly w/o any maniplation) and we cant render object directly in react Arrays can be given but not an object like {id : 3} here we wanna return {id : 3} itself. We can return value of id but not the object itself.