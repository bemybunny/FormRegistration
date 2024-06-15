import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:4000'
// import.meta.env.VITE_BASE_URL; // Replace with your actual base URL

const Login = () => {
  const [underline, setUnderline] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = underline ? '/signup' : '/login';
      const response = await axios.post(`${BASE_URL}${endpoint}`, {
        name: underline ? name : undefined,
        email,
        password,
      });

      const responseData = response.data;
      console.log(responseData);
      if (responseData.success) {
        localStorage.clear();
        localStorage.setItem('auth-token', responseData.token);
        Swal.fire({
          title: 'Success!',
          text: underline ? 'You have successfully signed up!' : 'You have successfully logged in!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setName('');
          setEmail('');
          setPassword('');
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: responseData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.log({ error: 'occur in frontend', details: error });
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleChange = () => {
    setUnderline(!underline);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-[#181A2E] gap-8">
      <h1 className="text-white text-4xl underline decoration-purple-500">Registration Form</h1>
      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-r from-[#434974] to-[#242949] space-y-12 rounded-xl">
        <div className="text-white text-xl flex justify-around mb-4 space-x-1">
          <span
            className={`cursor-pointer ${underline ? 'underline decoration-purple-500' : ''}`}
            onClick={handleChange}
          >
            SignUp
          </span>
          <span
            className={`cursor-pointer ${!underline ? 'underline decoration-purple-500' : ''}`}
            onClick={handleChange}
          >
            LogIn
          </span>
        </div>
        <div className="flex flex-col space-y-6">
          {underline && (
            <div className="flex justify-between items-center">
              <label className="text-white w-1/4">Name</label>
              <input
                className="w-3/4 p-2 rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <label className="text-white w-1/4">Email</label>
            <input
              className="w-3/4 p-2 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-white w-1/4">Password</label>
            <input
              className="w-3/4 p-2 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="text-white bg-purple-500 px-4 py-1 rounded hover:bg-purple-700 text-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
