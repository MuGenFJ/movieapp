import { useState, useEffect, useCallback } from 'react'
import { API_URL, API_KEY } from '../../config'

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setloading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        setError(false);
        setloading(true);

        try {
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
            const result = await (await fetch(endpoint)).json();
            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            const creditsResult = await (await fetch(creditsEndpoint)).json();
            const directors = creditsResult.crew.filter(
                member => member.job === 'Director'
            );

            setState({
                ...result,
                actors: creditsResult.cast,
                directors,
            })

        } catch (error) {
            setError(true)
        }
        setloading(false)
    }, [movieId])

    useEffect(() => {
        if (localStorage[movieId]) {
            console.log("grabbing from localStorage")
            setState(JSON.parse(localStorage[movieId]))
            setloading(false)
        } else {
            console.log("grabbing from the API")
            fetchData();
        }
    }, [fetchData, movieId])

    useEffect(() => {
        localStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state])

    return [state, loading, error]
}


