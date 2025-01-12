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

    return <div>
        <div>id {id}</div>
        <div>Name: {artist.name}</div>
        <div>country: {artist.country}</div>
        <div>image_url: {artist.image_url}</div>
    </div>
}

export default Artist
