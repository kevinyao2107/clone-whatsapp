import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useMyContext } from '../../../context/ContextProvider';

const Messages = ({ socket }) => {
  const { messages, actifUser, user, setMessages } = useMyContext();
  const messagesEndRef = useRef(null); // Référence à l'élément du dernier message

  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/messages/${actifUser._id}`,
        config
      );

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [actifUser]);

  useEffect(() => {
    socket.on('sendmessage', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='h-[86vh]'>
      <ul className='h-full message overflow-hidden relative'>
        {messages.map((message, index) => (
          <li
            key={message._id}
            ref={index === messages.length - 1 ? messagesEndRef : null}
            className={
              message.senderId === user._id
                ? 'w-full flex items-end justify-end'
                : 'w-full flex items-end justify-start'
            }
          >
            <div
              className={
                message.senderId === user._id
                  ? 'bg-[#d9fdd3] inline-block p-3 my-2 mx-4 rounded-md'
                  : 'bg-[#f8faf8] inline-block p-3 my-2 mx-4 rounded-md'
              }
            >
              <span>{message.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
