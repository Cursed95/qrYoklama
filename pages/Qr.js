import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScreen({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
  
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
  
	// What happens when we scan the bar code
	const handleBarCodeScanned = ({ type, data }) => {
		if (data.startsWith("afl")) {
			console.log("Scanned: " + data);
			navigation.navigate('DoneScreen');
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
			onBarCodeScanned={handleBarCodeScanned}
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