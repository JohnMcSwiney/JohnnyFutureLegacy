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
      <form className="search--cont" onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='What do you want to see today?'
          value={searchTerm}
          onChange={handleChange}
          className='search--input'
        />
        <button type='submit' className='search--button'><BiSearchAlt2/></button>
      </form>
  )
}

export default SearchBar
