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
            />

        </>
    )
}

export default Search