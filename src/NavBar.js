import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);

function NavBar(){
  
    const user = localStorage.getItem('user');
    const imageUrl = localStorage.getItem(user + 'profileImage');


    const [username, setUsername] = useState('');

    //This is to allow a user to send a friend request
    const sendFriendRequest = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/friends/request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toUser: username })
          });
          
          const data = await response.json();
          alert("Success")
        } catch (error) {
            alert("Error occured");
        }
      };


    //This is to allow the person on the receiving end see their incoming friend requests
        const [friendRequests, setFriendRequests] = useState([]);
      
        useEffect(() => {
          const fetchFriendRequests = async () => {
            const response = await fetch('http://localhost:3001/api/friends/requests');
            const data = await response.json();
            setFriendRequests(data);
          };
          fetchFriendRequests();
        }, []);

        const handleImageUpload = async (event) => {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('avatar', file);
          
            try {
              const response = await fetch('/api/upload-avatar', {
                method: 'POST',
                body: formData,
              });
          
              if (response.ok) {
                const { imageUrl } = await response.json();
                // Do something with the image URL, like update the user's avatar in state
              } else {
                throw new Error('Failed to upload avatar');
              }
            } catch (error) {
              console.error(error);
            }
          };



return (
<nav class="bg-gray-50 border-gray-200 ">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="homepage" class="flex items-center">
        <span class="self-center text-2xl font-semibold whitespace-nowrap">MealMaster.</span>
  </a>
  <div class="flex md:order-2 space-x-4">

  <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
  {imageUrl && <Avatar alt="Profile Image" src={images(imageUrl)}   sx={{ width: 40, height: 40 }}/>}
  </button>
  <a href="profilepicture" class="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0">Change profile picture</a>

  </div>
    <div class="items-center justify-between hidden w-full md:flex md:w-auto  md:order-1" id="navbar-search">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-light border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray ">
        <li>
          <a href="calories" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 ">C/M</a>
        </li>
        <li>
          <a href="meals" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 ">Dieting</a>
        </li>
        <li>
          <a href="feed" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 ">Feed</a>
        </li>
        <li>
          <a href="exercise" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 ">Exercise Log</a>
        </li>
        <li>
          <a href="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 ">Leave</a>
        </li>
      </ul>
    </div>
    </div>
</nav>

    )  
};

export default NavBar;