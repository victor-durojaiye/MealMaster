import React, {useState, useEffect} from 'react';

function FriendMessage({ friendId }) {
    // State for storing the message content
    const [content, setContent] = useState('');
  
    // Handler for submitting the message form
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Send a POST request to the API to create the new message
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: 'USER_ID', // Replace with the ID of the current user
          recipientId: friendId,
          content: content,
        }),
      });
  
      // If the message was sent successfully, clear the form
      if (response.ok) {
        setContent('');
      }
    };
}

export default FriendMessage