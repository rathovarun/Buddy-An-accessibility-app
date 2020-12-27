import * as React from 'react';
import { Text, View, StyleSheet ,Button,TouchableHighlight,Image, TouchableWithoutFeedback} from 'react-native';
import Constants from 'expo-constants';

import { createStackNavigator } from '@react-navigation/stack';  
import { NavigationContainer } from '@react-navigation/native';
// You can import from local files
import AssetExample from '../components/AssetExample';
import ToneAnalyser from './toneAnalyser/toneAnalyser';
import TextAnalyser from './textAnalyser/textAnalyser'
import EntityRetrival from './textAnalyser/entityRetrival';
import ContextRetrival from './textAnalyser/contextRetrival';
import WikiRetrival from './textAnalyser/wikiRetrival';
// or any pure javascript modules available in npm <ToneAnalyser text="Change code in the editor and watch it change on your phone! Save to get a shareable url." />
import { Card } from 'react-native-paper';
export default class TextElaborator extends React.Component {
  constructor(props)
  {
    console.log("constri");
    super(props);
    this.state={
      onTone:false,
      onToneColorF:'#800080',
      onToneColorB:'white',
      onTextColorF:'white',
      onTextColorB:'#800080'
    }
   // console.log(this.state.ontone);
    
  }
   onToneselect() {
    console.log("onTone");
    this.setState({onToneColorB:'#800080'});    
    this.setState({onToneColorF:'white'});  
    this.setState({onTextColorF:'#800080'});
    this.setState({onTextColorB:'white'});
    this.setState({onTone:true});
    //return this.state;
     //console.log("ontonetext"+this.state.onTone);
  }
  onTextselect(){
    console.log("onText");
    this.setState({onToneColorB:'white'});    
    this.setState({onToneColorF:'#800080'});  
    this.setState({onTextColorF:'white'});
    this.setState({onTextColorB:'#800080'});
    this.setState({onTone:false});
    //return this.state;
     //console.log("ontext"+this.state.onTone);
  }
  render(){
    console.log("render");
    console.log("render"+this.state.onTone);
    let temp=this.state.onTone;
    return(
      <>
      <View style={{ flexDirection:"row" }}>
        <View >
          <TouchableHighlight
            style={{backgroundColor:this.state.onToneColorB,
                    borderRadius:10,
                    borderWidth: 1,
                    borderColor: this.state.onToneColorF,
                    width:100,
                    height:30
                  }}
            onPress={this.onToneselect.bind(this)}
            underlayColor='68a0cf'>
              <Text style={{
                    color:this.state.onToneColorF,
                    textAlign:'center'}}>Tone Analyser
              </Text>
          </TouchableHighlight>
        </View>
        <View >
          <TouchableHighlight
            style={{backgroundColor:this.state.onTextColorB,
                    borderRadius:10,
                    borderWidth: 1,
                    borderColor: this.state.onTextColorF,
                    width:100,
                    height:30
                  }}
            onPress={this.onTextselect.bind(this)}
            underlayColor='white'>
              <Text style={{
                    color:this.state.onTextColorF,
                    textAlign:'center'}}>Text Analyser
              </Text>
          </TouchableHighlight>  
        </View>
      </View>
      <Card>
        {this.state.onTone?<ToneAnalyser text={this.props.text1}/>:<TextAnalyser text={this.props.text1}/>}
      </Card>
      </>
    );    
  }

}

