import "./styles.css"
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Heading from './components/Heading';
import Search from './components/Search';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [favourites, setFavourites] = useState([])

  //query OMDB
  const getMovies = async (searchValue) => {
    try {
      //read api key
      const apikey = import.meta.env.VITE_OMDB_API_KEY
      //omdb query 
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${apikey}`
      const response = await fetch(url)
      console.log("response", response)
      //if response has any error
      if (!response.ok) {
        throw new Error("OMDB Error")
      }
      const responseJson = await response.json()
      console.log("responsejson", responseJson)
      //if any movies found, only then update -- to avoid null error
      if (responseJson.Search) {
        console.log("movies", responseJson.Search)
        setMovies(responseJson.Search)
      }
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  //Only on page initial load - read from local storage
  useEffect(() => {
    //check if user has saved any favourites - otherwise empty array to avoid null error
    const newList = JSON.parse(localStorage.getItem("react-movie-favourites")) || []
    console.log('initial-load-local-storage', newList)
    //set the local favourites
    setFavourites(newList)
  }, [])

  //as soon as search value changes query
  useEffect(() => {
    console.log("search query", searchValue)
    getMovies(searchValue)
  }, [searchValue])

  //add
  const addToFavourites = (movie) => {
    //update favourites list
    const newList = [...favourites, movie]
    console.log("add-favourites", newList)
    setFavourites(newList)
    localStorage.setItem("react-movie-favourites", JSON.stringify(newList))
  }

  //remove
  const removeFromFavourites = (movie) => {
    const newList = favourites.filter(item => item.imdbID !== movie.imdbID)
    console.log("remove-favourites", newList)
    setFavourites(newList)
    localStorage.setItem("react-movie-favourites", JSON.stringify(newList))
  }

  return (
    <div className="app">
      <h1>REACT FLIX</h1>
      <div className="top">
        <div className="heading-search">
          <Heading heading="Movies"></Heading>
          <Search searchValue={searchValue}
            setSearchValue={setSearchValue}></Search>
        </div>
      <MovieList movies={movies}
        handleClick={addToFavourites}
        Favourites={AddFavourites}></MovieList>
      </div>
      <div className="bottom">  
      <Heading heading="Favourites"></Heading>
      <MovieList movies={favourites}
        handleClick={removeFromFavourites}
        Favourites={RemoveFavourites}></MovieList>
      </div>  
    </div>
  );
}

export default App;
