import { useState, useEffect } from 'react';
import MovieList from '../../src/components/MovieList';
import "./styles.css"
import Heading from './components/Heading';
import Search from './components/Search';

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
      <h1>React Flix</h1>
      <div className='header'>
        <Heading heading="Movies"></Heading>
        <Search searchValue={searchValue} setSearchValue={setSearchValue}></Search>
      </div>
      <div className='list-container'>
        <MovieList movies={movies}></MovieList>
      </div>
    </div>
  );
}

export default App;
