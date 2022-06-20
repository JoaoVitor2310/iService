import './Home.css';

//Components
import { Link } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import CompletedPhoto from '../../components/CompletedPhoto';

//Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { getPhotos } from '../../slices/photoSlice';
import { getUserDetails } from '../../slices/userSlice';

const Home = () => {
  const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { user: userData } = useSelector(state => state.user);
    const { photos, loading } = useSelector(state => state.photo);

    useEffect(() => {
        dispatch(getPhotos());
        dispatch(getUserDetails(user._id));
    }, [dispatch, user._id]);

  return (
    <div id='home'>
       <LoadingPage loading={loading} />
       {photos && photos.map(photo => (
                <div key={photo._id}>
                    {userData.following.includes(photo.userId) && (
                        <CompletedPhoto photo={photo} user={user} button={true} key={photo._id} />
                    )}
                </div>
            ))}
            {photos && photos.length === 0 && !loading && (
                <h2 className='no-photos'>
                    Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link>
                </h2>
            )}
            {photos && userData.following?.length === 0 && !loading && (
                <h2 className='no-photos'>
                    Você ainda não segue ninguém, <Link to={'/foryou'}>descubra novas pessoas</Link>
                </h2>
            )}
    </div>
  )
}

export default Home