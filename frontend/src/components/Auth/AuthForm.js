import axios from 'axios';
import React, { useState } from 'react';

const LoginForm = () => {
  const [islogin, setIsLogin] = useState(false);
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formatPhoneNumber = (input) => {
    // Remove non-digit characters
    const digitsOnly = input.replace(/\D/g, '');

    // Format the digits as needed
    let formattedValue = '';
    if (digitsOnly.length >= 3) {
      formattedValue = `${digitsOnly.slice(0, 3)}`;
    }
    if (digitsOnly.length > 3) {
      formattedValue += ` ${digitsOnly.slice(3, 5)}`;
    }
    if (digitsOnly.length > 5) {
      formattedValue += ` ${digitsOnly.slice(5, 7)}`;
    }
    if (digitsOnly.length > 7) {
      formattedValue += ` ${digitsOnly.slice(7, 9)}`;
    }
    if (digitsOnly.length > 9) {
      formattedValue += ` ${digitsOnly.slice(9)}`;
    }

    return formattedValue;
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value);
    setPhone(formattedValue);
    console.log(formattedValue);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    switch (islogin) {
      case true:
        try {
          const user = {
            phone,
            password,
          };
          const { data } = await axios.post('/api/users/login', user);
          localStorage.setItem('user', JSON.stringify(data));
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
        break;

      case false:
        const newUser = {
          phone,
          username,
          password,
        };
        console.log(newUser);
        try {
          const { data } = await axios.post('/api/users/', newUser);
          localStorage.setItem('user', JSON.stringify(data));
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className=' w-full'>
      <form
        onSubmit={submitHandler}
        className=' w-full py-20 px-10 flex flex-col '
      >
        <input
          onChange={handleInputChange}
          type='text'
          placeholder='Numero de téléphone'
          className=' w-full text-[1.2rem] outline-none p-3 border-b-2 border-[#f0f2f5]'
        />
        {!islogin && (
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder={`Nom d'utilisateur`}
            className='w-full text-[1.2rem] outline-none p-3 border-b-2 border-[#f0f2f5]'
          />
        )}

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder={`Mot de passe`}
          className='w-full text-[1.2rem] outline-none p-3 border-b-2 border-[#f0f2f5]'
        />
        {!islogin && (
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            placeholder={`Confirmation du mot de passe`}
            className='w-full text-[1.2rem] outline-none p-3 border-b-2 border-[#f0f2f5]'
          />
        )}

        {islogin ? (
          <span className='mt-4'>
            Pas encore de compte?{' '}
            <span
              className=' text-[#00a884] cursor-pointer'
              onClick={() => setIsLogin(false)}
            >
              Creer un compte
            </span>
          </span>
        ) : (
          <span className='mt-4'>
            Avez-vous deja un compte?{' '}
            <span
              className=' text-[#00a884] cursor-pointer'
              onClick={() => setIsLogin(true)}
            >
              connexion
            </span>
          </span>
        )}

        <button className=' text-[1.2rem] mt-5 py-2 px-3 bg-[#00a884] text-white'>
          {islogin ? 'connexion' : ' Inscription'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
