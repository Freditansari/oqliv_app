import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

export default function App() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <WebView originWhitelist={['*']}
          onShouldStartLoadWithRequest={(request) =>{
               // short circuit these
              if (!request.url ||
                request.url.startsWith('http') ||
                request.url.startsWith("/") ||
                request.url.startsWith("#") ||
                request.url.startsWith("javascript") ||
                request.url.startsWith("about:blank")
              ) {
                return true;
              }

              // blocked blobs
              if(request.url.startsWith("blob")){
                Alert.alert("Link cannot be opened.");
                return false;
              }

              // list of schemas we will allow the webview
              // to open natively
              if(request.url.startsWith("tel:") ||
                request.url.startsWith("mailto:") ||
                request.url.startsWith("maps:") ||
                request.url.startsWith("geo:") ||
                request.url.startsWith("sms:")
                ){

                Linking.openURL(request.url).catch(er => {
                  Alert.alert("Failed to open Link: " + er.message);
                });
                return false;
              }

              // let everything else to the webview
              return true;
          }}
          source={{uri: 'http://www.oqliv.com'}}
          setSupportMultipleWindows={true}
          allowsInlineMediaPlayback={true}
          />
          </SafeAreaView>
    </SafeAreaProvider>
  
  );
}

