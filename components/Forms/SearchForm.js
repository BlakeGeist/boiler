import React from 'react'

const SearchForm = ({ onSubmit, inputVal, handleClearForm, handleInputChange }) => (
    <form onSubmit={onSubmit}>
        <label htmlFor="searchTerm">Keyphrase: </label>
        <input type="text" onChange={handleInputChange} value={inputVal} name="searchTerm" id="searchTerm" />
        <input type="submit" />
        <button onClick={handleClearForm}>Clear</button>
    </form>
)

export default SearchForm