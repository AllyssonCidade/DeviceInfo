import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {NativeModules} from 'react-native';
import {PermissionsAndroid} from 'react-native';

// Acessando o módulo nativo corretamente
const {NativeBenchMark} = NativeModules;

// Interface para tipar os dados do Wi-Fi
interface WifiInfo {
  ssid: string;
  bssid: string;
  frequency: number;
  linkSpeed: number;
  ipAddress: string;
  rssi: number;
  rxLinkSpeedMbps: number;
  txLinkSpeedMbps: number;
}

const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Localização',
        message:
          'Este aplicativo precisa acessar sua localização para obter informações do Wi-Fi.',
        buttonNeutral: 'Perguntar Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permissão de localização concedida');
      return true;
    } else {
      console.log('Permissão de localização negada');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default function App(): React.JSX.Element {
  const [deviceModel, setDeviceModel] = useState<string | null>(null);
  const [wifiInfo, setWifiInfo] = useState<WifiInfo | null>(null);

  async function getWifiInfo() {
    try {
      const info = await NativeBenchMark.getWifiInfo();
      setWifiInfo(info);
    } catch (error) {
      console.error('Erro ao obter informação de WiFi:', error);
    }
  }

  async function getBench() {
    try {
      const model = await NativeBenchMark.getBuild();
      setDeviceModel(model);
    } catch (error) {
      console.error('Erro ao obter modelo:', error);
    }
  }

  async function Refresh() {
    await getBench();
    await getWifiInfo();
  }

  useEffect(() => {
    const initialize = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        await getBench();
        await getWifiInfo();
      }
    };
    initialize();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 10,
        }}>
        Wi-Fi
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}>
        {wifiInfo
          ? `
          Freq: ${wifiInfo.frequency} MHz, 
          Link: ${wifiInfo.linkSpeed} Mbps, 
          RSSI: ${wifiInfo.rssi} dBm, 
          IP: ${wifiInfo.ipAddress}, 
          RX: ${wifiInfo.rxLinkSpeedMbps} Mbps, 
          TX: ${wifiInfo.txLinkSpeedMbps} Mbps,
          ssid: ${wifiInfo.ssid},
          bssid: ${wifiInfo.bssid},
          `
          : 'Carregando...'}
      </Text>
      <Text style={{fontSize: 22, marginBottom: 10, fontWeight: 'bold'}}>
        Device
      </Text>
      <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'left'}}>
        {deviceModel || 'Carregando...'}
      </Text>

      <Button title="Resresh" onPress={Refresh} />
    </View>
  );
}
