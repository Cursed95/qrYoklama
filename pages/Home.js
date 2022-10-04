import React, { useEffect } from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, ScrollView, RefreshControl, Image } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {

  const apiRoot = 'https://SeparateImmenseSort.devicetr.repl.co/';

	const [infoText, setInfoText] = React.useState("");
	const [qrState, setQrState] = React.useState(null);

  const [refreshing, setRefreshing] = React.useState(false);


  const getData = async (key) => {
		try {
		  const value = await AsyncStorage.getItem(key)
		  if(value !== null) {
			return value;
		  }
		} catch(e) {
			console.log('There has been a problem with your fetch operation: ' + e);
		}
	  }

    async function fetchData() {
      var userData = await getData('userData');
      var schoolNumber = JSON.parse(userData)['schoolNumber'];
      setRefreshing(true);
      fetch(apiRoot + 'getAvailableAttendances?schoolNumber=' + schoolNumber)
        .then((response) => response.json())
        .then((data) => {
          setQrState(data['isAttendanceAvailable']);
          setInfoText(data['message']);
          setRefreshing(false);
        })
        .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }

	useEffect(() => {

    fetchData();

	}, []);

	const onButtonPress = () => {

		navigation.navigate('QRScreen');

	};


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.loginScreenContainer} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchData()} />
        }>

        <Image source={require('../assets/iaflLogo.png')} style={styles.logo} />

        <View style={styles.loginFormView}>
			    <Text style={styles.logoText}>{infoText}</Text>
          <Button buttonStyle={styles.loginButton} onPress={() => onButtonPress()} title="QR Okut" disabled={!qrState} />
        </View>
      
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    marginTop: 50,
    flex: 1,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "600",
    marginTop: 45,
    marginBottom: 35,
    textAlign: "center",
  },
  infoText: {
    fontSize: 20,
    fontWeight: "400",
	  marginBottom: 15,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#963232",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 100,
	alignSelf: "center"
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  // align the item vertically
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginRight: 6,
    marginTop: 165
  }
});