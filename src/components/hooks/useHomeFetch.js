import { useState, useEffect } from 'react'
import { POPULAR_BASE_URL } from '../../config'

export const useHomeFetch = (searchTerm) => {
    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async endpoint => {
        setError(false);
        setLoading(true);

        const isLoadMore = endpoint.search('page');

        try {
            const result = await (await fetch(endpoint)).json(); //await for the fetch the data and await for the json
            setState(prev => ({
                ...prev, //it will spread our previous state
                movies:
                    isLoadMore !== -1
                        ? [...prev.movies, ...result.results] //we spread the result into an array and the .results is the property that we get from the api(it contains all the movies)
                        : [...result.results],
                heroImage: !prev.heroImage && result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }))
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (sessionStorage.homeState) {
            console.log("Grabbing from sessionStorage")
            setState(JSON.parse(sessionStorage.homeState))
            setLoading(false)
        } else {
            console.log("Grabbing from the API")
            fetchMovies(POPULAR_BASE_URL)
        }
    }, [])

    useEffect(() => {
        if (!searchTerm) {
            console.log('writting to sessionStorage')
            sessionStorage.setItem('homeState', JSON.stringify(state))
        }
    }, [searchTerm, state])

    return [{ state, loading, error }, fetchMovies]
}