function SearchResultItem(props) {
    return <div key={props.id}>
        Artist: {props.artist}<br />
        Title: {props.title}<br />
        <hr />
    </div>
}

export default SearchResultItem
