import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
            <NavLink className="navbar-brand" to="/">Student Management System</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink className="nav-link" to="/">Students</NavLink>
                <NavLink className="nav-link" to="/classes">Classes</NavLink>
                <NavLink className="nav-link" to="/school">School</NavLink>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;