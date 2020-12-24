import * as React from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getAllCurrency } from '../api';
import Card from '../components/Card';
import {Currency} from '../types';

import { Text, View } from '../components/Themed';

type Currencies = Array<Currency>

export default function Main() {
  const [currencies, setCurrencies] = React.useState<Currencies>([]);
  const [referesh, setRefresh] = React.useState<boolean>(false);
  const [limit, setLimit] = React.useState<number>(20);

  React.useEffect(() => {
    getCurrencies(limit);
  }, []);

  const getCurrencies = async (count = 100) => {
    const [data, error] = await getAllCurrency(0, count);

    if (!error) {
      setCurrencies(data.data);
      if (referesh) {
        setRefresh(false);
      }
    }
  }

  if (currencies.length == 0) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={'large'} color='#333' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer} >
        <FlatList
          data={currencies}
          keyExtractor={item => item.id}
          renderItem={({ item, index}) => <Card key={index} {...item} /> }
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 20
          }}
          ListFooterComponent={() => (
            <View style={styles.footerIndicator}>
              <ActivityIndicator size='small' />
            </View>
          )}
          onEndReached={() => {
            getCurrencies(limit + 20);
            setLimit(limit + 20)
          }}
          refreshing={referesh}
          onRefresh={() => {
            setRefresh(true);
            getCurrencies(20);
            setLimit(20);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    width: '100%'
  },
  header: {
   width: '95%',
   flexDirection: 'row',
  },
  headerItem: {
    width: '33.3%',
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerIndicator: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
