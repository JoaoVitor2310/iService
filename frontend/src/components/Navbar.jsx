import React from 'react'
import './Navbar.css';

import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav id='nav'>
            <Link to='/'>iService</Link>
            <form>
                <BsSearch />
                <input type="text" />
            </form>
            <ul id='nav-links'>
                <li>
                    <NavLink to='/'>
                        <BsHouseDoorFill />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login'>
                        Entrar
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/register'>
                        Cadastrar
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar