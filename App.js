import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const App = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [total, setTotal] = useState(null);
  const [numbers, setNumbers] = useState([]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Kamera İzni',
          message: 'Fotoğraf çekmek için kamera izni vermeniz gerekiyor.',
          buttonPositive: 'İzin Ver',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Kamera izni verilmedi.');
      return;
    }

    launchCamera({ mediaType: 'photo', quality: 1 }, async (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Kamera Hatası', response.errorMessage);
        return;
      }

      const uri = response.assets?.[0]?.uri;
      console.log('📸 Foto URI:', uri);
      if (!uri) {
        console.warn('❌ URI alınamadı.');
        return;
      }

      setPhotoUri(uri);

      try {
        const result = await TextRecognition.recognize(uri);
        console.log('🧠 OCR sonucu:', result);
      
        if (!result || !result.blocks || result.blocks.length === 0) {
          console.warn('❌ OCR hiçbir metin tanımlayamadı.');
          Alert.alert('Uyarı', 'Fotoğrafta sayı tespit edilemedi.');
          return;
        }
      
        const detectedNumbers = [];
      
        for (const block of result.blocks) {
          for (const line of block.lines || []) {
            for (const element of line.elements || []) {
              const text = element.text;
              const num = parseInt(text);
              if (!isNaN(num) && num >= 1 && num <= 13) {
                detectedNumbers.push(num);
              }
            }
          }
        }
      
        const totalSum = detectedNumbers.reduce((sum, n) => sum + n, 0);
      
        setNumbers(detectedNumbers);
        setTotal(totalSum);
      
        console.log('🔢 Tanınan sayılar:', detectedNumbers);
      } catch (err) {
        console.warn('❗️ OCR işleminde hata:', err);
        Alert.alert('OCR Hatası', err.message || 'Bir şeyler yanlış gitti.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="📸 Fotoğraf Çek" onPress={openCamera} />

        {photoUri && (
          <>
            <Image
              source={{ uri: photoUri }}
              style={{
                width: 250,
                height: 350,
                marginTop: 20,
                borderRadius: 10,
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.text}>🔍 Tanınan Sayılar: {numbers.join(', ')}</Text>
            <Text style={styles.text}>➕ Toplam: {total}</Text>
            <Text style={styles.text}>
              {total >= 101 ? '✅ GEÇERLİ EL' : '❌ YETERSİZ'}
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default App;
