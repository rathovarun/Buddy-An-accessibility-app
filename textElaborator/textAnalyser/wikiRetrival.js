import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView , Image} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class WikiRetrival extends React.Component {
  constructor(props)
  {
    super(props);
    const addInfo=[];
    this.state={
      isLoading:true,
      url:''
    }
  }
  loadApi()
  {
    fetch("https://apis.sentient.io/microservices/utility/wikipedia/v0.1/getresults",
      {
        "method":"POST",
        "headers":{
          "x-api-key":"04A216B8B1194F4AA983",
          "content-type": "application/json",
        } ,
        "body": JSON.stringify({
            title: this.props.text,
            pageid: 0,
            filter_key:"all"
          }
        )
      }
    )
    .then(response => response.json())
    .then(json => { 
        console.log(json.results.images[0]);
        this.setState({url:json.results.images[0]})
        if(this.state.url!=''){
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
        <Text style={styles.paragraph}>
          {this.props.text}
        </Text>
        <ScrollView style={{height:400}}>
        <Card>
         { this.state.isLoading ?<ActivityIndicator size="large" color="#0000ff"/>:(
            <Image
          style={styles.tinyLogo}
          source={{uri: this.state.url}}
        />
          )
         }
        </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
