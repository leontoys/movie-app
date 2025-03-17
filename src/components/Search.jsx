const Search = ({ searchValue, setSearchValue }) => {
    return (
        <>
            <input
                type="text"
                inputMode="text"
                autoComplete="off"
                value={searchValue}
                onInput={(e) => {
                    setSearchValue(e.target.value);
                }}
                placeholder="Type to search..."
            />{searchValue}

        </>
    )
}

export default Search