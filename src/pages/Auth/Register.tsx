import styled from "styled-components";
import { ROUTE } from "../../App";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";
import Loader from "../../components/Loader";

const Login = () => {
  const navigate = useNavigate()
  const [userCredentials, setUserCredentials] = useState<{name: string; lastName: string; email: string; password: string; confirmPassword: string}>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    })
  }

  const submitRegistrationForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if(userCredentials.password != userCredentials.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if(userCredentials.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email: userCredentials.email,
      password: userCredentials.password,
      options: {
        data: {
          name: userCredentials.name,
          last_name: userCredentials.lastName
        }
      }
    })

    if(authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate(ROUTE.LOGIN);
  }

  console.log({formData: userCredentials})

  return (
    <Div>
      <form className="form-login" onSubmit={submitRegistrationForm}>
        <h1>Registrate</h1>
  
        <div className='input-group'>
          <label htmlFor='name'>Nombre</label>
          <input type='text' name='name' id='name' onChange={onInputChange} required/>

          <label htmlFor='lastName'>Apellido</label>
          <input type='text' name='lastName' id='lastName' onChange={onInputChange} required/>

          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' onChange={onInputChange} required/>

          <label htmlFor='password'>Contraseña</label>
          <input type='password' name='password' id='password' onChange={onInputChange} required/>

          <label htmlFor='confirmPassword'>Repite Contraseña</label>
          <input type='password' name='confirmPassword' id='confirmPassword' onChange={onInputChange} required />
        </div>
  
        <button type='submit'>
          {isLoading
            ? <Loader />
            : 'Registrar'}
        </button>
  
        <div className='options-account'>
          <a href={ROUTE.LOGIN}>Ya tienes una cuenta?</a>
        </div>
      </form>
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
    //height: 60.8px;
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
`