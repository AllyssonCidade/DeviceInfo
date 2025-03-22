import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getBuild(): Promise<String>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBenchMark');
