import React from 'react'

const Search = (props) => {
    return (
        <div>
            <input type='text' placeholder='Search All Players' name='search' value={props.search} onChange={props.handleSearch} />
        </div>
    )
}

export default Search;
