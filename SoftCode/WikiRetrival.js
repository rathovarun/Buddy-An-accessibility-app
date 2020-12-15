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
      fetch("https://apis.sentient.io/microservices/utility/wikipedia/v0.1/getresults",
      {
          "method":"POST",
          "headers":{
            "x-api-key":"04A216B8B1194F4AA983",
            "content-type": "application/json",
          } ,
          "body": JSON.stringify({
              title: this.state.text,
              pageid: 0,
            })
      })
      .then(response => response.json())
      .then(response => { //console.log(response.results.summary);
            this.setState({score:response.results.summary});
            console.log(this.state.score);
      })
      .catch(err => { console.log(err); })
      .finally(() => {
        this.setState({ isLoading: false });
      });

  }

  /*.then(result => {console.log(result);
 /* this.setState({score:result.results.summary});*/
/*console.log(this.state.score);})

  }

  /*.then(result => {console.log(result);
 /* this.setState({score:result.results.summary});*/
/*console.log(this.state.score);})
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








