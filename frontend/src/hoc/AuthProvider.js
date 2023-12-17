import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('user'))?.token || null);
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user'))?.username || null);

  const signIn = (user, moveLocation) => {
    setUserToken(user.token);
    setUsername(user.username);
    localStorage.setItem('user', JSON.stringify(user));
    moveLocation();
  };

  const signOut = (moveLocation) => {
    setUserToken(null);
    setUsername(null);
    localStorage.removeItem('user');
    moveLocation();
  };

  const value = useMemo(() => ({
    userToken,
    username,
    signIn,
    signOut,
  }), [userToken, username]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
