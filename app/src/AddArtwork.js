import './App.css';
import { useState } from 'react'
import SearchResultItem from "./SearchResultItem"

function AddArtist() {
    // const [results, setResults] = useState()
    const [name, setName] = useState()
    const [artwork, setArtwork] = useState
    const [yearMade, setYearMade] = useState()



    function handleSubmit(event) {
      event.preventDefault()
      console.log({event})
      const body = {
            name,
            artwork,
            yearMade
        }
        console.log({body})
  
      fetch(`http://localhost:8000/artist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
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


    return <div>
        <div className = "search">
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label>Name:
                    <input id="name" type="text" onChange={event => setName(event.target.value)} /></label>
                </div>
               
                <div className="input-block">
                    <label>When it was made:
                    <input id="yearBorn" type="date" onChange={event => setYearBorn(event.target.value)}/></label>
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
                    <input id="yearDied" type="date" onChange={event => setYearDied(event.target.value)}/></label>
                </div>

                


                <input type="submit" />
            </form>
        </div>
        {/* {resultsOutput} */}
    </div>
}

export default AddArtist
