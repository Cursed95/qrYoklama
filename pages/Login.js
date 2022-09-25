import React from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "react-native-elements";

export default function LoginScreen({ navigation }) {

  const [schoolNumber, setSchoolNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginState, setLoginState] = React.useState(null);
  const [loading, setLoading] = React.useState(false);


  const onLoginPress = (schoolNumber, password) => {

    setLoading(true);

    fetch('https://SeparateImmenseSort.devicetr.repl.co/login?schoolNumber=' + schoolNumber + '&password=' + password)
    .then((response) => response.text())
    .then((data) => {
      if (data === 'True') {
        setLoginState(true);
        navigation.navigate('HomeScreen');
      } else {
        setLoading(false);
        setLoginState(false);
      }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
        setLoading(false);
        throw error;
      });

  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Giriş Yap</Text>
            <TextInput placeholder="Okul Numarası" placeholderColor="#c4c3cb" onChangeText={setSchoolNumber} style={styles.loginFormTextInput} />
            <TextInput placeholder="Şifre" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={setPassword} secureTextEntry={true} />
            <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress(schoolNumber, password)} title="Login" disabled={loading}/>
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
    marginTop: 150,
    marginBottom: 30,
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
    width: 350,
    alignItems: "center"
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});