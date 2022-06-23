import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <p className='block'>iService &copy; 2022</p>
      <p className='block'>Criado por: 
        <strong>
          
          <a target={'_blank'} href='https://www.linkedin.com/in/jo%C3%A3o-vitor-matos-gouveia-14b71437/'>
             João Vitor Gouveia
          </a>
        </strong>
      </p>
      <p className='block'>Não possui fins lucrativos.</p>
    </footer>
  )
}


export default Footer