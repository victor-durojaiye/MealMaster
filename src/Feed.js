import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import NavBar from './NavBar';
import FriendMessage from './FriendMessage';
const images = require.context('/Users/victordurojaiye/express-react-project/client/src/Images', true);

function Feed() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [friendPosts, setFriendPosts] = useState([]);
    const [friendUsernames, setFriendUsernames] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [DMS, setDMS] = useState(false);

    const user = localStorage.getItem('user');
    const imageUrl = localStorage.getItem(user + 'profileImage');

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
    
          alert(data.message);
        } catch (error) {
          setMessage('An error occurred');
        }
      };

      const [requests, setRequests] = useState([]);
      
      useEffect(() => {
        fetch('http://localhost:3001/api/friends/requests')
          .then(response => response.json())
          .then(data => setRequests(data));
      }, []);


      useEffect(() => {
        fetch('http://localhost:3001/api/friends/friendsList')
          .then(response => response.json())
          .then(data => setFriendsList(data));
      }, []);

      console.log(friendsList);

      const acceptRequest = (requestId) => {
        fetch('http://localhost:3001/api/friends/accept', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ requestId })
        })
          .then(response => response.json())
          .then(data => {
           setRequests(requests.filter(request => request._id !== requestId));
          })
          .catch(error => console.error(error));
      };

      const rejectRequest = (requestId) =>{
        fetch('http://localhost:3001/api/friends/reject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ requestId })
        })
        .then(response => response.json())
        .then(data => {
        setRequests(requests.filter(request => request._id !== requestId));
        })
      .catch(error => console.error(error));
      }


      useEffect(() => {
        async function fetchPosts() {
          const response = await fetch('http://localhost:3001/api/feed');
          const data = await response.json();
          setFriendPosts(data.friendPosts);  
          setFriendUsernames(data.friendNames);
        }
        fetchPosts();
      }, []);


      useEffect(() => {
        async function fetchMessages() {
          const response = await fetch('http://localhost:3001/api/messagesFromFriends');
          const data = await response.json();
          setDMS(data.DMS);  
        }
        fetchMessages();
      }, []);

      const handleFriendClick = (friendId) => {
        setSelectedFriend(friendId);
        setShowPopup(true);
      }
    
      const handleSendMessage = () => {
        fetch('http://localhost:3001/api/messages/friendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipientId: selectedFriend,
            message: messageText,
          })
        })
        .then(message => {
          alert("success")
          setSelectedFriend(null);
          setMessageText('');
          setShowPopup(false);
        })
      }

  return(
    <html className ="bg-gray-50 min-h-screen" >
    <NavBar/>

    <div className ="top-0 grid grid-cols-3 gap-3 justify-center">

    <div className ="col-span-1 flex flex-col justify-center items-center -mt-px">
      <h2 className ="font-extralight text-xl">Incoming Friend Requests</h2>
      {requests.map(request => (
        <div key={request._id}>
          <p class="text-sm text-center font-extralight mt-3">{request.fromUser} wants to be your friend.</p>
          <div class="flex justify-center space-x-3">
          <button class="mt-3 animate-pulse" onClick={() => acceptRequest(request._id)}>Accept</button>
          <button class="mt-3 animate-pulse"onClick={() => rejectRequest(request._id)}>Reject</button>
          </div>
        </div>
      ))}
      <h2 className ="font-extralight text-xl text-center mt-11">Friends List</h2>
        {friendsList && friendsList.fromUserNames && (
        <ul>
          {friendsList.fromUserNames.map((friendId, index) => (
              <li class="text-sm font-extralight mt-3 text-center" key={index} onClick={() => handleFriendClick(friendId)}>{friendId}</li>
              ))}
        </ul>
        )}
        {friendsList && friendsList.toUser && (
        <ul>
          {friendsList.fromUserNames.map((friendId, index) => (
              <li class="text-sm font-extralight mt-3 text-center" key={index} onClick={() => handleFriendClick(friendId)}>{friendId}</li>
              ))}
        </ul>
        )}
      {showPopup && (
      <div className="popup">
        <h2 class="text-xs font-extralight text-center mt-1">Send message to {selectedFriend}</h2>
        <form onSubmit={handleSendMessage}>
          <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)} class="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-3" placeholder="Send..."/>
          <div class="flex justify-center space-x-3">
          <button class="text-xs mt-2" type="submit">Send</button>
          <button class="text-xs mt-2" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </form>
      </div>
    )}
    <div className ="col-span-1 flex flex-col justify-center items-center">
    <div className ="absolute bottom-5 left-3 mx-14 mt-2">
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} class=" inline-block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 mx-4" placeholder="Search for a friend"/>
      <button className ="inline-block font-thin" onClick={sendFriendRequest}>Send Friend Request</button>
    </div>
    </div>
    </div>

      


    <div className ="col-span-1 flex flex-col justify-center items-center">
    <h1 className ="font-extralight text-gray-900 mt-4 text-4xl text-center">Feed</h1>
    {friendPosts.map((friendPostGroup, index) => (
      <div key={index} class="mt-11">
      {friendPostGroup.map((post, index) => (
      <div key={index} class="mb-20">
        <img class="rounded-lg" width="300" src={images(post.src)} alt="Friend post" />
        <p class="font-light text-center mt-3">{post.caption}</p>
        <p class="text-sm font-extralight text-center mt-1">by {post.user}</p>
      </div>
      ))}
      </div>
    ))}
    </div>

        <div className ="col-span-1 flex flex-col justify-center items-center">
        <h2 className ="font-extralight text-xl">Your messages</h2>


        {/* <div>
        {DMS.length > 0 ? (
       
       {DMS.map((message) => (
        <div key={message._id}>
        <p>{message.content}</p>
        </div>
        ))}
        ) : <p>You have no messages</p>
       }
      </div> */}
        
        </div>


    </div>


    </html>
  )
}

export default Feed;