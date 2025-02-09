import './App.css'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
    return (
        <div>
            <h1>Gallery of Art</h1>
            <div className="home-buttons">
                <Link className="navigation-link" to="/">Home</Link>
                <Link className="navigation-link" to="/add">Add</Link>
            </div>
            <div className="content-area">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
