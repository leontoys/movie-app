import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MovieList = ({movies,Favourites,handleClick})=>{
    return(
        <div className='movie-list'>
        {movies.map((movie)=>(
            <div key={movie.imdbID} 
                 onClick={()=>handleClick(movie)}
                className="movie">
                <img src={movie.Poster} alt={movie.Title}></img>
                <Favourites></Favourites>
            </div>
        ))}
        </div>
    )
    }
    
    export default MovieList