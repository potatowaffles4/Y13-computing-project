import './App.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Artwork() {
    const { id } = useParams()
    const [artwork, setArtwork] = useState()

    useEffect(() => {
        if (artwork === undefined) {
            fetch(`http://localhost:8000/artwork/${id}`)
            .then(result => {
              console.log({result})
              result.json().then(parsed => {
                console.log({parsed})
                setArtwork(parsed)
              })
            })
            .catch(err => console.error(err))
        }
    })

    if (artwork === undefined) {
        return <div>Loading...</div>
    }

    return <div>
        <div>id {id}</div>
        <div>Title: {artwork.title}</div>
        <div>Tags: {artwork.tags.join(', ')}</div>
        <div className="tags">Tags: {artwork.tags.map(tag => <div className="tag">{tag}</div>)}</div>
    </div>
}

export default Artwork
