import React from 'react';
import './LikeContainer.css';
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import { useLike } from '../hooks/useLike';

const LikeContainer = ({photo, user}) => {
    const likePhoto = useLike(photo);

    return (
    <div className='like'>
        {photo.likes && user && (
            <>
                {photo.likes.includes(user._id) ? (
                    <BsHeartFill />
                ) : (
                    <BsHeart onClick={() => likePhoto()}/>
                )}
                <p>{photo.likes.length} like(s)</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer