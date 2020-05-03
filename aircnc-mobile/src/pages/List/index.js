import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, SafeAreaView, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoggoutButton from '../../components/LoggoutButton';
import socketio from 'socket.io-client';
import SpotList from '../../components/SpotList';
import logo from '../../assets/logo.png';
import moment from 'moment';

function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.100.9:3333', {
        query: {user_id},
      });

      socket.on('booking_response', booking => {
        const date = moment(booking.date).format('DD/MM/YYYY hh:mm A');

        console.log(date);
        Alert.alert(
          `Sua reversa em ${booking.spot.company} em ${date} } foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          } `,
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
});

List.navigationOptions = ({navigation}) => ({
  title: 'Spots',
  headerRight: () => <LoggoutButton navigation={navigation} />,
});

export default List;
