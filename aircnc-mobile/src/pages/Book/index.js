import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoggoutButton from '../../components/LoggoutButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import api from '../../services/api';

function Book({navigation}) {
  const spotParam = navigation.getParam('spot');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
    setMode('date');
  };

  const handleShowTimePicker = () => {
    setShowDatePicker(true);
    setMode('time');
  };

  const handleDateSelected = () => {
    setShowDatePicker(false);
  };

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(
      `spots/${spotParam._id}/booking`,
      {
        date,
      },
      {
        headers: {user_id},
      },
    );

    Alert.alert('Sua solicitacao foi realizada com sucesso.');
    navigation.navigate('List');
  }

  async function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      {!showDatePicker && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Qual a data ideal pra voce?"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={moment(date).format('DD/MM/YYYY hh:mm A')}
            onFocus={handleShowDatePicker}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Solicitar reserva</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
      {showDatePicker && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />

          {mode === 'date' && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleShowTimePicker}>
              <Text style={styles.buttonText}>Esse é o melhor dia!</Text>
            </TouchableOpacity>
          )}

          {mode === 'time' && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleDateSelected}>
              <Text style={styles.buttonText}>Esse é o melhor horario!</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

Book.navigationOptions = ({navigation}) => ({
  title: 'Booking',
  headerRight: () => <LoggoutButton navigation={navigation} />,
});

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#f05a5b',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Book;
