import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Register(){
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitRegisterInfo = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 201) {
      alert('Successful. You may now return to the homepage and login.');
    } else if(response.status === 409) {
        alert("Username already exists");
    } else {
      alert('An error occurred');
    }

    };

    const handleHomeClick = () => {
      navigate('/');
    };
    
    return (
      <>
    <body class="bg-gray-50 min-h-screen">
    <div class="flex flex-col items-center justify-center ">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
         Register an account
    </h1>
     <div>
      <form onSubmit={submitRegisterInfo} class="space-y-4 md:space-y-6">
        <div>
        <label htmlFor="username" class="block mb-2 text-sm font-medium text-gray-900">Your username</label>
        <input value={username} type="text" name="email" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="username" required="" onChange={(event) => setUsername(event.target.value)}/>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 mt-3">Password</label>
        <input type="password" name="password" value={password} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" onChange={(event) => setPassword(event.target.value)}/>           
        </div>
        <button type="submit" class="w-full text-gray-900 bg-primary-600 hover:bg-primary-700 outline outline-1 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
        </form> 
        </div>
  
      </div>
      
      </div>
      <button class= "text-black font-light py-2 px-3 rounded-md mt-4" onClick={handleHomeClick}>
       Return to homepage
      </button>
      </div>
      
      </div>
      
      </body>






      </>
    )  
};

export default Register;