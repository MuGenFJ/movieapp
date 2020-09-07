import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

import { StyledMovieThumb } from '../styles/StyledMovieThumb'

const MovieThumb = ({ image, movieId, clickable }) => {
    return (
        <StyledMovieThumb>
            {clickable ? (
                <Link to={`/${movieId}`}>
                    <img src={image} alt="moviethumb" className="clickable" />
                </Link>
            ) : (
                    <img src={image} alt="moviethumb" />
                )}
        </StyledMovieThumb>
    )
}

MovieThumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool,
}

export default MovieThumb
