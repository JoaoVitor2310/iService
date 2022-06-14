import React from 'react';
import './Auth.css';

//Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import LoadingInput from '../../components/LoadingInput';

//Hooks
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'

//Redux
import {register, reset} from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name, email, password, confirmPassword, occupation
    }
    // console.log(user);
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
          <option value="DEFAULT" disabled>Função principal:</option>
          <option value="user" >Usuário</option>
          <option value="bricklayer">Pedreiro</option>
          <option value="electrician">Eletricista</option>
          <option value="painter">Pintor</option>
          <option value="poolCleaner">Piscineiro</option>
          <option value="gardener">Jardineiro</option>
          <option value="trainer">Adestrador</option>
        </select>
        <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} value={email || ''}/>
        <input type="password" placeholder='Senha' onChange={e => setPassword(e.target.value)} value={password || ''}/>
        <input type="password" placeholder='Confirme a senha' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword || ''}/>
        <LoadingInput loading={loading} value='Cadastrar' />
        {error && <Message msg={error} type='error'/>}
        {/* <input type="submit" value='Cadastrar' /> */}
      </form>
      <p>Já tem conta? <Link to='/login'>Clique aqui</Link></p>
    </div>
  )
}

export default Register