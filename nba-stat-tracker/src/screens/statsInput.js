import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class StatsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: []
    };
  }

  componentDidMount() {
    axios.get('https://nba-players.herokuapp.com/players-stats-teams/' + this.props.navigation.state.params.team)
    .then(res => {
      const players = res.data.map(player => player.name);
      var stats = [];
      for (i=0; i<players.length; i++) {
        let player = new playerStats(players[i], 0, 0, 0, 0, 0, 0, 0, 0);
        stats.push(player);
      }
      this.setState({ stats });
    });
  }

  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button title="View Stats" onPress={() => navigate('StatsOutput')}/>
          <Button title="End Game" onPress={() => navigate('TopPerformers')}/>
        </View>
        <View style={styles.output}>
          <Text style={{fontSize: 25, color: 'red'}}>Demar Derozan Scored 2 points</Text>
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

function playerStats(name, points, assists, rebounds, steals, blocks, turnovers, ftMade, ftMissed) {
  this.name = name;
  this.points = points;
  this.assists = assists;
  this.rebounds = rebounds;
  this.steals = steals;
  this.blocks = blocks;
  this.turnovers = turnovers;
  this.ftMade = ftMade;
  this.ftMissed = ftMissed;
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