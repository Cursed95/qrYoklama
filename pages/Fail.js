import React from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, Image } from "react-native";
import { Button } from "react-native-elements";

export default function FailScreen(props) {

	const onButtonPress = () => {

		props.navigation.navigate('HomeScreen');

	};


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <Image source={require('../assets/crossIcon.png')} style={styles.icon} />
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Yoklamanız Tamamlanamadı!</Text>
            <Text style={styles.infoText}>{props.route.params.message}</Text>
            <Button buttonStyle={styles.loginButton} onPress={() => onButtonPress()} title="➜" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#963232"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 30,
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
  loginButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
    borderColor: "white",
    height: 50,
    marginTop: 10,
    width: 50,
	  alignSelf: "center"
  },
  icon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 205,
  }
});