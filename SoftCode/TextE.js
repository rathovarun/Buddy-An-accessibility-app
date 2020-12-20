import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View ,TextInput} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text:'',
      prevText:'',
      docData:[],
      senData:[],
      isLoading: true
    };
    this.setState({isLoading:true})
  }

  load()
  {
    this.setState({prevText:this.state.text});
    if(this.state.text==='')
    {
      this.setState({docData:[],senData:[],isLoading:true})
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YXBpa2V5OjBnOXBQeVVGM0JDWDJNc1JJRnh0TUZRUVA1SlhpREZ1bVF1WTVqS2kySS13");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        text:this.state.text
      }),
      redirect: 'follow'
    };
   fetch("https://api.au-syd.tone-analyzer.watson.cloud.ibm.com/instances/fc8966f3-f303-4f9d-8990-5dbc5ab1b852/v3/tone?version=2017-09-21", requestOptions)
   .then(response => response.json())
      .then(json => {
        this.setState({docData:json.document_tone.tones})
        this.setState({senData:json.sentences_tone})
        this.setState({isLoading:false})
        console.log(this.state.docData)
        console.log(this.state.senData)})
      .catch(error => console.log('error', error))
  }
  componentDidUpdate()
  {
    if (this.state.prevText!==this.state.text) {
      this.load();
    }
  }
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text1 => this.setState({text:text1})}
        defaultValue={this.state.text}
      />
        {isLoading ? <ActivityIndicator/> : (
          <div>
          <p>"Doc_tone"</p>
          <ul>
          {this.state.docData.map((item,i)=>{
            return <li key={i}>{item.score} - {item.tone_name}</li>
          }
          )
          }
          </ul>
          <p>"Sen_tone"</p>
          <ul>
          {this.state.senData.map((item,i)=>{
            return <li key={i}>{item.sentence_id} - {item.text}
            <p>"subTone"</p>
            <ul>
            {
              item.tones.map((subItem,i1)=>{
                return <li key={i1}>{subItem.score} - {subItem.tone_name}</li>
              }
              )
            }
            </ul>
            </li>
          }
          )
          }
          </ul>
          
          </div>
          /*<FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
        */)}
      </View>
    );
  }
};
