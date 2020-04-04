import { useEffect, useState } from 'react';
import apiClient from '../api-client';

export default function useData(path, initialValue, immediateLoading = true) {
    const [data, setData] = useState(initialValue);
    const [error, setError] = useState(null)
    const [isFetching, setFetching] = useState(false);

    useEffect(() => {
        if (immediateLoading) {
            setFetching(true)
            apiClient.get(path)
                .then(response => {
                    setFetching(false)
                    setData(response.data);
                })
                .catch(err => {
                    setFetching(false)
                    setError(err.response)
                })
        }
    }, [path, immediateLoading])

    return [data, isFetching, error]
}