import styled from "styled-components";
import { ROUTE } from "../../App";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })

  useEffect(() => {
    const timerError = setTimeout(() => {
      setError('')
    }, 3000)

    return () => clearTimeout(timerError)
  }, [error])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    })
  }

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: userCredentials.email,
      password: userCredentials.password
    })

    if (authError) {
      if (authError.code === 'email_not_confirmed') { setError('Debés confirmar tu email antes de ingresar. Revisá tu bandeja de entrada.'); }
      else { setError('Email o contraseña incorrectos'); }
      setIsLoading(false);

      return;
    }

    navigate(ROUTE.HOME)
  }

  return (
    <Div>
      <form className="form-login" onSubmit={onLoginSubmit}>
        <h1>Tu próxima aventura te espera</h1>
  
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' onChange={onInputChange}/>
          
          <label htmlFor='password'>Contraseña</label>
          <input type='text' name='password' id='password' onChange={onInputChange}/>
        </div>
  
        <button type='submit'>
          {isLoading
            ? <Loader />
            : 'Ingresar'}
        </button>
  
        <div className='options-account'>
          <a href=''>Has olvidado tu contraseña?</a>
          <a href={ROUTE.REGISTER}>No tienes una cuenta?</a>
        </div>
      </form>

      <span className={`message-error ${error ? 'visible' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        {error}
      </span>
    </Div>
  );
};

export default Login;

const Div = styled.div`
  background-image: url('/caricatura.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1rem;
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .form-login {
    background-color: #FFE484;
    border: 4px solid #000;
    border-radius: 32px;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }

  .form-login:hover {
    transform: translate(-2px, -2px);
    box-shadow: 14px 14px 0 rgba(0, 0, 0, 0.2);
  }

   .form-login > h1 {
    font-family: 'Bangers', cursive;
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 1.8rem;
    letter-spacing: 2px;
    color: #1C1C15;
    text-shadow: 3px 3px 0 #FFB347;
  }

   .form-login .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

   .form-login .input-group > label {
    font-weight: 700;
    font-size: 1.1rem;
    margin-left: 0.25rem;
  }

   .form-login .input-group > input {
    background-color: #FFF8E7;
    border: 2px solid #000;
    border-radius: 40px;
    padding: 0.75rem 1rem;
    font-family: 'Comic Neue', cursive;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

   .form-login .input-group > input:focus {
    outline: none;
    background-color: #FFF2CC;
    transform: scale(1.02);
    box-shadow: 4px 4px 0 #000;
  }

   .form-login .input-group > input:hover {
    background-color: #FFF2CC;
  }

   .form-login > button {
    width: 100%;
    background-color: #F05454;
    color: white;
    font-family: 'Comic Neue', cursive;
    font-weight: bold;
    font-size: 1.2rem;
    border: 3px solid #000;
    border-radius: 60px;
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 5px 5px 0 #000;
  }

   .form-login > button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #000;
    background-color: #E63E3E;
  }

   .form-login > button:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #000;
  }

   .form-login .options-account {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

   .form-login .options-account > a {
    color: #1C1C15;
    font-weight: bold;
    text-decoration: none;
    border-bottom: 2px dashed #000;
    transition: all 0.2s ease;
  }

   .form-login .options-account > a:hover {
    color: #F05454;
    border-bottom: 2px solid #F05454;
    transform: scale(1.05);
  }

  .message-error {
    position: absolute;
    width: 30%;
    text-align: center;
    top: 10px;
    border-radius: 15px;
    font-weight: 600;
    background: #F05454;
    color: #FFFFFF;
    z-index: 2;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transform: translateY(-100px);
    transition: transform 0.6s cubic-bezier(0.34, 2.2, 0.64, 1);
    pointer-events: none;
  }

  .message-error.visible {
    transform: translateY(10px);
    pointer-events: auto;
  }
`