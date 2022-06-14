import React from 'react'
import './Navbar.css';

//Components
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';

//Hooks
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux
import { logout, reset } from '../slices/authSlice';

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate('/login');
    }

    return (
        <nav id='nav'>
            <Link to='/'>iService</Link>
            <form id='search-form'>
                <BsSearch />
                <input type="text" />
            </form>
            <ul id='nav-links'>
                {auth ? (
                    <>
                        <li className='house-icon'>
                            <NavLink to='/'>
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/foryou`}>
                                <BsSearch />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>

                        )}
                        <li>
                            <NavLink to='/profile'>
                                <BsFillPersonFill />
                            </NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar