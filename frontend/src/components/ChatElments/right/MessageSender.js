import React, { useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../../../context/ContextProvider';

const MessageSender = ({ socket }) => {
  const { actifUser, messages, setMessages } = useMyContext();

  const [message, setMessage] = useState('');
  const postHandler = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/messages/',
        { message, receverId: actifUser._id },
        config
      );

      socket.emit('message', data);
      setMessages([...messages, data]);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' h-full bg-[#f0f2f5]'>
      <form
        onSubmit={postHandler}
        className=' flex justify-evenly px-5 py-2 items-center'
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Taper un message'
          className=' w-[92%] p-2 rounded-md outline-none'
        />
        {message && (
          <button type='submit' className=' opacity-60 cursor-pointer'>
            <svg
              viewBox='0 0 24 24'
              height='24'
              width='24'
              preserveAspectRatio='xMidYMid meet'
              version='1.1'
              x='0px'
              y='0px'
              enableBackground='new 0 0 24 24'
              xmlSpace='preserve'
            >
              <path
                fill='currentColor'
                d='M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z'
              ></path>
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageSender;
