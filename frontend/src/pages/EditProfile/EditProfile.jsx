import './EditProfile.css'
import React from 'react'

//Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

//Components
import Message from '../../components/Message';
import LoadingInput from '../../components/LoadingInput'
import OccupationSelect from '../../components/OccupationSelect';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [addOccupation, setAddOccupation] = useState('');
    const [removeOccupation, setRemoveOccupation] = useState('');

    const dispatch = useDispatch();
    const { user, loading, error, message } = useSelector(state => state.user);

    //Loads user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    //Fills form with user data
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setCellPhone(user.cellPhone);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name //Name is required
        }

        if (profileImage) {
            userData.profileImage = profileImage;
        }
        if (bio) {
            userData.bio = bio;
        }
        if (cellPhone) {
            userData.cellPhone = cellPhone;
        }
        if (password) {
            userData.password = password;
        }

        if (addOccupation) {
            userData.addOccupation = addOccupation;
        }

        if (removeOccupation) {
            userData.removeOccupation = removeOccupation;
        }

        const formData = new FormData();
        Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage())
        }, 4000)
    }

    const handleFile = (e) => {
        const image = e.target.files[0];
        setPreviewImage(image);
        setProfileImage(image);
    }

    return (
        <div id='edit-profile'>
            <h2>Edite seus dados</h2>
            <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você.</p>
            {(user.profileImage || previewImage) && ( //If user has a profileImage or are changing his profile image
                <img className='profile-image' src={
                    previewImage //If the user is trying to change his profileImage
                        ? URL.createObjectURL(previewImage) //Creates a temporary object with image preview
                        : user.profileImage //If not, shows the profileImage
                }
                    alt={user.name} />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' onChange={e => setName(e.target.value)} value={name || ''} />
                <input type="email" placeholder='Email' disabled value={email || ''} />
                <input type="number" maxLength='11' minLength='10' placeholder='Celular' onChange={e => setCellPhone(e.target.value)} value={cellPhone || ''} />
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
                    <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setAddOccupation(e.target.value)}>
                        <OccupationSelect user={user} type='add' />
                    </select>
                </label>
                <label>
                    <span>Remover função:</span>
                    <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setRemoveOccupation(e.target.value)}>
                        <OccupationSelect user={user} type='remove' />
                    </select>
                </label>
                <LoadingInput loading={loading} value='Atualizar' />
                {error && (<Message msg={error} type='error' />)}
                {message && (<Message msg={message} type='success' />)}
            </form>
        </div>
    )
}

export default EditProfile