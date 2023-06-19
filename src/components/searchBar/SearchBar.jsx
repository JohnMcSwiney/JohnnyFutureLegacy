import React, { useState } from 'react'
import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className="search--cont">
      <form className='search--input' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleChange}
          className='search--input'
        />
        <button type='submit' className='search--button'><BiSearchAlt2/></button>
      </form>
    </div>
  )
}

export default SearchBar
