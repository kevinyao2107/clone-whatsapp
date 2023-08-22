import React, { useEffect, useState } from 'react';
import HeaderChat from './ChatElments/Left/HeaderChat';
import HeaderRigthChat from './ChatElments/right/HeaderRigthChat';
import bg from '../public/images/bg.jpg';
import Messages from './ChatElments/right/Messages';
import MessageSender from './ChatElments/right/MessageSender';
import Search from './ChatElments/Left/Search';
import UserList from './ChatElments/Left/UserList';
import { useMyContext } from '../context/ContextProvider';

const ChatContaner = ({ socket }) => {
  const { user } = useMyContext();
  socket.emit('connected', user);
  return (
    <div className=' absolute bg-white top-5 bottom-0 left-[16rem] right-[16rem] z-30 shadow-md '>
      <div className='flex items-center h-full'>
        <div className=' basis-[43%]  h-full  shadow-md'>
          <div className=' h-full w-full right-chat overflow-hidden grid grid-cols-1 '>
            <div>
              <HeaderChat />
              <Search />
            </div>

            <UserList />
          </div>
        </div>
        <div className='  h-full w-full left-chat grid grid-cols-1  '>
          <HeaderRigthChat socket={socket} />
          <Messages socket={socket} />
          <MessageSender socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default ChatContaner;
