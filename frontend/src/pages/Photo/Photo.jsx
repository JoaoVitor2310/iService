import React from 'react'
import './Photo.css';

//Components
import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import CompletedPhoto from '../../components/CompletedPhoto';

//Hooks
import { useEffect, useState } from 'react';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getPhoto, comment } from '../../slices/photoSlice';

const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector(state => state.auth);
    const { photo, loading, error, message } = useSelector(state => state.photo);

    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    const handleComment = (e) => {
        e.preventDefault();
        const commentData = {
            comment: commentText,
            id: photo._id
        }
        dispatch(comment(commentData));
        setCommentText('');
        resetMessage();
    }

    return (
        <div id='photo'>
            <LoadingPage loading={loading} />
            {!loading && (
                <CompletedPhoto photo={photo} user={user} />
            )}
            <div className="message-container">
                {error && <Message msg={error} type='error' />}
                {message && <Message msg={message} type='success' />}
            </div>
            <div className="comments">
                {photo.comments && (
                    <>
                        <h3>Comentários: ({photo.comments.length})</h3>
                        <form onSubmit={handleComment}>
                            <input type="text" placeholder='Insira o seu comentário' onChange={e => setCommentText(e.target.value)} value={commentText || ''} />
                            <input type="submit" value='Enviar' />
                        </form>
                        {photo.comments.length === 0 ? (<p>Não há comentários</p>) : (
                            photo.comments.map(comment => (
                                <div className="comment" key={comment.comment}>
                                    <div className="author">
                                        {comment.userImage && (
                                            <img src={comment.userImage} alt={comment.userName} />
                                        )}
                                        <Link to={`/users/${comment.userId}`}>
                                            <p>{comment.userName}</p>
                                        </Link>
                                    </div>
                                    <p>{comment.comment}</p>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Photo