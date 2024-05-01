import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ensayos',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
      SplashScreen: {
        launchShowDuration: 5000,
        launchAutoHide: false,
        launchFadeOutDuration: 3000,
        backgroundColor: "#ffffffff",
        androidSplashResourceName: "splash",
        androidScaleType: "CENTER",
        showSpinner: true,
        androidSpinnerStyle: "large",
        iosSpinnerStyle: "small",
        spinnerColor: "#999999",
        splashFullScreen: true,
        splashImmersive: true,
        layoutName: "launch_screen",
        useDialog: true,
      }
    }
};

export default config;
