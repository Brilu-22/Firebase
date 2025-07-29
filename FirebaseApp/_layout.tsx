import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

const RootLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      const inAuthGroup = segments[0] === '(auth)';

      if (currentUser && inAuthGroup) {
        // If user is signed in, redirect from auth screens to the main app
        router.replace('/profile');
      } else if (!currentUser && !inAuthGroup) {
        // If user is not signed in, redirect from main app to the login screen
        router.replace('/login');
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ title: 'Profile' }} />
    </Stack>
  );
};

export default RootLayout;