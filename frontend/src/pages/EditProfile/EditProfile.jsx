import './EditProfile.css'
import React from 'react'

import { upload } from '../../utils/config'

//Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

//Components
import Message from '../../components/Message';
import LoadingInput from '../../components/LoadingInput'

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [occupation, setOccupation] = useState('');

    const dispatch = useDispatch();
    const { user, loading, error, message } = useSelector(state => state.user);

    //Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    //Fill form with user data
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
            setOccupation(user.occupation);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleFile = (e) => {
        e.preventDefault();
    }

    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' onChange={e => setName(e.target.value)} value={name || ''} />
                <input type="email" placeholder='Email' disabled value={email || ''} />
                <label>
                    <span>Imagem de Perfil</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio</span>
                    <input type="text" placeholder='Descriçao do perfil' onChange={e => setBio(e.target.value)} value={bio || ''} />
                </label>
                <label>
                    <span>Deseja alterar a senha?</span>
                    <input type="password" placeholder='Digite a sua nova senha' onChange={e => setPassword(e.target.value)} value={password || ''} />
                </label>
                <label>
                    <span>Adicionar função:</span>
                {/* OBS: Select improvisado, iremos melhorar depois via api */}
                <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setOccupation(e.target.value)}>
                    <option value="DEFAULT" disabled>Adicionar função:</option>
                    <option value="user" >Usuário</option>
                    <option value="bricklayer">Pedreiro</option>
                    <option value="electrician">Eletricista</option>
                    <option value="painter">Pintor</option>
                    <option value="poolCleaner">Piscineiro</option>
                    <option value="gardener">Jardineiro</option>
                    <option value="trainer">Adestrador</option>
                </select>
                {/* OBS: Select improvisado, iremos melhorar depois via api */}
                </label>
                <label>
                    <span>Remover função:</span>
                {/* OBS: Select improvisado, iremos melhorar depois via api */}
                <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setOccupation(e.target.value)}>
                    <option value="DEFAULT" disabled>Remover função:</option>
                    {/* {user.occupation && user.occupation.map( => (
                        <option value="trainer">Adestrador</option>
                    ))} */}
                </select>
                {/* OBS: Select improvisado, iremos melhorar depois via api */}
                </label>
                <LoadingInput loading={loading} value='Atualizar' />
                {error && (<Message msg={error} type='error' />)}
                {message && (<Message msg={message} type='success' />)}
            </form>
        </div>
    )
}

export default EditProfile