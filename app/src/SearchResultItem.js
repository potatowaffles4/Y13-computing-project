import { Link } from 'react-router-dom'

function SearchResultItem(props) {
    return <div key={props.id} className="search-result">
        Artist: <Link to={`/artist/${props.artist.id}`}>{props.artist.name}</Link><br />
        Title: <Link to={`/artwork/${props.id}`}>{props.title}</Link><br />
    </div>
}

export default SearchResultItem
