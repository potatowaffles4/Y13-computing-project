import { Link } from 'react-router-dom'

function SearchResultItem(props) {
    const type = props?.type

    let tile = <div key={props.id} className="search-result">The type of result is not recognised ({type}/{props.id})</div>

    console.log({props})

    if (type === "artist") {
        tile = <div key={props.id} className="search-result">
            <img src={props.imageUrl} className="thumbnail-image"></img>
            Artist: <Link to={`/artist/${props.id}`}>{props.fName} {props.lName}</Link><br />
        </div>
    }

    return tile
}

export default SearchResultItem
