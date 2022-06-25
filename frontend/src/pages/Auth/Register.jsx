import React from 'react';
import './Auth.css';

//Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import LoadingInput from '../../components/LoadingInput';
import OccupationSelect from '../../components/OccupationSelect';

//Hooks
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'

//Redux
import {register, reset} from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name, email, cellPhone, password, confirmPassword, occupation
    }
    dispatch(register(user))
  }

  useEffect(_ => { //Cleans all auth states
    dispatch(reset())
  }, [dispatch])

  return (
    <div id='register'>
      <h2>iService</h2>
      <p className='subtitle'>Faça o seu cadastro!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Nome' onChange={e => setName(e.target.value)} value={name || ''}/>
        <select name="occupation" defaultValue={'DEFAULT'} onChange={e => setOccupation(e.target.value)}>
                    <OccupationSelect type='register' />
        </select>
        <input type="number" maxLength='11' minLength='10' placeholder='Celular' onChange={e => setCellPhone(e.target.value)} value={cellPhone || ''}/>
        <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} value={email || ''}/>
        <input type="password" placeholder='Senha' onChange={e => setPassword(e.target.value)} value={password || ''}/>
        <input type="password" placeholder='Confirme a senha' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword || ''}/>
        <LoadingInput loading={loading} value='Cadastrar' />
        {error && <Message msg={error} type='error'/>}
      </form>
      <p>Já tem conta? <Link to='/login'>Clique aqui</Link></p>
    </div>
  )
}

export default Register