import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jmg.cargarcredito',
  appName: 'carga-de-credito',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    SplashScreen: {
      launchAutoHide: false,
    }
  }
};

export default config;
