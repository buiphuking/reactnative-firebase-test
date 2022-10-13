/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {SERVER_URL_API} from '../config/constant';
import axios from 'axios';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
async function getToken() {
  const deviceToken = await messaging().getToken();
  console.log('deviceToken:', deviceToken);
}

const Notification = () => {
  useEffect(() => {
    async function getPermission() {
      await requestUserPermission();
    }
    async function getTo() {
      await getToken();
    }

    getPermission();
    getTo();

  }, []);
  const [d, setD] = useState();
  return (
    <View>
      <Text>Notification</Text>
      <Button
        onPress={async () => {
          const deviceToken = await messaging().getToken();
          console.log('onPress:', deviceToken);
          if (deviceToken) {
            axios
              .get(`${SERVER_URL_API}/index`, {
                // headers: {
                //   Authorization: `Bearer ${token}`,
                // },
                params: {
                  mssv: '018142031',
                  password: '2022',
                  deviceToken: deviceToken,
                },
              })
              .then(res => {
                if (res.status === 200) {
                  setD({
                    d: res.data,
                  });
                }
                console.log(res.data);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }}
        title="Nút"
      />
      {console.log(d?.d)}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
