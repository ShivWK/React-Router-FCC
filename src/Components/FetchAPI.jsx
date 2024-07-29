import React, { useState, useEffect } from 'react';

const useFetchAPI = ({ route }) => {
    let [vans, setVans] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect(() => {
        const fetchVans = async () => {
            try {
                const response = await fetch(route);
                if (!response.ok) {
                    throw new Error("Route is wrong or server is down");
                }
                const data = await response.json();
                setVans(data);
                setLoading(false);
            }catch(error){
                setError(error.message)
                setLoading(false);
            }
        }

        fetchVans()
    }, [route])

    return { vans, loading, error} //object shorthand notation
}

export default useFetchAPI;