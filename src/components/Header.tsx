import { useContext } from "react";
import { Link } from "react-router-dom";
import { JwtContext } from "../routes/Root";

const Header = () => {
    const {jwtResponse, setJwtResponse} = useContext(JwtContext);
    
    return (
        <header>
            <nav className="nav-bar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white box-shadow mb-3">
                <div className="container-fluid">
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link page-font" to="/">RealtyTrends</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link page-font" to="pricestatistics">Statistics</Link>
                            </li>
                            <li className="nav-item" style={{'display': jwtResponse==null ? 'none' : ''}}>
                                <Link className="nav-link page-font" to="mytriggers">My Triggers</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item" style={{'display': jwtResponse==null ? '' : 'none'}}>
                                <Link className="nav-link page-font" to="register" >Register</Link>
                            </li>
                            <li className="nav-item" style={{'display': jwtResponse==null ? '' : 'none'}}>
                                <Link className="nav-link page-font" to="login">Login</Link>
                            </li>
                            <li className="nav-item" style={{'display': jwtResponse==null ? 'none' : ''}}>
                                <Link className="nav-link page-font" to="login">Log out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;