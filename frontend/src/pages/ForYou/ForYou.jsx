import '../Home/Home.css';

//Components
import { Link } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import CompletedPhoto from '../../components/CompletedPhoto';

//Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { getPhotos } from '../../slices/photoSlice';


const ForYou = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { photos, loading } = useSelector(state => state.photo);


    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);
    return (
        <div id="home">
            <LoadingPage loading={loading} />
            <h2>Descubra novas pessoas:</h2>
            {photos && photos.map(photo => (
                <div key={photo._id}>
                {user._id !== photo.userId && (
                    <CompletedPhoto photo={photo} user={user} button={true} key={photo._id} />
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