import './ForYou.css';

//Components
import { Link, useNavigate } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import CompletedPhoto from '../../components/CompletedPhoto';
import OccupationSelect from '../../components/OccupationSelect';

//Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

//Redux
import { getPhotos } from '../../slices/photoSlice';

const ForYou = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    const { user: userLogged } = useSelector(state => state.user);
    const { photos, loading } = useSelector(state => state.photo);

    const [filterOccupation, setFilterOccupation] = useState('');

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (filterOccupation) {
            return navigate(`/occupation?q=${filterOccupation}`) //Navigates to the URl with the query param
        }
    }

    return (
        <div id="home">
            <LoadingPage loading={loading} />
            <h2>Descubra novas pessoas:</h2>
            <form onSubmit={handleSearch} className='formYou'>
                <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setFilterOccupation(e.target.value)}>
                    <OccupationSelect type='all' />
                </select>
                <button className='youBtn'>Pesquisar</button>
            </form>
            {photos && photos.map(photo => (
                <div key={photo._id}>
                    {user._id !== photo.userId && (
                        (!userLogged.following?.includes(photo.userId) && (
                            <CompletedPhoto photo={photo} user={user} button={true} key={photo._id} />
                        ))
                    )}
                </div>
            ))}
            {photos && photos.length === 0 && !loading && (
                <h2 className='no-photos'>
                    Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link>
                </h2>
            )}
        </div>
    )
}

export default ForYou;    