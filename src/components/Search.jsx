const Search = ({searchValue,setSearchValue})=>{
    return(
        <div className="search">
            <input type="text" 
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            placeholder="Type to search..."></input>
        </div>
    )
}

export default Search