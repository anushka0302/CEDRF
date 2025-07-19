import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);





  const login = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
        toast.success('Login successful!');
        navigate(userDoc.data().hasPaid ? '/' : '/catalog');
      } else {
        toast.error('User record not found in Firestore.');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success('Logged out');
    navigate('/login');
  };

  const markPaymentDone = async () => {
    if (!user) return;
    const updatedUser = { ...user, hasPaid: true };
    const docRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(docRef, updatedUser);
     const freshSnap = await getDoc(docRef);
  if (freshSnap.exists()) {
    setUser(freshSnap.data()); // ✅ updates with the true value
  }
    toast.success('Payment completed!');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, markPaymentDone }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
