import './App.css';
import SearchResultItem from './SearchResultItem'
import { useState } from 'react'

function App() {
  const [results, setResults] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event)
    const searchTerm = event.target[0].value
    console.log({searchTerm})
    console.log({'searchTerm': searchTerm})

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

  return (
    <div>
      <div class = "search">
        <form onSubmit={handleSubmit}>
          <label>Search:
            <input id="searchText" type="text" />
          </label>
          <input type="submit" />
        </form>
      </div>


      <h1>Art Website</h1>
      <h2>this is a website to find art and artists</h2>

      <div id="results">
        <label>Results:</label>
        {/*
        results will contain something like this, i.e. as per 'artworks' from main.py

        [
        {
            "id": "1",
            "artist": "Monet",
            "title": "Water Lillies",
            "year": "1920",
            "tags": ["abc", "ghi"]
        },
        {
            "id": "2",
            "artist": "Van Gogh",
            "title": "Starry Night",
            "year": "1889",
            "tags": ["def", "ghi"]
        }
        ]

        results.map takes each element (artwork), and creates a React component <SearchResultItem />

        As a result, we now have an array of <SearchResultItem />, one for each artwork

        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        */}
        {results.map(result => <SearchResultItem key={result.id} {...result} />)}
      </div>
    </div>
  );
}

export default App;
