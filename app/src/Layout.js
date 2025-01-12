import './App.css'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
    return (
        <div>
            <h1>Gallery of Art</h1>
            <Link to="/">Home</Link>
            <h2>this is a website to find art and artists</h2>
            <div className="content-area">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
