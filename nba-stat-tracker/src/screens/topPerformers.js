import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class TopPerformers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      assists: 0,
      rebounds: 0,
      pointsPlayer: '',
      assistsPlayer: '',
      reboundsPlayer: ''
    };
  }

  componentDidMount() {
    const { stats } = this.props.navigation.state.params;
    let points = 0;
    let assists = 0;
    let rebounds = 0;
    let pointsPlayer;
    let assistsPlayer;
    let reboundsPlayer;

    for (i=0; i < stats.length; i++) {
      if (stats[i].points > points) {
        let name = stats[i].name;
        name = name.split(' ').slice(-1).join(' ');
        points = stats[i].points;
        pointsPlayer = name;
      }

      if (stats[i].assists > assists) {
        this.setState({assists: stats[i].assists});
        let name = stats[i].name;
        name = name.split(' ').slice(-1).join(' ');
        assists = stats[i].assists;
        assistsPlayer = name;
      }

      if (stats[i].rebounds > rebounds) {
        let name = stats[i].name;
        name = name.split(' ').slice(-1).join(' ');
        rebounds = stats[i].rebounds,
        reboundsPlayer = name
      }
    }
    this.setState({
      points,
      assists,
      rebounds,
      pointsPlayer,
      assistsPlayer,
      reboundsPlayer
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const {points, pointsPlayer, assists, assistsPlayer, rebounds, reboundsPlayer} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Top Performers</Text>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: `https://nba-players.herokuapp.com/players/${pointsPlayer}`}}
          />
          <Text style={styles.text}>{points} points</Text>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: `https://nba-players.herokuapp.com/players/${assistsPlayer}`}}
          />
          <Text style={styles.text}>{assists} assists</Text>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: `https://nba-players.herokuapp.com/players/${reboundsPlayer}`}}
          />
          <Text style={styles.text}>{rebounds} rebounds</Text>
        </View>
        <View style={styles.footer}>
          <Button title="View Stats" onPress={() => navigate('StatsOutput', {stats: this.props.navigation.state.params.stats})}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
  row: {
    flex: 4,
    flexDirection: 'row',

  },
  image: {
    height: 127,
    width: 175,
    margin: 10
  },
  text: {
    fontSize: 25,
    bottom: -110,
  }
});