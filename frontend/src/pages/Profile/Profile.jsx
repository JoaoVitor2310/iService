import React from 'react'
import './Profile.css';

//Components
import Message from '../../components/Message'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'
import NoPhotos from '../../components/NoPhotos';
import LoadingInput from '../../components/LoadingInput';
import LoadingPage from '../../components/LoadingPage';

//Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

//Redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.user);
  const { user: userAuth } = useSelector(state => state.auth);
  const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector(state => state.photo);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const [editId, setEditId] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id)); //Gets user details sending the id from url
    dispatch(getUserPhotos(id)); //Gets user photos sending the id from url
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0]; // Pega a imagem enviada no input
    setImage(image);
  }

  const resetComponentMessage = () => { // Reseta o componente de mensagem
    setTimeout(() => {
      dispatch(resetMessage())
    }, 4000)
  }

  const submitHandle = async (e) => { // Vai criar um objeto com os dados de edição, fazer o dispatch pra enviar e resetar o estado e a mensagem.
    e.preventDefault();
    const photoData = {
      title,
      image
    }

    const formData = new FormData();
    Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));
    dispatch(publishPhoto(formData));

    setTitle('');
    resetComponentMessage();
  }

  const handleDelete = (id) => { // Deleta a foto, reseta a mensasgem e retira o formulário(se tiver).
    dispatch(deletePhoto(id));
    resetComponentMessage();
    if (!editPhotoForm.current.classList.contains('hide')) {
      hideOrShowForms();
    }
  }

  const hideOrShowForms = () => { // Mostra ou esconde o form usando o toggle(tira ou coloca a classe) no hide, classe no index css
    newPhotoForm.current.classList.toggle('hide');
    editPhotoForm.current.classList.toggle('hide');
  }

  const handleUpdate = (e) => { // Cria um objeto com os dados de edição, faz um dispatch pro backend e retira a mensagem de resposta
    e.preventDefault();
    const photoData = {
      title: editTitle,
      id: editId
    }
    dispatch(updatePhoto(photoData));
    resetComponentMessage();
  }


  const handleEdit = (photo) => { // Vai mostrar o formulário de edição e mostrar os dados nos inputs
    if (editPhotoForm.current.classList.contains('hide')) {
      hideOrShowForms();
    }
    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.url);
  }

  const handleCancelEdit = (e) => { // Cancela a edição tirando a classe hide
    e.preventDefault();
    hideOrShowForms();
  }

  // const handleFollow = () => { // Segue o usuário
  //   dispatch(followUser(id));
  // }

  return (
    <div id='profile'>
      <LoadingPage loading={loadingPhoto} />
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
                <input type="text" placeholder='Insira um título' onChange={e => setTitle(e.target.value)} value={title || ''} />
              </label>
              <label>
                <span>Imagem</span>
                <input type="file" placeholder='Insira uma foto' onChange={handleFile} />
              </label>
              <LoadingInput loading={loading} value='Postar' />
              {errorPhoto && (<Message msg={errorPhoto} type='error' />)}
              {messagePhoto && (<Message msg={messagePhoto} type='success' />)}
            </form>
          </div>
          <div className='edit-photo hide' ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={editImage} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input type="text" onChange={e => setEditTitle(e.target.value)} value={editTitle || ''} placeholder='Insira o novo título' />
              <input type="submit" value='Atualizar' />
              <button className='cancel-btn' onClick={handleCancelEdit}>Cancelar edição</button>
            </form>
          </div>
          {errorPhoto && (<Message msg={errorPhoto} type='error'></Message>)}
          {messagePhoto && (<Message msg={messagePhoto} type='success'></Message>)}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos && photos.map(photo => (
            <div className="photo" key={photo._id}>
              {photo.title && (
                <img src={photo.url} alt={photo.title} />
              )}
              {id === userAuth._id ? (
                <div className="actions">
                  <Link to={`/photos/${photo._id}`}>
                    <BsFillEyeFill />
                  </Link>
                  <BsPencilFill onClick={() => handleEdit(photo)} />
                  <BsXLg onClick={() => handleDelete(photo._id)} />
                </div>
              ) : (
                <Link to={`/photos/${photo._id}`}><BsFillEyeFill /></Link>
              )}
            </div>
          ))}
          <NoPhotos photos={photos} msg='Ainda não há fotos publicadas.' loading={loading}/>
        </div>
      </div>
    </div>
  )
}

export default Profile