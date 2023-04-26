

import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import HomePage from './NavBar';


const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);
function ProfilePicture(){
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      await fetch('http://localhost:3001/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          src: data.src,
        
        })
      });

      setFile(null);
      setSrc(null);
    } catch (error) {
      console.error(error);
    }
  };

  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState('');
  const currentUser = localStorage.getItem('user');

  useEffect(() => {
    fetch('http://localhost:3001/api/images')
      .then(response => response.json())
      .then(data => {
        setUserId(data.user);
        setImageUrl(data.src)
      })
      .catch(error => console.error(error));
  }, []);


  console.log(userId);
  console.log(currentUser);

  localStorage.setItem(currentUser + 'profileImage', imageUrl);
  

return(
  <body class="bg-gray-50 min-h-screen">
  <HomePage/>
    {/* {imageUrl && <Avatar alt="Profile Image" src={images(imageUrl)}   sx={{ width: 250, height: 250 }}/>} */}

    <div class="flex justify-center mt-20">
    {imageUrl && <img class=" w-60 h-60 p-1 rounded-full ring-2 ring-gray-300" src={images(imageUrl)} alt="Bordered avatar"/>}
    </div>

    <div class="flex justify-center mt-40">
    <form onSubmit={handleSubmit}>
        <input type="file" class="font-thin" onChange={handleFileChange} />
      <button class=" font-medium" type="submit">Upload</button>
    </form>
    </div>


  </body>

)
}

export default ProfilePicture;