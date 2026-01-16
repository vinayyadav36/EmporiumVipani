import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emproium.vipani',
  appName: 'EmproiumVipani',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    url: 'http://localhost:5173'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ecfdf5',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#10b981',
      splashFullScreen: true,
      splashImmersive: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#ecfdf5'
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_custom',
      iconColor: '#10b981',
      sound: 'beep.wav'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    App: {
      backgroundColor: '#ecfdf5'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    },
    Geolocation: {
      permissions: ['location']
    }
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: true
  },
  android: {
    backgroundColor: '#ecfdf5',
    allowMixedContent: true,
    useLegacyBridge: false
  }
};

export default config;
