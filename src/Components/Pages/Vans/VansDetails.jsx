import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
// import useFetchAPI from '../../FetchAPI';

export default function VansDetails() {
    const location = useLocation();

    let van = useParams();
    let [vans, setSpecificVan] = useState({});
    let [loading, setLoading] = useState(true);

    // console.log(van)

    //We can catch the details of the vans so that we dont need to fetch again and again.

    useEffect(() => {
        fetch(`/api/vans/${van.id}`)
            .then((data) => {
                if (!data.ok) throw new Error("Somthing went wrong");
                else return data.json();
            })
            .then((value) => {
                // if(!Array.isArray(value.vans)) throw new Error("Response is not an Array");
                setSpecificVan(value.vans);
                setLoading(false);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []) 
    
    //If we dont give this empty array then useEffect will call the callback again and again 

    // const {vans, loading, error} = useFetchAPI({route : `/api/vans/${van.id}`})

    // if(error){
    //     return <div>Error : {error}</div>
    // }

    const vanType = location.state?.type || 'all';

    // state may not be present that why we are using optional chaining

    return (

        // location.state.search = type=jobhihoga
        <>
        <Link 
            className='my3 md:my-4 pl-[10px] text-sm font-semibold flex items-center' 
            to={`..${location.state.search ? `?${location.state.search}` : ''}`} 
            relative='path'>&#8592; <span className='underline'>{`back to ${vanType} vars`}</span>
        </Link>
            {loading ? <h1 className='text-4xl font-semibold absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] '>Loading...</h1> : <div className='w-fit my-10'>            
                <img className='md:w-96 w-11/12 mx-auto rounded-md' src={vans.imageUrl} alt="van picture" />
                <div className='mx-auto my-3 w-11/12'>
                    <span className={`inline-flex my-1 items-center justify-center px-4 py-1 mt-3 rounded-md text-white ${vans.type == 'simple' ? 'bg-[#b43333]' : (vans.type == 'luxury' ? 'bg-[#0c0702]' : 'bg-[rgb(4,80,35)]')} w-fit`}>{vans.type}</span>
                    <h2 className='text-3xl font-semibold my-2'>{vans.name}</h2>

                    <span className='text-xl font-semibold my-4 mr-3'>${vans.price}/day</span>
                    <p className='my-2'>{vans.description}</p>
                    <button className={`my-2 justify-center px-4 py-2 rounded-md text-white bg-[#ff3636] w-full active:bg-black `}>Rent this Van</button>
                </div>
            </div>}
        </>
    )
}

//when encounter this error "Objects are not valid as a React child (found: object with keys {id}). If you meant to render a collection of children, use an array instead." this mean in return of our component we are returning an object (directly w/o any maniplation) and we cant render object directly in react. Arrays can be given but not an object like {id : 3} here we wanna return {id : 3} itself. We can return value of id but not the object itself.