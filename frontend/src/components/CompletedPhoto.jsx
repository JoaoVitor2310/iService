
import React from 'react'

//Components
import PhotoItem from './PhotoItem';
import LikeContainer from './LikeContainer';
import { Link } from 'react-router-dom';

const CompletedPhoto = ({photo, user, button}) => {
  return (
    <div>
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} />
        {button && (
            <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        )}
    </div>
    
  )
}

export default CompletedPhoto
