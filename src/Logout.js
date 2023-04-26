import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';

function Logout() {
    const [redirectToHome, setRedirectToHome] = useState(false);

  const logoutSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/logout', {
        method: 'POST'
      });
      if (response.status === 200) {
        console.log("You've successfully logged out!")
        setRedirectToHome(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (redirectToHome) {
    return <Navigate to="/" />;
}

  return (
    
    <div>
      <button class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={logoutSubmit}>Logout</button>
    </div>
  );
}

export default Logout;