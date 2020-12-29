import * as React from 'react';
import { Text, View, StyleSheet ,Button, ActivityIndicator,ScrollView,Image,TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
// or any pure javascript modules available in npm <ToneAnalyser text="Change code in the editor and watch it change on your phone! Save to get a shareable url." />
import { Card } from 'react-native-paper';

export default class TextAnalyser extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      dummy:'',
      url:'',
      entity:[],
      wiki:[],
      context:[],
      isLoading:false,
      isLoadingEntity:true,
      isLoadingContext:true,
      isLoadingWiki:true,
      isLoadingImage:true,
      image:null,
      load:"notclick",
    }
  }
  loadApiEntitiy(){
    fetch("https://apis.sentient.io/microservices/nlp/namedentityrecognition/v1/getpredictions",
      {
        "method":"POST",
        "headers":{
          "x-api-key":"785B43F931744A2FB4D8",
          "content-type": "application/json",
        } ,
        "body": JSON.stringify({
            text: this.props.text,  
          }
        )
      }
    )
    .then(response => response.json())
    .then(json => { console.log(json)
    if(json.results.loc && json.results.loc.length>0){
    json.results.loc.map((item,i)=>{
          this.state.entity.push(item);
      }
    )
    }
    if(json.results.org && json.results.org.length>0){
    json.results.org.map((item,i)=>{
          this.state.entity.push(item);
      }
    )
    }
    if(json.results.per && json.results.per.length>0){
    json.results.per.map((item,i)=>{
          this.state.entity.push(item);
      }
    )
    }
  //console.log(this.state.entity)
    if(this.state.entity.length>0)
      this.setState({isLoading:false});
      }
    )
    .catch(err => { console.log(err); })
  }
  
  loadApiContext(){
    fetch("https://apis.sentient.io/microservices/nlp/wordsensedisambiguation/v1/getpredictions",
      {
        "method":"POST",
        "headers":{
          "x-api-key":"785B43F931744A2FB4D8",
          "content-type": "application/json",
        } ,
        "body": JSON.stringify({
            text: "An estimated 180,000 people were under mandatory evacuation orders, including parts of Santa Rosa and a large swath of Sonoma County all the way to the Pacific Ocean.",
            target_word: "County",
            repeat:"True"
          }
        )
      }
    )
    .then(response => response.json())
    .then(json => { 
      console.log(json);
      this.setState({context:json});
      if(this.state.context.length>0)
        this.setState({isLoadingContext:false});
      }
    )
    .catch(err => { console.log(err); })
  }
  loadApiWiki(item){
    console.log("dsd");
    fetch("https://apis.sentient.io/microservices/utility/wikipedia/v0.1/getresults",
      {
        "method":"POST",
        "headers":{
          "x-api-key":"04A216B8B1194F4AA983",
          "content-type": "application/json",
        } ,
        "body": JSON.stringify({
            title: item,
            pageid:"0",
            filter_key:"all"
          }
        )
      }
    )
    .then(response => response.json())
    .then(json => {console.log(json);
        //console.log(json.results.images[0])
        this.setState({dummy:json.results.summary})
        this.setState({dummy1:json.results.images[0]})
        if(this.state.dummy!='')
        {
          this.setState({isLoadingWiki:false})
        }
        if(this.state.dummy1!='')
        {
          
          this.setState({isLoadingImage:false})
        }
    })
    .catch(err => { console.log(err); })
  }
  componentDidMount()
  {
  //  this.loadApiContext();
    this.loadApiEntitiy();
   // this.loadApiWiki();

  }
  message1()
  {
    if(this.state.entity.length>0)
    {
      return (<Text style={styles.paragraphT}>Suggested entity are given above </Text>);
    }
    else
    {
    return (<Text style={styles.paragraphT}>Sorry, No entity Found</Text>);
    }
  }
  message2()
  {
    if(this.state.entity.length>0)
    {
    return(<Text style={styles.paragraphT1}>Select  
              <TouchableHighlight
                style={{backgroundColor:'#800080',
                        borderRadius:10,
                        borderWidth: 1,
                        borderColor: 'white',
                        width:100,
                        height:30
                      }}
                underlayColor='white'>
                <Text style={{
                        color:'white',
                        textAlign:'center'}}>Tag
                </Text>
              </TouchableHighlight> 
              to get more information
            </Text>);
    }
    else{
      return (<Text style={styles.paragraphT}>Enter the correct paragraph</Text>);
    }
  }
  render(){
    const isLoading  = this.state.isLoading
    const isLoadingEntity=this.state.isLoadingEntity;
    const isLoadingContext=this.state.isLoadingContext;
    const isLoadingWiki=this.state.isLoadingWiki;
    return(
      <View >
        {isLoading?<ActivityIndicator/>:(
          <>
          <ScrollView style={{height:200,marginTop:10}}>
            <Text style={styles.paragraph}>{this.props.text}</Text>
          </ScrollView>
           <View style={{flexDirection:"row",flexWrap:"wrap"}}>
          {this.state.entity.map((item,i)=>{
            return(<TouchableHighlight
                        style={{backgroundColor:'#800080',
                                borderRadius:10,
                                borderWidth: 1,
                                borderColor: 'white',
                                width:100,
                                height:20
                              }}
                        onPress={()=>{this.loadApiWiki(item)}}
                        underlayColor='white'>
                        <Text style={{
                          color:'white',
                          textAlign:'center'}}>{item}
                        </Text>
                      </TouchableHighlight>)
          })}
          <View style={{ flexDirection:"row" }}>
            <Image  
              style={{width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    }}
              source={require('./buddyImage.JPG')}
            />
            <View style={{flexWrap:"wrap"}}>
              {this.message1()}
            </View>
          </View>
        </View>
        {isLoadingWiki?(this.message2()):(
          <>
        <Image 
            style={styles.tinyLogo}
            source={{uri:this.state.dummy1}}
        />
        <ScrollView style={{height:100}}>
          <Text style={styles.paragraphT}>{this.state.dummy}</Text>
          </ScrollView>
        </>)}
          </>
          
              
      )
    } 
    </View>
  );
}

}

const styles = StyleSheet.create({
  paragraph: {
    flexWrap:"wrap",
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  
  paragraphT: {
    flexWrap:"wrap",
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  paragraphT1: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderColor:"black",
    borderWidth:2,
    marginLeft: 100,
  },
  
});
