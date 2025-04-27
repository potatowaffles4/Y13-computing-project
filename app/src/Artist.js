import './App.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Artist() {
    const { id } = useParams()
    const [artist, setArtist] = useState()

    useEffect(() => {
        if (artist === undefined) {
            fetch(`http://localhost:8000/artist/${id}`)
            .then(result => {
              console.log({result})
              result.json().then(parsed => {
                console.log({parsed})
                setArtist(parsed)
              })
            })
            .catch(err => console.error(err))
        }
    })

    if (artist === undefined) {
        return <div>Loading...</div>
    }

    return <div >
        {/* <div>id {id}</div> */}
        <div className='artistTextName'>{artist.fName} {artist.lName}</div>
        <div className='artistText'>
            <div >{artist.lName} was born in {artist.whereBorn} </div>
            <div >They were born in {artist.yearBorn}</div>
            <div >And then died in {artist.yearDied}</div>
            <div >They lived in {artist.live}</div>
            <div >They were best know for their painting named {artist.knownFor}</div>
            <div >Art Period: {artist.artPeriod}</div>

        </div>
        
        <img src={artist.imageUrl} className="artist-image" />
    </div>
}

export default Artist
