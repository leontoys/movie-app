const Search = ({ searchValue, setSearchValue }) => {
    return (
        <>
            <input
                type="text"
                inputMode="text"
                autoComplete="off"
                value={searchValue}
                onKeyUp={(e) => {
                    console.log("change fired", e.target.value);
                    setSearchValue(e.target.value);
                }}
                placeholder="Type to search..."
            />

        </>
    )
}

export default Search