import { useState, useEffect } from 'react';
import MovieList from '../../src/components/MovieList';
import "./styles.css"
import Heading from './components/Heading';
import Search from './components/Search';
import AddFavourites from './components/AddFavourites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue,setSearchValue] = useState("")

  //query OMDB
  const getMovies = async (searchValue) => {
    try {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a2afdd9f`
      const response = await fetch(url)
      if(!response.ok){
        throw new Error("OMDB Error")
      }
      const responseJson = await response.json()
      if(responseJson.Search){
        console.log(responseJson.Search)
        setMovies(responseJson.Search)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //on page load
  useEffect(() => {
    getMovies(searchValue)
  }, [searchValue])

  return (
    <div className='container'>
      <h1>REACT FLIX</h1>
      <div className='header'>
        <Heading heading="Movies"></Heading>
        <Search searchValue={searchValue} setSearchValue={setSearchValue}></Search>
      </div>
      <div className='list-container'>
        <MovieList movies={movies} AddFavourites={AddFavourites}></MovieList>
      </div>
    </div>
  );
}

export default App;
