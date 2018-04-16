import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            style={styles.logo}
            source={require('../../src/img/nba-logo.png')} 
          />
          <Text style={styles.title}>Stat Tracker</Text>
        </View>
        <View style={styles.footer}>
          <Button 
            title="Continue" 
            onPress={() => navigate('StatsInput')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    marginTop: -30,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  logo: {
    height: 255,
    width: 375,
  },
  title: {
    fontSize: 40,
    color: 'red',
    marginTop: -40,
  },
});