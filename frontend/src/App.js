import Auth from './components/Auth/Auth';
import AuthHeader from './components/Auth/AuthHeader';
import ChatContaner from './components/ChatContaner';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('https://publicapp-4395fe820af6.herokuapp.com/');
function App() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userinfo);
    setLoading(false);
  }, []);

  if (user.token) {
    return (
      <main className='relative '>
        <Header />
        <ChatContaner socket={socket} />
      </main>
    );
  }
  return (
    <main className='relative '>
      <AuthHeader />
      <Auth />
    </main>
  );
}

export default App;
