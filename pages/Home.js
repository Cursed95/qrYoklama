import React, { useEffect } from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "react-native-elements";

export default function HomeScreen({ navigation }) {


	const [infoText, setInfoText] = React.useState("");
	const [qrState, setQrState] = React.useState(null);


	var saat = new Date().getHours();

	const yoklamalar = [["Öğlen Yoklaması", 12, 24]];

	// Check the time and set the info text and qr state
	// Run it only once at the start
	useEffect(() => {
		yoklamalar.forEach((yoklama) => {
			if (saat >= yoklama[1] && saat < yoklama[2]) {
				setInfoText(yoklama[0]);
				setQrState(true);
			} else {
				setInfoText("Şu anda yoklamanız bulunmamaktadır.");
				setQrState(false);
			}
		});
	}, []);

	const onButtonPress = () => {

		navigation.navigate('QRScreen');

	};


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Hoşgeldiniz!</Text>
			<Text style={styles.infoText}>{infoText}</Text>
            <Button buttonStyle={styles.loginButton} onPress={() => onButtonPress()} title="QR Okut" disabled={!qrState} />
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