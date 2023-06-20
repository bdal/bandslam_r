import React from 'react'

function SearchBar() {
    return (
        <form>
            <input type="text" placeholder='Search...' />
        </form>
    )
}

const SearchTable = () => {
  return (
    <div>
        <SearchBar/>
    </div>
  )
}

export default SearchTable