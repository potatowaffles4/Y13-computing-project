import './App.css';
import { useState } from 'react'
import SearchResultItem from "./SearchResultItem"

function AddArtist() {
    // const [results, setResults] = useState()
    const [fName, setFName] = useState()
    const [lName,setLName] = useState()
    const [yearBorn, setYearBorn] = useState()
    const [whereBorn, setWhereBorn] = useState()
    const [live, setLive] = useState()
    const [knownFor, setKnownFor] = useState()
    const [yearDied, setYearDied] = useState()
    const [artPeriod, setArtPeriod] = useState()

    const [tags, setTags] = useState({})

    const setTag = (tagName, tagValue) => {
        console.log({tagName, tagValue})
        setTags({
            ...tags,
            [tagName]: tagValue,
        })
    }

    const toneTags = [
        { displayName: "Light", tagName: "tone-light" },
        { displayName: "Dark", tagName: "tone-dark" },
        { displayName: "Mid-Tone", tagName: "tone-mid-tone" },
        { displayName: "Monochrome", tagName: "tone-monochrome"},
        { displayName: "Contrasting", tagName: "tone-contrasting"},
        { displayName: "uniform", tagName: "tone-uniform"},
    ]

    const brushstrokeTags = [
        { displayName: "Heavy", tagName: "brush-heavy"},
        { displayName: "soft", tagName: "brush-soft"},

    ]
    const toneTagControls = toneTags.map(({displayName, tagName}) => {
        return <div>
            <label>{displayName}</label>
            <input id={tagName} type="checkbox" onChange={event => setTag(tagName, event.target.checked)}/>
        </div>
    })


    function handleSubmit(event) {
      event.preventDefault()
      console.log({event})
      const body = {
            fName,
            lName,
            yearBorn,
            whereBorn,
            live,
            knownFor,
            yearDied,
            artPeriod,
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
                    <label>First name:
                    <input id="Fname" type="text" onChange={event => setFName(event.target.value)} /></label>
                </div>
                <div>
                    <label>Last name:
                    <input id="Lname" type="text" onChange={event => setLName(event.target.value)} /></label>
                </div>

                <div className="input-block">
                    <label>When they were born:
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

                <div className="input-block">
                    <label for="period">Art period:
                        <select name="period" id = "artPeriod" onChange={event => setArtPeriod(event.target.value)}>
                            <option value = "artPeriod"> ----</option>
                            <option value = "Prehistoric">Prehistoric art (~40,000–4,000 B.C.)</option>
                            <option value = "Ancient">Ancient art (4,000 B.C.–A.D. 400)</option>
                            <option value = "Medieval">Medieval Art (500–1400)</option>
                            <option value = "Renaissance">Renaissance (1400–1600) </option>
                            <option value = "Mannerism ">Mannerism (1527–1580)</option>
                            <option value = "Baroque">Baroque (1600–1750)</option>
                            <option value = "Rococo"> Rococo (1699–1780)</option>
                            <option value = "Neoclassicism ">Neoclassicism (1750–1850)</option>
                            <option value = "Romanticism ">Romanticism (1780–1850)</option>
                            <option value = "Realism ">Realism (1848–1900)</option>
                            <option value = "Modern">Modern (1860 - 1975)</option>
                            <option value = "ArtNouveau ">Art Nouveau (1890–1910)</option>
                            <option value = "Impressionism">Impressionism (1865–1885)</option>
                            <option value = "PImpressionism">Post Impressionism (1885–1910)</option>
                            <option value = "Fauvism">Fauvism (1900–1935)</option>
                            <option value = "Expressionism ">Expressionism (1905–1920)</option>
                            <option value = "Cubism">Cubism (1907–1914)</option>
                            <option value = "Surrealism"> Surrealism (1916–1950)                            </option>
                            <option value = "AExpressionism"> Abstract Expressionism (1940s–1950s)                            </option>
                            <option value = "Op">Op(tical) Art (1950s–1960s) </option>
                            <option value = "Pop"> Pop Art (1950s–1960s)</option>
                            <option value = "ArtePovera">Arte Povera (1960s) </option>
                            <option value = "Minimalism">Minimalism (1960s–1970s)</option>
                            <option value = "Conceptual">Conceptual Art (1960s–1970s)</option>
                            <option value = "Contemporary">Contemporary Art (1970–present)</option>
                        </select>
                        <input id="artPeriod" type="text" onChange={event => setArtPeriod(event.target.value)}/>
                    </label>
  
                </div>
                <div className="input-block">
                    
                    <label><u>Tone</u></label>
                    <br />

                    {toneTagControls}
                </div>


                <input type="submit" />
            </form>
        </div>
        {/* {resultsOutput} */}
    </div>
}

export default AddArtist
