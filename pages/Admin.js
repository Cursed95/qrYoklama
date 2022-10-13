import React, { useEffect } from "react";
import { StyleSheet, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, ScrollView, RefreshControl } from "react-native";
import { Button } from "react-native-elements";


export default function AdminScreen({ navigation }) {

  const apiRoot = 'http://194.29.55.161:8080/';

  const [refreshing, setRefreshing] = React.useState(false);

  const [list, setList] = React.useState([]);

    async function fetchData() {
      setRefreshing(true);
      fetch(apiRoot + 'getScans')
        .then((response) => response.json())
        .then((data) => {

          setList(data['scans'].slice(0, 5));

          setRefreshing(false);
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }

    async function fetchDataHeadless() {
      fetch(apiRoot + 'getScans')
        .then((response) => response.json())
        .then((data) => {
          setList(data['scans'].slice(0, 5));
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
    }

	useEffect(() => {

    setInterval(fetchDataHeadless, 3000);

    fetchDataHeadless();

	}, []);

	const onButtonPress = () => {

		navigation.replace('LoginScreen');

	};


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.loginScreenContainer} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchData()} />
        }>

        <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Son Geçişler:</Text>
          {list.map((scan) => {
          return (
            <View>
              <Text key={scan[0]} style={styles.item}>{scan[1]} - {scan[2]} {scan[3]}</Text>
            </View>
          );
          })}
          <Button buttonStyle={styles.loginButton} onPress={() => onButtonPress()} title="Çıkış Yap" />
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
    fontSize: 45,
    fontWeight: "800",
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
    marginTop: 30,
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
  },
  item: {
    padding: 15,
    fontSize: 25,
    fontWeight: "600",
    borderColor: "#963232",
    borderWidth: 3,
    margin: 5,
    borderRadius: 15,
  },
  exportButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    height: 45,
    marginTop: 40,
    width: 100,
	  alignSelf: "center"
  }
});