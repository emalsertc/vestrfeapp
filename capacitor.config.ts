import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vestrf.app',
  appName: 'Vestrf',
  webDir: 'dist',
  server: {
    url: 'http://localhost:3000',
    cleartext: true,
    androidScheme: 'http'
  },
  ios: {
    contentInset: 'always'
  }
};

export default config; 