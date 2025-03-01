import { useRouteError } from 'react-router-dom';

export default function ErrorComponent() {
    const error = useRouteError();

    return <>
        <h1 className='text-2xl font-semibold text-center mt-52'>Something went wrong</h1>
        <h2 className='text-2xl text-center mt-62 font-normal text-black'>{error.message}</h2>
    </>

}