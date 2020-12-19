import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View ,TextInput} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text:'',
      score:'',
      data: [],
      dToneScore:'',
      dToneId:'',
      dToneName:'',
      sSenId:'',
      sSenText:'',
      isLoading: true
    };
  }
  componentDidUpdate()
  {
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic RjOVyytyip9VDrmDk2P2NvhAt7rTHn05Bqkbyn2tgyyf");
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body:JSON.stringify({
    text:this.state.text
  }),
  redirect: 'follow'
  };
  
  fetch("https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/7b443f00-3a5d-431a-9c89-a1638d09706d", requestOptions)
  .then(response => response.json())
  .then(result => {//console.log(result);
  result.document_tone.tones.map((item,i)=>{
          this.setState({dToneId:item.tone_id},
          {dToneScore:item.score},
          {dToneName:item.tone_name})
    })
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
          <p>{this.state.score}{this.state.dToneId}</p>
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
