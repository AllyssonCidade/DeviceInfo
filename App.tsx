import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';

// Importando o módulo nativo
import NativeBenchMark from './specs/NativeBenchMark';

export default function App(): React.JSX.Element {
  const [deviceModel, setDeviceModel] = useState<String | null>(null);

  async function getBench() {
    try {
      const model = await NativeBenchMark.getBuild();
      setDeviceModel(model);
    } catch (error) {
      console.error('Erro ao obter modelo:', error);
    }
  }

  useEffect(() => {
    getBench();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>
        Modelo do Dispositivo:
      </Text>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: 'blue'}}>
        {deviceModel || 'Carregando...'}
      </Text>

      <Button title="Atualizar Modelo" onPress={getBench} />
    </View>
  );
}
