import React, { useEffect } from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "react-native-elements";

export default function DoneScreen({ navigation }) {

	const onButtonPress = () => {

		navigation.navigate('HomeScreen');

	};


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Yoklamanız Tamamlandı!</Text>
            <Button buttonStyle={styles.loginButton} onPress={() => onButtonPress()} title="Ana Sayfaya Dön" />
          </View>
        </View>
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
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 130,
    marginBottom: 50,
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
    backgroundColor: "#3897f1",
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
});