import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { getDeviceId } from '../utils/getDeviceId'; // Assuming you have a utility function to get device ID
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
    
    });
    return () => unsubscribe();
  }, []);





  const login = async (email, password) => {
    try {
     const deviceId = await getDeviceId();
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
const userData = userDoc.data();

// 2. Check or save device lock
const lockRef = doc(db, 'deviceLocks', uid);
const lockSnap = await getDoc(lockRef);

if (!lockSnap.exists()) {
  // First time login — save device
  await setDoc(lockRef, { deviceId });
} else {
  const savedDeviceId = lockSnap.data().deviceId;
  if (savedDeviceId !== deviceId) {
    // Device mismatch — deny login
    await signOut(auth);
    toast.error('Access denied: This account is locked to another device. Contact support to reset.');
    return;
  }
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
    <AuthContext.Provider value={{ user, login, logout, markPaymentDone }}>
      { children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
