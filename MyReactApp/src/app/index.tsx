import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [cardColor, setCardColor] = useState('skyblue');

  const changeColor = () => {
    if (cardColor === 'skyblue') {
      setCardColor('lightgreen');
    } else {
      setCardColor('skyblue');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.cardText}>This is a Card</Text>

        <TouchableOpacity style={styles.button} onPress={changeColor}>
          <Text style={styles.buttonText}>Change Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  card: {
    width: 300,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },

  cardText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'Black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: 'Red',
    fontSize: 16,
  },
});