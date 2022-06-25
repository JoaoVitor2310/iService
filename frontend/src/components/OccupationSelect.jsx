import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOccupations } from '../slices/occupationSlice';

const OccupationSelect = ({ user, type }) => {
    const { occupations } = useSelector(state => state.occupation);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOccupations());
    }, [dispatch]);

    switch (type) {
        case 'add':
            return (
                <>
                    <option value="DEFAULT" disabled>Adicionar função:</option>
                    {occupations && occupations.map(occup => (
                        (!user.occupation.includes(occup.name) && (
                            <option value={occup.name} key={occup._id}>{occup.name}</option>
                        ))
                    ))}
                </>
            )
        case 'remove':
            return (
                <>
                    <option value="DEFAULT" disabled>Remover função:</option>
                    {occupations && occupations.map(occup => (
                        (user.occupation.includes(occup.name) && (
                            <option value={occup.name} key={occup._id}>{occup.name}</option>
                        ))
                    ))}
                </>
            )
        case 'all':
            return (
                <>
                    <option value="DEFAULT" disabled>Filtrar função:</option>
                    {occupations && occupations.map(occup => (
                        <option value={occup.name} key={occup._id}>{occup.name}</option>
                    ))}
                </>
            )
        case 'register':
            return (
                <>
                    <option value="DEFAULT" disabled>Função principal:</option>
                    {occupations && occupations.map(occup => (
                        <option value={occup.name} key={occup._id}>{occup.name}</option>
                    ))}
                </>
            )
        default:
            break;
    }

}

export default OccupationSelect