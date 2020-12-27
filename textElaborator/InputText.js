import React, { useState } from 'react';
import { Clipboard, TextInput, View, StyleSheet ,Image,Text, Card, Button ,TouchableHighlight} from 'react-native';
import TextElaborator from './textElabHome';
const styles = StyleSheet.create({
   input: {
     flexWrap:"wrap",
    backgroundColor: 'white',
    width: 300,
    height:300,
    padding: 10,
    borderRadius:10
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  }
});


const PizzaTranslator = () => {
  const [name,setName]=useState('John');
  const [text, setText] = useState('');
  const [display,setDisplay]=useState(false);
  const [analyse,setAnalyse]=useState(false);
  const onSubmit=()=>{
    console.log(text);
    setAnalyse(true);
  }
  return (
    <View style={{padding: 10}}>
    <>
      {analyse==false && text=='' && <View style={{ flexDirection:"row" }}>
            <Image  style={{width: 50,
              height: 50,
              borderRadius: 50 / 2,
              }}source={require('../buddyImage.JPG')}/>
              <View>
              <Text style={styles.paragraph}>Hello,<Text style={{fontSize:25, color:'blue'}}>{name}</Text></Text>
              <Text style={styles.paragraph}>Please Input Text to be analysed</Text>
              </View>
      </View>}
        
      {analyse==false &&<TextInput
        style={styles.input}
        placeholder="Type here to translate!"
        onChangeText={text => {setText(text)}}
        defaultValue={text}
      />}
      {analyse==false && text!='' && 
        <><View style={{ flexDirection:"row" }}>
            <Image  style={{width: 50,
              height: 50,
              borderRadius: 50 / 2,
              }}source={require('../buddyImage.JPG')}/>
            <View>
              <Text style={styles.paragraph}>Press Submit to Analyse </Text>
              <TouchableHighlight
                style={{backgroundColor:'#800080',
                        borderRadius:10,
                        borderWidth: 1,
                        borderColor: 'white',
                        width:100,
                        height:30
                      }}
                onPress={onSubmit}
                underlayColor='white'>
                  <Text style={{
                        color:'white',
                        textAlign:'center'}}>Submit
                  </Text>
              </TouchableHighlight>
            </View>
          </View> 
        </>
      }
      {analyse && <TextElaborator text={text}/>}
      </>
    </View>
  );
}

export default PizzaTranslator;
 
