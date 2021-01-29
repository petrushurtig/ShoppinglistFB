import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as firebase from 'firebase';



export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);


  const firebaseConfig= {
    apiKey: "AIzaSyA17Xv87v9MMc5O4J1sOvSMvjrxcDldjyA",
    authDomain: "shoppinglistfb.firebaseapp.com",
    databaseURL: "https://shoppinglistfb-b53bf-default-rtdb.firebaseio.com",
    projectId: "shoppinglistfb-b53bf",
    storageBucket: "shoppinglistfb-b53bf.appspot.com",
    messagingSenderId: "580948767420"};
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }else {
      firebase.app();
    }
    

    

  firebase.database().ref('items/')

  const saveItem = () => {
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
    );
  }

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setItems(prods);
    });
  }, []);
  
  const listSeparator = () => {
    return (
      <View
      style={{
        height: 5,
        width: '80%',
        backgroundColor: '#fff',
        marginLeft: '10%'
      }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
      placeholder='Product'
      onChangeText={(product) => setProduct(product)}
      value={product}
      style={{
       marginTop:30,
       fontSize: 18,
       width: 200,
       borderColor:'gray',
       borderWidth: 1}} />
       <TextInput
       placeholder='Amount'
       style={{
        marginTop: 5,
        marginBottom: 5, fontSize:18,
        width: 200,
        borderColor:'gray',
        borderWidth:1}}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
       />
      <View style={{flexDirection:'row'}}>
      <Button title="Add" onPress={saveItem}></Button>
      </View>
      <Text style={{marginTop: 30, fontSize:20, fontWeight: 'bold', color: 'blue'}}>Items to buy</Text>
      <FlatList 
      style={{marginLeft: '5%'}}
      keyExtractor={item => item.id.toString()}
      data={items}
      ItemSeparatorComponent={listSeparator}
      renderItem={({item}) => <View><Text style={{fontSize: 20}}>{item.product}, {item.amount}</Text>
      <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Bought</Text></View>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
