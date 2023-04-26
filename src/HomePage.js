import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import NavBar from './NavBar';
import RestaurantsNearby from './RestaurantsNearby';
const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);

function HomePage(){
    const user = localStorage.getItem('user');
    const imageUrl = localStorage.getItem(user + 'profileImage');

    const [file, setFile] = useState(null);
    const [src, setSrc] = useState(null);
    const [caption, setCaption] = useState('');
    const [posts, setPosts] = useState([]);


  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

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
  
        await fetch('http://localhost:3001/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            caption: caption,
            src: data.src
          })
        });
  
        setFile(null);
        setSrc(null);
        setCaption('');

      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      async function fetchPosts() {
        const response = await fetch('http://localhost:3001/api/userposts');
        const data = await response.json();
        setPosts(data.postIds);
        console.log(data);
      }
      fetchPosts();
    }, []);

    function deletePost(postId) {
     console.log("Post id: " + postId);
      fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId: postId }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => console.error(error));
    }

    return(
    <body className="bg-gray-50 min-h-screen">
        <NavBar/>      
        <h1 class="font-extralight text-4xl text-center mt-4 text-gray-900">Welcome, {user}</h1>
        <div class="grid grid-flow-col col-span-3">
        <div class="col-span-1 flex flex-justify justify-start ml-24 mt-12">
       {imageUrl && <img class="rounded w-52 h-52" src={images(imageUrl)} alt="Extra large avatar"/>}
        </div>

        <div class="col-span-1 flex flex-col justify-center">
        <form onSubmit={handleSubmit}>
        <h1 class=" font-light py-7"> Would you like to share your health progress?</h1>
        <label class="font-extralight mt" htmlFor="image-input">Image:</label>
        <input class="text-black" type="file" id="image-input" onChange={handleFileChange} required />
        {src && <img src={src} alt="Selected file" width="200" />}
        <textarea class="block text-center p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-3" id="caption-input" value={caption} onChange={handleCaptionChange} required placeholder='Caption'/>
        <div class=" justify-center">
      <button class="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 mx-auto mt-5" type="submit">Post</button>
      </div>
    </form>
    </div>

<div class="flex flex-col absolute bottom-7 left-7">
    {posts.map((post, index) => (
    <div key={index}>
    <img  class="rounded-lg drop-shadow-lg" width="200" src={images(post.src)} alt="Post" />
    <p class="font-extralight text-center">{post.caption}</p>
    <div class=" justify-center">
    <button class="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 mx-auto mt-5" onClick={()=>deletePost(post._id)}>Delete</button>
    </div>

    </div>
    ))}
</div>
  

  <RestaurantsNearby/> 
  </div>

    </body>
    )
}

export default HomePage;