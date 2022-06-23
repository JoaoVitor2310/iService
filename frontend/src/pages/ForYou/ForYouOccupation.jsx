import React, { useEffect, useState } from 'react'

//Components
import {useNavigate } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import OccupationSelect from '../../components/OccupationSelect';
import SearchUser from '../../components/SearchUser';

//Hooks
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery';

//Redux
import { searchUsersByOccupation } from '../../slices/userSlice';

const ForYouOccupation = () => {
    const {users, loading } = useSelector(state => state.user);

    const [filterOccupation, setFilterOccupation] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    
    const search = query.get('q');
    
    useEffect(() => {
        dispatch(searchUsersByOccupation(search));
    }, [dispatch, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (filterOccupation) {
            return navigate(`/occupation?q=${filterOccupation}`) //Navigates to the URl with the query param
        }
    }

  return (
    <div id='home'>
        <LoadingPage loading={loading} />
        <h2>Descubra novas pessoas:</h2>
        <form onSubmit={handleSearch}>
                <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setFilterOccupation(e.target.value)}>
                    <OccupationSelect type='all' />
                </select>
                <button>Pesquisar</button>
        </form>
        {users && users.map(user => (
          <SearchUser user={user} key={user._id}/>
      ))}
    </div>
  )
}

export default ForYouOccupation