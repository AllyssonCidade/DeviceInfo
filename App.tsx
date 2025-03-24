import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {NativeModules} from 'react-native';
import {PermissionsAndroid} from 'react-native';

// Acessando o módulo nativo corretamente
const {NativeBenchMark} = NativeModules;

// Interface para tipar os dados do Wi-Fi
interface WifiInfo {
  frequency: number;
  linkSpeed: number;
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
      <Text style={{fontSize: 18, marginBottom: 10}}>
        Informações do Wi-Fi:{' '}
        {wifiInfo
          ? `Freq: ${wifiInfo.frequency} MHz, Link: ${wifiInfo.linkSpeed} Mbps`
          : 'Carregando...'}
      </Text>
      <Button title="Atualizar Informações" onPress={getWifiInfo} />
      <Text style={{fontSize: 24, fontWeight: 'bold', color: 'blue'}}>
        Modelo do Dispositivo: {deviceModel || 'Carregando...'}
      </Text>
      <Button title="Atualizar Modelo" onPress={getBench} />
    </View>
  );
}
