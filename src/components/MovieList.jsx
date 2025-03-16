import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MovieList = ({movies,AddFavourites,handleClick})=>{
    return(
        movies.map((movie,index)=>(
            <div key={movie.imdbID} 
                 onClick={()=>handleClick(movie)}
                className="movie">
                <img src={movie.Poster}></img>
                <AddFavourites></AddFavourites>
            </div>
        ))
    )
    }
    
    export default MovieList