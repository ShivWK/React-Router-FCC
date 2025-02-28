import { useState } from 'react';

export default function useFetchAPI(setLoading, setData) {
    const [error, setError] = useState(false);

    function fetcher(url) {
        // setLoading(true);
        fetch(url)
        .then(data => {
            if (!data.ok) {
                throw new Error("Somethng went wring");
            } 
            return data.json();
        })
        .then(data => {
            setLoading(false);
            setData(data);
            console.log(data);
        })
        .catch(error => {
            setError(error);
        })
    }

    return [ error, fetcher ];
}