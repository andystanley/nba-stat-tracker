import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class StatsInput extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button title="View Stats" onPress={() => navigate('StatsOutput')}/>
          <Button title="End Game" onPress={() => navigate('TopPerformers')}/>
        </View>
        <View style={styles.output}>
          <Text style={{fontSize: 25, color: 'red'}}>Demar Derozan Scored 2 Points</Text>
          <Text style={{fontSize: 15, color: 'red'}}>Kyle Lowry Committed a Personal Foul</Text>
          <Text style={{fontSize: 10, color: 'red'}}>Serge Ibaka Missed a Free Throw</Text>
        </View>
        <View style={styles.input}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>2pt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>3pt</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>FT Made</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>FT Miss</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>Steal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>Turnover</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>Rebound</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonContent}>Foul</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  output: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  input: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
  row: {
    flex: 2,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: '100%',
    backgroundColor: '#696969',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonContent: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  }
});