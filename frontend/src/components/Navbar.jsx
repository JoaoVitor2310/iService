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

    const [query, setQuery] = useState('');

    const handleLogout = () => {
        const decision = window.confirm("Você deseja deslogar?");
        if(decision){
            dispatch(logout());
            dispatch(reset());
            navigate('/login');
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            return navigate(`/search?q=${query}`) //Navigates to the URl with the query param
        }
    }

    return (
        <nav id='nav'>
            <Link to='/' >iService</Link>
            <form id='search-form' onSubmit={handleSearch}>
                <BsSearch />
                <input type="text" placeholder='Pesquisar' className='search' onChange={e => setQuery(e.target.value)} />
            </form>
            <ul id='nav-links'>
                {auth ? (
                    <>
                        <li className='house-icon'>
                            <NavLink to='/' >
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/foryou`} >
                                <BsSearch />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`} >
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>

                        )}
                        <li>
                            <NavLink to='/profile' >
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
                            <NavLink to='/login' >
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/register' >
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