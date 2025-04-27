import './App.css';
import { useState } from 'react'
import SearchResultItem from "./SearchResultItem"

function Home() {
    const [results, setResults] = useState()

    function handleSubmit(event) {
      event.preventDefault()
      console.log({event})
      const searchTerm = event.target[0].value
      console.log({searchTerm})
  
      fetch(`http://localhost:8000/art/search?keywords=${searchTerm}`)
        .then(result => {
          console.log({result})
          result.json().then(parsed => {
            console.log({parsed})
            setResults(parsed.results.items)
          })
        })
        .catch(err => console.error(err))
    }

    let resultsOutput

    if (results === undefined) {
        resultsOutput = "Please search for an artwork"
    } else if (results.length === 0) {
        resultsOutput = "There were no results for your search"
    } else {
        resultsOutput = results.map(result => <SearchResultItem key={result.id} {...result} />)
    }

    return <div>
        <div className = "search">
            <form onSubmit={handleSubmit}>
                <label>Search:
                <input id="searchText" type="text" />
                </label>
                <input type="submit" />
            </form>
        </div>
        {resultsOutput}
    </div>
}

export default Home
