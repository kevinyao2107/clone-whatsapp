import React, { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [actifUser, setActifUser] = useState('');
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(user);
  }, []);

  return (
    <MyContext.Provider
      value={{ actifUser, setActifUser, user, messages, setMessages }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
