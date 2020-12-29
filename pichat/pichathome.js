import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,ScrollView,StyleSheet ,Text,TouchableHighlight} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';

import * as ImageManipulator from 'expo-image-manipulator';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [img,setImg] = useState([]);
  const [base64,setbase64]=useState('');
  const [objectName,setObjectName]=useState('');
  const [tex,setTex] = useState([]);
  const [merge,setMerge]=useState(false);
  const [result1,setResult]=useState("");
  const [clipboard,setClipboard]=useState(false);
   useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const buddy=()=>{
    return(
      <View style={{flexDirection:"row"}}>
      <Image  style={{width: 40,
              height: 40,
              marginTop:10,
              borderRadius: 40 / 2,
              }}source={require('./buddyImage.JPG')}/>
              <Text style={styles.paragraph}><Text style={{fontSize:15, color:'blue'}}>John </Text></Text>
              <Text style={styles.paragraph}>Click on <Image  style={{width: 10,
              height: 10,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./add.png')}/> to add Images</Text>
              </View>
            
    )
  }
   const buddy1=()=>{
    return(
      <View style={{flexDirection:"row"}}>
      <Image  style={{width: 40,
              height: 40,
              marginTop:10,
              borderRadius: 40 / 2,
              }}source={require('./buddyImage.JPG')}/>
              <Text style={styles.paragraph}><Text style={{fontSize:15, color:'blue'}}>John </Text></Text>
              <Text style={styles.paragraph}>Click on <Image  style={{width: 10,
              height: 10,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./continue.jpg')}/>&<Image  style={{width: 50,
              height: 20,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./continue1.jpg')}/>.Wait for text.</Text>
              </View>
            
    )
  }
 const buddy2=()=>{
    return(
      <View style={{flexDirection:"row"}}>
      <Image  style={{width: 60,
              height: 60,
              marginTop:10,
              borderRadius: 60 / 2,
              }}source={require('./buddyImage.JPG')}/>
              <Text style={styles.paragraph}><Text style={{fontSize:25, color:'blue'}}>John </Text></Text>
              <Text style={styles.paragraph}>PICHAT result : </Text>
              </View>
            
    )
  }
 
 const load=(data)=> {
    console.log("load star"+data);
   // data=data.split(',')[1];
   // console.log("ff"+data);
   // setbase64(data);
   console.log("gdfg"+data)
     fetch("https://apis.sentient.io/microservices/cv/objectdetection/v0.1/getpredictions",{
      "method":"POST",
      "headers":{
        "x-api-key":"04A216B8B1194F4AA983",
        "content-type": "application/json",
      } ,
      "body": JSON.stringify({
        image_base64:data
        
      })
    })
    .then(response => response.json())
    .then(responsejson => { 
      let s=responsejson["Object 1"][0].split(':')[0];
      console.log(s);
      setObjectName(s);
      setTex(tex=>{
          const list=tex.concat(s);
          return list;
        })
      console.log(responsejson["Object 1"][0].split(':')[0]);
    }) 
    
  }
  const message=async()=>{
    console.log("button");
    setClipboard(false);
    setImg(img=>{
      const list=img.concat(image);
      return list;
    })
   console.log("image"+image);
  }
  
  const pickImage = async () => {
    setClipboard(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result);
    if (!result.cancelled) {
       setImage(result.uri,
       ()=>{console.log("jk")
         setImg(img=>{
          const list=img.concat(image);
          return list;
        })
       });
    }
  };
  const _rotate90andFlip = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      image ,
      [{ rotate: 0 }],
   {base64:true }
    );
     ////setImage(manipResult);
    //  setbase64(manipResult.base64);
    console.log("base64"+manipResult.base64);
    return manipResult.base64;
  };
  const flip1=()=>{
    console.log("started button");
    _rotate90andFlip().then(
      data=>{
      //  setbase64(data);
        console.log("json gone"+data);
        load(data);
      }
    );
  }
  const mergeText=()=>{
    setMerge(true);
  }
  const mergeSentence=()=>{
    let result="";
    tex.map((item,i)=>{
      console.log(item);
      if(item=="person ")
        {
          console.log(item);
          if(result=="")
          {
            result=result+"There is "+item;
            console.log(result);
          }
          else
          {
            result=result+" .There is "+item;
          }
        }
      else if(item=="car " || item=="aeroplane " || item=="train " || item=="bus ")
      {
        result=result+" in "+item
      }
      else if(item=="apple " || item =="banana " || item=="orange " || item=="brocolli ")
      {
        result=result+" Eating "+item
      }
    })
    return result
  }
  const mergeRender=()=>{
    const result =mergeSentence();
    if(result==""){
    return(
      <View>
      <Text style={styles.paragraph}>Sentence can't be formed because object can not be detected</Text>
      </View>
      );
    }
    else
    {
      return(
      <View style={styles.container}>
      <View style={{flexWrap:"wrap",flexDirection:"row"}}>
        {
          img.map((item,i)=>{
            const im=Asset.fromModule(item);
            return(
              <Image
                source={{ uri: im.localUri || im.uri }}
                style={{ width: 100, height: 100, resizeMode: 'contain',marginLeft:10,borderRadius:20 }}
              />
            );
          })
        }
      </View>
      {buddy2()}
      <Text style={styles.paragraph}>{result}</Text>
      </View>
      );
    }
  }
  const sentence=()=>
  {
    console.log("sentence")
    console.log(tex);
  }
  return (
    merge?mergeRender():(
    <View style={styles.container}>
      {tex.map((item,i)=>{
        return(<Text>{item}</Text>);
      })}
      <ScrollView style={{height:300}}>
        {
          img.map((item,i)=>{
            const im=Asset.fromModule(item);
            return(
              <Image
                source={{ uri: im.localUri || im.uri }}
                style={{ width: 300, height: 300, resizeMode: 'contain',marginLeft:10,borderRadius:20 }}
              />
            );
          })
        }
      </ScrollView>
      {clipboard?(<>
        {buddy1()}
      <View style={{flexDirection:"row",backgroundColor:'#BCC6CC',borderRadius:3,width:344,height:150,justifyContent: 'center',}}>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 ,marginTop:40,borderRadius:10}} />}
    </View></>):buddy()}
      <View style={{flexDirection:"row",backgroundColor:'#98AFC7',borderRadius:10,width:344,height:50}}>
      <TouchableHighlight 
        onPress={pickImage}>
            <Image  style={{width: 40,
              height: 40,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./add.png')}/>
            </TouchableHighlight>
      <TouchableHighlight 
        onPress={flip1}>
            <Image  style={{width: 120,
              height: 40,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./continue1.jpg')}/>
            </TouchableHighlight>
      
      <TouchableHighlight 
        onPress={message}>
            <Image  style={{width: 60,
              height: 40,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./continue.jpg')}/>
            </TouchableHighlight>
      <TouchableHighlight 
        onPress={mergeText}>
            <Image  style={{width: 100,
              height: 40,
              borderRadius:50/2,
              padding:0,marginLeft:5,marginTop:5
              }}source={require('./enter.jpg')}/>
            </TouchableHighlight>
           
      </View>
    </View>)
    
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    flexWrap:"wrap",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop:20
  },
  
});
