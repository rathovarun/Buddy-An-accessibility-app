import React from "react";
import { ActivityIndicator, FlatList, Text, View ,TextInput} from 'react-native';

export default class wikiRetrieval extends React.Component {
  constructor(props){
    super(props);
    this.state = { users: [],
              text:'',
              isLoading:true,
              prevText:"s"
            };
    
    this.setState({isLoading:true})
  }
  /*componentDidMount() {
    this.load();
  }*/

  load() {
    this.setState({prevText:this.state.text});
    if(this.state.text==='')
    {
      this.setState({users:[],isLoading:true})
      return;
    }
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
      .then(json => { //console.log(response.results.summary);
      // console.log(this.state.users); 
      // console.log("fgr");
        if(json.message==="successfully processed"){
            this.setState({users:json.results});
            console.log(this.state.users);    
            this.setState({ isLoading: false });
        }
        else{   
        this.setState({ isLoading: true });
          console.log('problem');
        }
      })
      .catch(err => { console.log(err); })
      .finally(() => {
      });
  }

  componentDidUpdate(prevProps) {
    if (this.state.prevText!==this.state.text) {
      this.load();
    }
  }

  render() {
    return(
      <View style={{ flex: 1, padding: 24 }}>
        <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text1 => this.setState({text:text1})}
        defaultValue={this.state.text}
      />
      {
          this.state.isLoading ?<ActivityIndicator/>:(
            <p>{this.state.users.summary}</p>
          )
      }
      </View>
    );
  }
}
