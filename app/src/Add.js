import './App.css';
import { useState } from 'react'
import SearchResultItem from "./SearchResultItem"

function Add() {
    // const [results, setResults] = useState()
    const [name, setName] = useState()
    const [yearBorn, setYearBorn] = useState()
    const [whereBorn, setWhereBorn] = useState()
    const [live, setLive] = useState()
    const [knownFor, setKnownFor] = useState()
    const [yearDied, setYearDied] = useState()
    const [artPeriod, setArtPeriod] = useState()


    function handleSubmit(event) {
      event.preventDefault()
      console.log({event})
      const searchTerm = event.target[0].value
      console.log({searchTerm})
  
      fetch(`http://localhost:8000/artist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                yearBorn,
                whereBorn,
                live,
                knownFor,
                yearDied,
                artPeriod,
            })
        }
      )
        .then(result => {
          console.log({result})
          result.json().then(parsed => {
            console.log({parsed})
            // setResults(parsed.results.items)
          })
        })
        .catch(err => console.error(err))
    }

    console.log({name})

    return <div>
        <div className = "search">
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label>Artist name:
                    <input id="name" type="text" onChange={event => setName(event.target.value)} /></label>
                </div>

                <div className="input-block">
                    <label>Year they were born:
                    <input id="yearBorn" type="text" onChange={event => setYearBorn(event.target.value)}/></label>
                </div>

                <div className="input-block">
                    <label>Where they were born:
                    <input id="whereBorn" type="text" onChange={event => setWhereBorn(event.target.value)}/></label>
                </div>

                <div className="input-block">
                    <label>Where they live/lived:
                    <input id=":live" type="text" onChange={event => setLive(event.target.value)}/></label>
                </div>

                <div className="input-block">
                    <label>What they were known for/ their most popular work:
                    <input id="knownFor" type="text" onChange={event => setKnownFor(event.target.value)}/></label>
                </div>

                <div className="input-block">
                    <label>When they died:
                    <input id="yearDied" type="text" onChange={event => setYearDied(event.target.value)}/></label>
                </div>

                <div className="input-block">
                    <label>Art period:
                    <input id="artPeriod" type="text" onChange={event => setArtPeriod(event.target.value)}/></label>
                </div>


                <input type="submit" />
            </form>
        </div>
        {/* {resultsOutput} */}
    </div>
}

export default Add
