import * as React from 'react';
import { Text, View, StyleSheet,Button,ActivityIndicator,ScrollView,Image } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default class ToneAnalyser extends React.Component {
  constructor(props){
    super(props);
    this.users1=[];
    this.text= this.props.text
    this.docTone=[];
    this.senTone=[];
    this.state={
      color:[],
      isLoading:false,
      toneText: "Please Click on Tone Button.",
      notone: false
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
    .then(result => {  console.log(result);
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
    this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    console.log("analytical Working");
    let no=true;
    this.users1.map((item1,i1)=>{
      console.log(item1);
      let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="anger")
            check=true
      })
      }
      console.log(check);
      if(check==true)
      {
        tcolor.push("#E80521");
        no=false;
      }
      else
        tcolor.push("black");
    }
    )
    if(no==true)
    {
      this.setState({notone:true})
    }
    else
    {
      this.setState({notone:false})
    }
    this.setState({color:tcolor});
    /*this.setState({toneText:"It evokes due to injustice, conflict, humiliation "});
    let tcolor=[];
    console.log("anger Working");
    console.log(this.users1);
    this.users1.map((item1,i1)=>{
      console.log(item1);
      /*let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="anger")
            check=true
      })
      }
      console.log(check);
      if(check==true)
        tcolor.push("#E80521");
      else
        tcolor.push("black");
    }
    )
    this.setState({color:tcolor});*/
  }
  
  changeStyleAnalytical(){
    let no=true;
    this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    console.log("analytical Working");
    this.users1.map((item1,i1)=>{
      console.log(item1);
      let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="analytical")
            check=true
      })
      }
      console.log(check);
      if(check==true)
      {
        no=false;
        tcolor.push("#075CD8");
      }
      else
        tcolor.push("black");
    }
    )
    
    if(no==true)
    {
      this.setState({notone:true})
    }
    
    else
    {
      this.setState({notone:false})
    }
    this.setState({color:tcolor});
  }
changeStyleSadness(){
    this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    let no=true;
    console.log("sadness Working");
    this.users1.map((item1,i1)=>{
      console.log(item1);
      let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="sadness")
            check=true
      })
      }
      console.log(check);
      if(check==true)
      {
        no=false;
        tcolor.push("#566573");
      }
      else
        tcolor.push("black");
    }
    )
    
    if(no==true)
    {
      this.setState({notone:true})
    }
    else
    {
      this.setState({notone:false})
    }
    this.setState({color:tcolor});
  }

  changeStyleConfident(){
     this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    let no=true;
    console.log("confident Working");
    this.users1.map((item1,i1)=>{
      console.log(item1);
      let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="confident")
            check=true
      })
      }
      console.log(check);
      if(check==true)
      {
        no=false;
        tcolor.push("#A779D8");
      }
      else
        tcolor.push("black");
    }
    )
    
    if(no==true)
    {
      this.setState({notone:true})
    }
    else
    {
      this.setState({notone:false})
    }
    this.setState({color:tcolor});
    
  }

  changeStyleFear(){
    this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    let no=true;
    console.log("fear Working");
    this.users1.map((item1,i1)=>{
      console.log(item1);
      let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="fear")
            check=true
      })
      }
      console.log(check);
      if(check==true)
      {
        no=false;
        tcolor.push("#325E2B");
      }
      else
        tcolor.push("black");
    }
    )
    
    if(no==true)
    {
      this.setState({notone:true})
    }
    else
    {
      this.setState({notone:false})
    }
    this.setState({color:tcolor});
    
  }

  changeStyleTentative(){
    let no=true;
    this.setState({toneText:"It indicates person's reasoning and analytisis "});
    let tcolor=[];
    console.log("tentative Working");
    this.users1.map((item1,i1)=>{
      console.log(item1);
      let check =false;
      if(item1.tone_id=="notone"){
        check=false;
      }
      else{
        item1.tone_id.map((item,i)=>{
          if(item.tone_id==="tentative")
            check=true
      })
      }
      console.log(check);
      if(check==true)
      {
        no=false;
        tcolor.push("#1AE5CD");
      }
      else
        tcolor.push("black");
    }
    )
    
    if(no==true)
    {
      this.setState({notone:true})
    }
    else
    {
      this.setState({notone:false})
    }
    this.setState({color:tcolor});
    
  }

  componentDidMount(){
    this.loadApi()
  }
  render(){
    const isLoading  = this.state.isLoading
    return(
      <View >
        {isLoading?<ActivityIndicator/>:(
          <>
        {this.state.notone?<Text style={styles.paragraph}>"No Tone"</Text >:  ( <ScrollView style={{height:170}}>
              <Text style={styles.paragraph}>{
                this.users1.map((item,i)=>{
                  return(
                    <Text style={{color:this.state.color[i]}}>{item.text}</Text>)
                })
              }</Text>
            </ScrollView>)}
            <Card>
            
          <Text style={styles.paragraph}>"Click on Text to get Highlighted Text"</Text>
              <Button title="Analytical" onPress={this.changeStyleAnalytical.bind(this)} color="#075CD8" />
              <Button title="Anger" onPress={this.changeStyleAnger.bind(this)} color="#E80521"/>
              <Button title="Confident" onPress={this.changeStyleConfident.bind(this)} color="#A779D8" />
              <Button title="Fear" onPress={this.changeStyleFear.bind(this)} color="#325E2B"/>
              <Button title="Tentative" onPress={this.changeStyleTentative.bind(this)} color="#1AE5CD" />
              <Button title="Sadness" onPress={this.changeStyleSadness.bind(this)} color="#566573" />
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
