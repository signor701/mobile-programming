import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet
} from 'react-native';

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signedIn, setSignedIn] = useState(false);

  const handleSignIn = () => {

    if (
      email === 'signorpandeya@gmail.com' &&
      password === '1500'
    ) {

      setSignedIn(true);
      setModalVisible(false);

    } else {

      alert('Invalid Email or Password');

    }
  };

  const handleClose = () => {

    setSignedIn(false);

  };

  return (

    <View style={styles.container}>

      {/* If Signed In */}
      {signedIn ? (

        <View>

          <Text style={styles.welcomeText}>
            Welcome Signor
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>

        </View>

      ) : (

        /* Show Sign In Button */
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>

            <Text style={styles.title}>Login</Text>

            <TextInput
              placeholder="Enter Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Enter Password"
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSignIn}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>
  );
};

export default App;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    width: 140,
    alignItems: 'center',
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    width: 140,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  },

  welcomeText: {
    fontSize: 28,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

});