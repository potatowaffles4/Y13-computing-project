import { Link } from 'react-router-dom'

function SearchResultItem(props) {
    return <div key={props.id} className="search-result">
        Artist: {props.artist}<br />
        Title: <Link to={`/artwork/${props.id}`}>{props.title}</Link><br />
    </div>
}

export default SearchResultItem
