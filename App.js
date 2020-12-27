import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Button,Image,TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import { Col, Row, Grid } from "react-native-easy-grid";
import { createStackNavigator } from '@react-navigation/stack';  
import { NavigationContainer } from '@react-navigation/native';
// You can import from local files
import AssetExample from './components/AssetExample';
import TextElaborator from './textElaborator/textElabHome';
import InputText from './textElaborator/InputText'
import Pichat from './pichat/pichathome';
import ToneAnalyser from './textElaborator/toneAnalyser/toneAnalyser';
import TextAnalyser from './textElaborator/textAnalyser/textAnalyser';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
function HomeScreen({ navigation }) {
  
  const [name,setName]=useState("John");
  return (
    
          <View style={styles.container} >
          <Card style={{height:550}}>
            <Image  style={{width: 100,
              height: 100,
              marginLeft:125,
              marginTop:10,
              borderRadius: 100 / 2,
              }}source={require('./buddyImage.JPG')}/>
              <Text style={styles.paragraph}>Hello,<Text style={{fontSize:25, color:'blue'}}>{name}</Text></Text>
              <Text style={styles.paragraph}>I’d be glad to assist you with</Text>
            <View style={{margin:10}}>
            
            <TouchableHighlight onPress={() => navigation.navigate('Text Analyser')}>
            <View style={{flexDirection:"row"}}>
            <Image  style={{width: 70,
              height: 20,
              marginLeft:0,
              padding:0,
              marginTop:80,
              }}source={require('./click.gif')}/>
            <Image  style={{width: 200,
              height: 160,
              marginLeft:0,
              padding:0
              }}source={require('./textUnderF.jpg')}/>
            </View>  
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('Pichat')}>
            <View style={{flexDirection:"row"}}>
            <Image  style={{width: 70,
              height: 20,
              marginLeft:0,
              marginTop:80,
              padding:0
              }}source={require('./click.gif')}/>
            <Image  style={{width: 200,
              height: 160,
              marginLeft:0,
              padding:0
              }}source={require('./chatImage.png')}/></View>
            </TouchableHighlight>
            </View>
          </Card>
          </View>      
  );
}
function TextScreen({ navigation }) {
  return (
    <InputText/>
  );
}
function PichatScreen({ navigation }) {
  return (
    <Pichat/>
  );
}

const Stack=createStackNavigator();
export default function App() {
  
  const textAnalyser=()=>
  {
    console.log("Text Working");
    
  }
    const pichat=()=>
  {
    console.log("Pichat");
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Buddy" component={HomeScreen} />
        <Stack.Screen name="Text Analyser" component={TextScreen} />
        <Stack.Screen name="Pichat" component={PichatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
    /*return(
      <>
      <View style={{ flexDirection:"row" ,marginTop:40}}>
        <View >
          <TouchableHighlight
            style={{backgroundColor:'blue',
                    borderRadius:10,
                    borderWidth: 1,
                    borderColor: 'white',
                    width:100,
                    height:30
                  }}
            underlayColor='68a0cf'>
              <Text style={{
                    color:'white',
                    textAlign:'center'}}>Tone Analyser
              </Text>
          </TouchableHighlight>
        </View>
        <View >
          <TouchableHighlight
            style={{backgroundColor:'blue',
                    borderRadius:10,
                    borderWidth: 1,
                    borderColor: 'white',
                    width:100,
                    height:30
                  }}
            underlayColor='white'>
              <Text style={{
                    color:'white',
                    textAlign:'center'}}>Text Analyser
              </Text>
          </TouchableHighlight>  
        </View>
      </View>
      <Card>
        <ToneAnalyser/>
      </Card>
      </>
  )*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
