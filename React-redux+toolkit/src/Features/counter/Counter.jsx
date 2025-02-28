import { useState } from 'react';

export default function Button() {
    let [counter, setCounter] = useState(0);

    return (
        <div className='flex gap-2 absolute top-[50%] left-[50%] items-center -translate-x-[50%] -translate-y-[50%]'>
            <button className='bg-red-500 py-2 px-4 text-white font-xl font-semibold' onClick={() => {
                setCounter(counter - 1)
            }}>-</button>

            <span className='text-white'>Count : {counter}</span>
            <button className='bg-red-500 py-2 px-4 text-white font-xl font-semibold' onClick={() => {
                setCounter(counter + 1)
            }}>+</button>

        </div>
    )
}