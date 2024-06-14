import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const item = localStorage.getItem('auth-token');
        if (!item) {
          navigate('/login');
        }
      }, [navigate]);
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('auth-token'); // Clear the authentication token
        Swal.fire(
          'Logged out!',
          'You have been logged out successfully.',
          'success'
        ).then(() => {
          navigate('/login'); // Redirect to the login page
        });
      }
    });
  };


  return (
    <div className="flex h-screen items-center justify-center text-center bg-[#181A2E]">
      <div className="bg-gradient-to-r from-[#434974] to-[#242949] p-8 rounded-xl">
        <p className="text-white text-2xl mb-4">You are successfully registered</p>
        <button
          className="text-white bg-purple-500 px-4 py-2 rounded hover:bg-purple-700 text-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
