import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class ContextRetrival extends React.Component {
  constructor(props)
  {
    super(props);
    const context=[];
    const nmisc=[];
    const norg=[];
    const nper=[];
    this.state={
      isLoading:true
    }
  }
  loadApi()
  {
    fetch("https://apis.sentient.io/microservices/nlp/wordsensedisambiguation/v1/getpredictions",
      {
        "method":"POST",
        "headers":{
          "x-api-key":"785B43F931744A2FB4D8",
          "content-type": "application/json",
        } ,
        "body": JSON.stringify({
            text: this.props.text,
            target_word: this.props.word,
            repeat:"True"
          }
        )
      }
    )
    .then(response => response.json())
    .then(json => { 
        this.context=json.results.tokens;
        console.log(this.context);
        if(json.status==="Success"){
          console.log("dsd")
          this.setState({isLoading:false});
        }
      }
    )
    .catch(err => { console.log(err); })
  }
  componentDidMount()
  {
    this.loadApi();
  }
  render(){
    return (
      <View >
        <ScrollView style={{height:400}}>
        <Card>
        </Card>
        </ScrollView>
      </View>
    );
  }
}
