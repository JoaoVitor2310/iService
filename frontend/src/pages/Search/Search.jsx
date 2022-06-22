import './Search.css';

//Hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';

//Components
import SearchUser from '../../components/SearchUser';

//Redux
import { searchUsers } from '../../slices/userSlice';
import LoadingPage from '../../components/LoadingPage';

const Search = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  const search = query.get('q'); //Receives the 'q' from URL
  const { users, loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(searchUsers(search));
  }, [dispatch, search]);

  return (
    <div id='search'>
      <LoadingPage loading={loading} />
      <h2>Você está buscando por: {search}</h2>
      {users && users.map(user => (
          <SearchUser user={user} key={user._id}/>
      ))}
    </div>
  )
}

export default Search