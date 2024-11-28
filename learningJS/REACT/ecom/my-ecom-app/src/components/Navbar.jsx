import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <nav>
            <h1>Rahul's E-com.-App</h1>
            <ul>
                <li><Link to="">Home</Link></li>
                <li><Link to="/Products">Products</Link></li>
                <li><Link to="/Cart">Cart</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Signup">Signup</Link></li>
            </ul>
        </nav>
    );
};
export default Navbar;