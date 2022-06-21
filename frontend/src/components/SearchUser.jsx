import React from 'react'
import { Link } from 'react-router-dom';
import './SearchUser.css';
import UserOccupation from './UserOccupation';

const SearchUser = ({ user }) => {
  return (
    <Link to={`/users/${user._id}`} >
      <div id='overall'>
        <div className='photo'>
          <img className='search-photo' src={user.profileImage} alt="" />
        </div>
        <div className='details'>
          <p>{user.name}</p>
          <p>Seguidores: {user.followers?.length}</p>
          <UserOccupation user={user} />
        </div>
      </div>
    </Link>
  )
}

export default SearchUser