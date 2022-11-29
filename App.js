import React,{useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,Linking,StyleSheet,Button,PermissionsAndroid,Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';



const App = () => {

  const [scannedText, setscannedText] = useState('Scanning');
  let scanner='';
  const [cameraIsOn, setcameraIsOn] = useState(false);
  const [isScanned, setisScanned] = useState(false);

  

  const onSuccess = e => {
      // Linking.openURL(e.data).catch(err =>
      //   console.error('An error occured', err)
      // );
      setscannedText(e.data);
      setisScanned(true);
      console.log(e.data);
      
    };
    const reactive = e => {
      if (scanner) {
        scanner._setScanning(false);
        setscannedText('Scanning');
        //console.log(scanner);
        setisScanned(false)
      }
      
    };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log(PermissionsAndroid.RESULTS.GRANTED);
        //return granted;
        setcameraIsOn(true)
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    if(cameraIsOn){
      console.log('You can');
    }else{
      requestCameraPermission()
    }
    
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.centerText}>
        <QRCodeScanner
          onRead={onSuccess}
          ref={(camera) => scanner = camera}
          style={styles.CamerWindo}
        />
       <View style={styles.containerFrame}></View>
      </View>
      <View style={styles.ResulrWindo}>
        <Text selectable={true} style={styles.item}>{scannedText}</Text>
        {/* <TouchableOpacity onPress={()=>{reactive()}}>request reactive</TouchableOpacity> */}
        {
        isScanned?(
            <TouchableOpacity onPress={()=>{reactive()}} style={styles.ScanAgain}>
              <Text style={styles.ButtnTxt}>Scan Again</Text>
            </TouchableOpacity>
          ):null
        }
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'grey',
    
  },
  CamerWindo:{
    padding:10,
    margin:10,
    
  },
  ResulrWindo:{
    position:'absolute',
    bottom:0,
    display:'flex',
    justifyContent:'center',
    width:'100%'
  },
  ScanAgain:{
    padding:8,
    backgroundColor:'blue',
    textAlign:'center',
  },
  ButtnTxt:{
    color:'white',
    textAlign:'center',
    fontWeight:'600'
  },
  item:{
    padding:10,
    backgroundColor:'white',
    margin:30,
    textAlign:'center'
  },
  

  
})

export default App;
