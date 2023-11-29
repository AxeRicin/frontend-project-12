import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);

  const signIn = (newToken, moveLocation) => {
    setUserToken(newToken);
    localStorage.setItem('userToken', newToken);
    moveLocation();
  };

  const signOut = (moveLocation) => {
    setUserToken(null);
    localStorage.removeItem('userToken');
    moveLocation();
  };

  const value = useMemo(() => ({
    userToken,
    signIn,
    signOut,
  }), [userToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
