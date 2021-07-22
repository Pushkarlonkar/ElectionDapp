import React from 'react'
import './Navbar.css'
const Navbar = ({address}) => {
    return (
        <div >
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <a href="" className="brand-logo center">ELECTIONS</a>
                    <ul>
                        <li className = "right address hide-on-med-and-down">{ address}</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
