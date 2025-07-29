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

  // 🔐 Watch for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            setUser(null);
            toast.error('User record not found.');
          }
        } catch (err) {
          console.error('Error loading user:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔓 Login + device lock
  const login = async (email, password) => {
    try {
      const deviceId = await getDeviceId();
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        toast.error('User record not found in Firestore.');
        return;
      }

      const userData = userDoc.data();

      // 🔒 Check or set device lock
      const lockRef = doc(db, 'deviceLocks', uid);
      const lockSnap = await getDoc(lockRef);

      if (!lockSnap.exists()) {
        await setDoc(lockRef, { deviceId });
      } else {
        const savedDeviceId = lockSnap.data().deviceId;
        if (savedDeviceId !== deviceId) {
          await signOut(auth);
          toast.error('Access denied: This account is locked to another device.');
          return;
        }
      }

      // ✅ All good, set user and redirect
      setUser(userData);
      toast.success('Login successful!');
      navigate(userData.hasPaid ? '/' : '/catalog');

    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.message || 'Login failed.');
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Logout failed');
    }
  };

  // 💰 Mark user as paid
  const markPaymentDone = async () => {
    try {
      if (!user) {
        toast.error('No user to update.');
        return;
      }

      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const updatedUser = { ...user, hasPaid: true };
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, updatedUser);

      const freshSnap = await getDoc(docRef);
      if (freshSnap.exists()) {
        setUser(freshSnap.data());
        toast.success('Payment completed!');
      }

    } catch (err) {
      console.error('Payment update failed:', err);
      toast.error('Failed to mark payment.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, markPaymentDone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);