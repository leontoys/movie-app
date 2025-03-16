const Search = ({searchValue,setSearchValue})=>{
    return(
        <>
            <input type="text" 
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            placeholder="Type to search..."></input>
        </>
    )
}

export default Search