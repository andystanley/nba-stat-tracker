import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class StatsOutput extends Component {

  renderPlayers() {
    const {stats } = this.props.navigation.state.params;
    let ftPercentage;

    return stats.map(player => {
      ftPercentage = (player.ftMade / (player.ftMade + player.ftMissed))*100;
      isNaN(ftPercentage) ? ftPercentage = 0 : ftPercentage;

      return (
        <View key={player.name} style={styles.row}>
          <Text style={{width: 150}}>{player.name}</Text>
          <Text>{player.points}</Text>
          <Text>{player.assists}</Text>
          <Text>{ftPercentage}</Text>
          <Text>{player.blocks}</Text>
          <Text>{player.steals}</Text>
          <Text>{player.turnovers}</Text>
          <Text>{player.rebounds}</Text>
          <Text>{player.fouls}</Text>
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Statistics</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={{width: 150, fontWeight: 'bold'}}>Player</Text>
            <Text style={{fontWeight: 'bold'}}>P</Text>
            <Text style={{fontWeight: 'bold'}}>A</Text>
            <Text style={{fontWeight: 'bold'}}>%</Text>
            <Text style={{fontWeight: 'bold'}}>B</Text>
            <Text style={{fontWeight: 'bold'}}>S</Text>
            <Text style={{fontWeight: 'bold'}}>T</Text>
            <Text style={{fontWeight: 'bold'}}>R</Text>
            <Text style={{fontWeight: 'bold'}}>F</Text>
          </View>
          {this.renderPlayers()}
        </View>
        <View style={styles.header}>
        <Button 
            title="New Game" 
            onPress={() => navigate('Home')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
  footer: {
    flex: 1
  },
  table: {
    flex: 10,
    flexDirection: 'column',
    marginLeft: 2,
    marginRight: 4
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});