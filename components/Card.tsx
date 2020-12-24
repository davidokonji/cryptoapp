import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Currency} from '../types';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';

const Card: React.FC<Currency> = ({ name, symbol, price_usd, percent_change_1h, rank}) => (
  <TouchableOpacity style={style.container}>
    <View style={style.subContainer}>
      <Text style={[style.textItem, {fontWeight: '600'}]}>{name}({symbol})</Text>
      <Text style={[style.textItem, {fontWeight: '600', fontSize: 18}]}>#{rank}</Text>
    </View>
    <View style={style.subContainer}>
      <View>
      <Text style={[style.textItem, {fontWeight: '600', fontSize: 14, textAlign: 'left'}]}>
        {percent_change_1h}%
        {
          percent_change_1h && percent_change_1h[0] == '-' ? (
            <Ionicons name={'arrow-down'} size={20} color='red' />
          ) : (
            <Ionicons name={'arrow-up'} size={20} color='green' />
          )
        }
      </Text>
      <Text style={{fontSize: 12, fontStyle: 'italic'}}>(percentage change in last 7 days)</Text>
      </View>
      <Text style={[style.textItem, {fontWeight: '600'}]} >$ {price_usd}</Text>
    </View>
    
  </TouchableOpacity>
);

const style = StyleSheet.create({
  container: {
    borderWidth: .2,
    borderColor: '#999999',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'column',
    marginVertical: 5,
    alignSelf: 'center',
    borderRadius: 5,
    maxHeight: 150,
    height: 150,
    justifyContent: 'space-between'
  },
  textItem: {
    paddingVertical: 10,
    textAlign: 'center'
  },
  subContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 50,
    justifyContent: 'space-between',
    paddingHorizontal: 5
  }
});


export default Card;
