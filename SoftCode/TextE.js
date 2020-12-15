import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View ,TextInput} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text:'',
      score:'',
      data: [],
      isLoading: true
    };
  }
  componentDidUpdate()
  {
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YXBpa2V5Ok1sVTJVc1NHUko4NWlPRndNT1JXNzZ1dmxwM3EzZVVWTnVhelVZU2ZSM2ZX");
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body:JSON.stringify({
    text:this.state.text
  }),
  redirect: 'follow'
  };
  
  fetch("https://api.au-syd.tone-analyzer.watson.cloud.ibm.com/instances/71a8225b-478e-4b69-a388-e6bb9c97de23/v3/tone?version=2017-09-21", requestOptions)
  .then(response => response.json())
  .then(result => {//console.log(result);
  this.setState({score:result.document_tone.tones[0].score});
/*console.log(this.state.score);*/})
  .catch((error) => console.error(error))
  .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  /*componentDidMount() {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.movies });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
*/
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
          <p>{this.state.score}</p>
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








