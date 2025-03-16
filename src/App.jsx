import { useState, useEffect } from 'react';
import MovieList from '../../src/components/MovieList';
import "./styles.css"
import Heading from './components/Heading';
import Search from './components/Search';
import AddFavourites from './components/AddFavourites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [favourites, setFavourites] = useState([])

  //query OMDB
  const getMovies = async (searchValue) => {
    try {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a2afdd9f`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("OMDB Error")
      }
      const responseJson = await response.json()
      if (responseJson.Search) {
        console.log(responseJson.Search)
        setMovies(responseJson.Search)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //on page load - read from local storage
  useEffect(()=>{
    const newList =  JSON.parse(localStorage.getItem("react-movie-favourites"))||[]
    setFavourites(newList)
  },[])

  //as soon as search value changes query
  useEffect(() => {
    getMovies(searchValue)
  }, [searchValue])

  const addToFavourites = (movie)=>{
    //update favourites list
    const newList = [...favourites,movie]
    setFavourites(newList)
    localStorage.setItem("react-movie-favourites",JSON.stringify(newList))
  }

  const removeFromFavourites = (movie)=>{
    const newList = favourites.filter(item=>item.imdbID!==movie.imdbID)
    setFavourites(newList)
    localStorage.setItem("react-movie-favourites",JSON.stringify(newList))
  }

  return (
    <div className='container'>
      <h1>REACT FLIX</h1>
      <div className='header'>
        <Heading heading="Movies"></Heading>
        <Search searchValue={searchValue}
          setSearchValue={setSearchValue}></Search>
      </div>
      <div className='list-container'>
        <MovieList movies={movies}
                   handleClick={addToFavourites}
          AddFavourites={AddFavourites}></MovieList>
      </div>
      <div className='favourites'>
      <Heading heading="Favourites"></Heading>
      <div className='list-container'>
        <MovieList movies={favourites}
                   handleClick={removeFromFavourites}
          AddFavourites={RemoveFavourites}></MovieList>
      </div>
      </div>
    </div>
  );
}

export default App;
