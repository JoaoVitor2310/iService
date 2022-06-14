import './Auth.css';

//Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Redux
import { login, reset } from '../../slices/authSlice';

//Components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import LoadingInput from '../../components/LoadingInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const {loading, error} = useSelector(state => state.auth)

  return (
    <div id='login'>
      <h2>iService</h2>
      <p>Faça login e aproveite o iService!</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} value={email || ''} />
        <input type="password" placeholder='Senha' onChange={e => setPassword(e.target.value)} value={password || ''} />
        <LoadingInput loading={loading} value='Entrar'/>
        {error && (<Message msg={error} type='error'/>)}
      </form>
      <p>Não tem uma conta? <Link to='/register'>Clique aqui.</Link></p>
    </div>
  )
}

export default Login