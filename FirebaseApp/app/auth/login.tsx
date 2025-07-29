import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Make sure you are importing 'auth' from the correct path and that it is exported in '../../../firebase'
import { getAuth } from 'firebase/auth';

// If you have initialized Firebase elsewhere, you may need to import your firebase app instance and pass it to getAuth
// import { firebaseApp } from '../../../firebase';
// const auth = getAuth(firebaseApp);

// If you just need the default instance:
const auth = getAuth();
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) return Alert.alert("Error", "Please fill in all fields.");
    
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => console.log('Logged in!'))
      .catch((error: any) => Alert.alert("Login Error", error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TouchableOpacity onPress={handleLogin} style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/register')} style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    input: { width: '100%', marginVertical: 10, padding: 15, borderWidth: 1, borderColor: 'gray', borderRadius: 5 },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    buttonOutline: { backgroundColor: 'white', borderColor: '#007BFF', borderWidth: 2 },
    buttonOutlineText: { color: '#007BFF', fontWeight: 'bold' },
});