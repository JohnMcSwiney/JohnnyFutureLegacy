import React from 'react'
import './style.css'
import {useMyContext} from "../../context/FLContext";

export default function Search() {

  const { searchValue, setSearchValue} = useMyContext();


  return (
    <div>search
      { searchValue !== null ? 
      <h2> Searching for: {searchValue}</h2>
        :
      <h2>Search Value Empty</h2>
      }
    </div>

  )
}
