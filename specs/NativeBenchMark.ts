import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface WifiInfo {
  ssid: string;
  bssid: string;
  frequency: number;
  linkSpeed: number;
  ipAddress: string;
  rssi: number;
  rxLinkSpeedMbps: number;
  txLinkSpeedMbps: number;
}
export interface Spec extends TurboModule {
  getBuild(): Promise<String>;
  getWifiInfo(): Promise<WifiInfo>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBenchMark');
