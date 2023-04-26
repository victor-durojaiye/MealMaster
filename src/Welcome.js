import React from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Welcome(){
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };


  return(
    <div class="bg-gray-50 min-h-screen flex flex-col items-center justify-center">

    <button class= "text-gray-900 font-light py-2 px-3 rounded-md animate-pulse" onClick={handleHomeClick}>
       Welcome
    </button>

    <h2 class="text-5xl font-sans text-center font-extrabold mt-20"> Get fit with</h2>   
    <h1 class="text-8xl font-sans text-center font-extrabold"> MealMaster.</h1>   

     <nav>
      <ul class="flex mt-20">
        <li class="mr-6">
        
        </li>
        <li class="mr-3"> 
          <button class="bg-gray-900 hover:bg-gray-800 text-white font-extralight py-2 px-4 rounded-md" onClick={handleLoginClick}>Login</button>
        </li>
        <li class="mr-3">
          <button class="bg-gray-900 hover:bg-gray-800 text-white font-extralight py-2 px-4 rounded-md"onClick={handleRegisterClick}>Register</button>
        </li>
      </ul>
    </nav>
    
    <p class="font-extralight mt-60">Made by Victor Durojaiye and Tom Peters.</p>
    </div>
    )  
};

export default Welcome;