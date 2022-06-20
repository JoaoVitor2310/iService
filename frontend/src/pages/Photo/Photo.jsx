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

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

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
        </div>
    )
}

export default Photo