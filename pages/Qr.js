import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function QRScreen({ navigation }) {

	const apiRoot = 'https://SeparateImmenseSort.devicetr.repl.co/';

	const [hasPermission, setHasPermission] = useState(null);

	const [scanned, setScanned] = useState(false);
  
	const askForCameraPermission = () => {
	  (async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		setHasPermission(status === 'granted');
	  })()
	}
  
	// Request Camera Permission
	useEffect(() => {
	  askForCameraPermission();
	}, []);

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

  
	// What happens when we scan the bar code
	const handleBarCodeScanned = async ({ type, data }) => {
		if (data.startsWith("afl")) {

			setScanned(true);
			
			userData = await getData('userData');

			fetch(apiRoot + 'scan?userData=' + userData + '&qrData=' + data)
			.then((response) => response.json())
			.then((data) => {
			if (data['status'] === true) {
				
				navigation.navigate('SuccessScreen');

			}
			else {
				navigation.navigate('FailScreen', { message: data['message'] });
			}
			})
			.catch(function(error) {
			console.log('There has been a problem with your fetch operation: ' + error.message);
				setLoading(false);
				throw error;
			});

		}
	};
  
	// Check permissions and return the screens
	if (hasPermission === null) {
	  return (
		<View style={styles.container}>
		  <Text>Kamera izni isteniyor.</Text>
		</View>)
	}
	if (hasPermission === false) {
	  return (
		<View style={styles.container}>
		  <Text style={{ margin: 10 }}>Kamera izni yok.</Text>
		  <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
		</View>)
	}
  
	// Return the View
	return (
	  <View style={styles.container}>
		<View style={styles.barcodebox}>
		  <BarCodeScanner
			onBarCodeScanned={scanned ? null : handleBarCodeScanned}
			style={{ height: 400, width: 400 }} />
		</View>
	  </View>
	);
  }
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	maintext: {
	  fontSize: 16,
	  margin: 20,
	},
	barcodebox: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  height: 300,
	  width: 300,
	  overflow: 'hidden',
	  borderRadius: 30
	}
  });