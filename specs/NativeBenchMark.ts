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

export interface BuildInfo {
  model: string;
  manufacturer: string;
  version: string;
  sdk: string;
  board: string;
  device: string;
  display: string;
  odm_sku: string;
  id: string;
  product: string;
  serial: string;
  type: string;
}

export interface Spec extends TurboModule {
  getBuild(): BuildInfo;
  getWifiInfo(): WifiInfo;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBenchMark');
