import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ Login method with loginTime
  const login = (username) => {
    const userObj = {
      username,
      loginTime: Date.now() // Save login time
    };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  // ✅ Logout clears everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // ✅ Return total time (minutes since login + 3 buffer)
  const getMindstormingTime = () => {
    if (!user?.loginTime) return 0;
    const now = Date.now();
    const diffMs = now - user.loginTime;
    const diffMinutes = Math.floor(diffMs / 60000);
    return diffMinutes + 3; // add bonus time
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getMindstormingTime }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to access context
export const useAuth = () => useContext(AuthContext);
