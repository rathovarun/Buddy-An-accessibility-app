import * as React from 'react';
import { Text, View, StyleSheet,Button,ActivityIndicator,ScrollView,Image } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default class ToneAnalyser extends React.Component {
  constructor(props){
    super(props);
    this.users1=[];
    this.text= this.props.text;
    this.docTone=[];
    this.senTone=[];
    this.state={
      color:[],
      isLoading:false,
      toneText: "Please Click on Tone Button."
    }
   // this.loadApi();
  }
  loadApi(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic YXBpa2V5OjJPTXpuVU1qdk44N05kTDc1NTN2OUp5dnAxblpzZkYyMTVpelJnWEF2TkZu");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({text:this.text}),
      redirect: 'follow'
    };
    fetch("https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/a45ba9a8-74cc-46fe-875b-822e6e99d341/v3/tone?version=2017-09-21", requestOptions)
    .then(response => response.json())
    .then(result => { // console.log(result);
      this.docTone=result.document_tone;
      this.senTone=result.sentences_tone;
      this.senTone.map((item,i)=>{
      let joker;
      if(item.tones && item.tones.length>0){
        joker={"sentence_id":item.sentence_id, "text":item.text,"tone_id":item.tones
        }
      }
      else{
        joker={"sentence_id":item.sentence_id, "text":item.text,"tone_id":"notone"}
      }
      this.users1.push(joker);
      })
      this.setState({isLoading:false});
    })
    .catch(error => console.log('error', error));
  }
  changeStyleAnger(){
    
    this.setState({toneText:"It evokes due to injustice, conflict, humiliation "});
    let tcolor=[];
    console.log("anger Working");
    this.users1.map((item1,i1)=>{
      //console.log(item1);
      item1.tone_id.map((item,i)=>{
        //console.log(item);
        if(item.tone_id==="anger")
        tcolor.push("#E80521");
      else
        tcolor.push("black");
      })
    }
    )
    /*this.users1.tone_id.map((item,i)=>{
      console.log(item);
      if(item.tone_id==="anger")
        tcolor.push("#E80521");
      else
        tcolor.push("black");
    })*/
    this.setState({color:tcolor});
  }
  
  changeStyleAnalytical(){
    this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    console.log("analytical Working");
    this.users1.map((item1,i1)=>{
      //console.log(item1);
      item1.tone_id.map((item,i)=>{
       // console.log(item);
        if(item.tone_id==="analytical")
        tcolor.push("#075CD8");
      else
        tcolor.push("black");
      })
    }
    )
    /*this.users1.tone_id.map((item,i)=>{
      console.log(item);
      if(item.tone_id==="anger")
        tcolor.push("#E80521");
      else
        tcolor.push("black");
    })*/
    this.setState({color:tcolor});
  }

  changeStyleConfident(){
    this.setState({toneText:"it is person's degree of certainty"});
    let tcolor=[];
    console.log("confident Working");
    this.users1.map((item1,i1)=>{
     // console.log(item1);
      item1.tone_id.map((item,i)=>{
       // console.log(item);
        if(item.tone_id==="confident")
        tcolor.push("#A779D8");
      else
        tcolor.push("black");
      })
    }
    )
    /*this.users1.tone_id.map((item,i)=>{
      console.log(item);
      if(item.tone_id==="anger")
        tcolor.push("#E80521");
      else
        tcolor.push("black");
    })*/
    this.setState({color:tcolor});
  }

  changeStyleFear(){
    this.setState({toneText:"it is a response to impending danger."})
    let tcolor=[];
    console.log("fear Working");
    this.users1.map((item1,i1)=>{
      //console.log(item1);
      item1.tone_id.map((item,i)=>{
        //console.log(item);
        if(item.tone_id==="fear")
        tcolor.push("#325E2B");
      else
        tcolor.push("black");
      })
    }
    )
    /*this.users1.tone_id.map((item,i)=>{
      console.log(item);
      if(item.tone_id==="anger")
        tcolor.push("#E80521");
      else
        tcolor.push("black");
    })*/
    this.setState({color:tcolor});
  }

  changeStyleTentative(){
    this.setState({toneText:"it is person's degree of inhibition"})
    let tcolor=[];
    console.log("tentative Working");
    this.users1.map((item1,i1)=>{
      //console.log(item1);
      item1.tone_id.map((item,i)=>{
        //console.log(item);
        if(item.tone_id==="tentative")
        tcolor.push("#1AE5CD");
      else
        tcolor.push("black");
      })
    }
    )
    /*this.users1.tone_id.map((item,i)=>{
      console.log(item);
      if(item.tone_id==="anger")
        tcolor.push("#E80521");
      else
        tcolor.push("black");
    })*/
    this.setState({color:tcolor});
  }

  /*
  changeStyleAnalytical(){
    let tcolor=[];
    this.users1.map((item,i)=>{
      if(item.tone_id==="analytical")
        tcolor.push("#075CD8");
      else
        tcolor.push("black");
    })
    this.setState({color:tcolor});
  }

  changeStyleConfident(){
    let tcolor=[];
    this.users1.map((item,i)=>{
      if(item.tone_id==="confident")
        tcolor.push("#A779D8");
      else
        tcolor.push("black");
    })
    this.setState({color:tcolor});
  }

  changeStyleFear(){
    let tcolor=[];
    this.users1.map((item,i)=>{
      if(item.tone_id==="fear")
        tcolor.push("#325E2B");
      else
        tcolor.push("black");
    })
    this.setState({color:tcolor});
  }

  changeStyleTentative(){
    let tcolor=[];
    this.users1.map((item,i)=>{
      if(item.tone_id==="tentative")
        tcolor.push("#1AE5CD");
      else
        tcolor.push("black");
    })
    this.setState({color:tcolor});
  }

  changeStyleNotone(){
    let tcolor=[];
    this.users1.map((item,i)=>{
      item.tone_id
      if(item.tone_id==="notone")
        tcolor.push("blue");
      else
        tcolor.push("black");
    })
    this.setState({color:tcolor});
  }*/

  componentDidMount(){
    this.loadApi()
  }
  render(){
    const isLoading  = this.state.isLoading
    return(
      <View >
        {isLoading?<ActivityIndicator/>:(
          <>
           <ScrollView style={{height:200}}>
              <Text style={styles.paragraph}>{
                this.users1.map((item,i)=>{
                  return(
                    <Text style={{color:this.state.color[i]}}>{item.text}</Text>)
                })
              }</Text>
            </ScrollView>
      
            <Card>
              <Button title="Analytical" onPress={this.changeStyleAnalytical.bind(this)} color="#075CD8" />
              <Button title="Anger" onPress={this.changeStyleAnger.bind(this)} color="#E80521"/>
              <Button title="Confident" onPress={this.changeStyleConfident.bind(this)} color="#A779D8" />
              <Button title="Fear" onPress={this.changeStyleFear.bind(this)} color="#325E2B"/>
              <Button title="Tentative" onPress={this.changeStyleTentative.bind(this)} color="#1AE5CD" />
            </Card>
          </>
        )} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    justifyContent: 'left',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
