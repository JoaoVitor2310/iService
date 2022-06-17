import React from 'react'
import './Profile.css';

//Components
import Message from '../../components/Message'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
// import NoPhotos from '../../components/NoPhotos';
import LoadingInput from '../../components/LoadingInput';
import LoadingPage from '../../components/LoadingPage';

//Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

//Redux
import { getUserDetails } from '../../slices/userSlice';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.user);
  const { user: userAuth } = useSelector(state => state.auth);

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id)); //Gets user details sending the id from url
    // dispatch(getUserPhotos(id)); //Gets user photos sending the id from url
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0]; // Pega a imagem enviada no input
    // setImage(image);
  }

  const submitHandle = async (e) => { // Vai criar um objeto com os dados de edição, fazer o dispatch pra enviar e resetar o estado e a mensagem.
    // e.preventDefault();
    // const photoData = {
    //   title,
    //   image
    // }

    // const formData = new FormData();
    // Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));
    // dispatch(publishPhoto(formData));

    // setTitle('');
    // resetComponentMessage();
  }

  return (
    <div id='profile'>
      {/* <LoadingPage loading={loadingPhoto} /> */}
      <div className='profile-header'>

        {user.profileImage && (
          <img src={user.profileImage} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          {/* {user.followers && (
            <>
            <p>Seguidores: {user.followers.length}</p>
            <p>Seguindo: {user.following.length}</p>
            </>
            )}
            {id !== userAuth._id && (
              <>
              <button className='follow' onClick={handleFollow}>{user.followers?.includes(userAuth._id) ? 'Seguindo' : 'Seguir'}</button>
              </>
            )} */}
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe um momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto</span>
                {/* <input type="text" placeholder='Insira um título' onChange={e => setTitle(e.target.value)} value={title || ''} /> */}
              </label>
              <label>
                <span>Imagem</span>
                <input type="file" placeholder='Insira uma foto' onChange={handleFile} />
              </label>
              <LoadingInput loading={loading} value='Postar' />
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile