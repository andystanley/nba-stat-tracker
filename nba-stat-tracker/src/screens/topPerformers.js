import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios';

export default class TopPerformers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 0,
      assists: 0,
      rebounds: 0,
      img1: null,
      img2: null,
      img3: null
    };
  }

  componentDidMount() {
    const { stats } = this.props.navigation.state.params;

    let pointsPlayer = '';
    let assistsPlayer = '';
    let reboundsPlayer = '';

    for (i=0; i < stats.length; i++) {
      if (stats[i].points > this.state.points) {
        this.setState({points: stats[i].points});
        let name = stats[i].name;
        name = name.split(' ').slice(-1).join(' ');
        pointsPlayer = name;
      }

      if (stats[i].assists > this.state.assists) {
        this.setState({assists: stats[i].assists});
        let name = stats[i].name;
        name = name.split(' ').slice(-1).join(' ');
        assistsPlayer = name;
      }

      if (stats[i].rebounds > this.state.rebounds) {
        this.setState({rebounds: stats[i].rebounds});
        let name = stats[i].name;
        name = name.split(' ').slice(-1).join(' ');
        reboundsPlayer = name;
      }
    }

    // Not currently functional
    axios.get('https://nba-players.herokuapp.com/players/' + pointsPlayer)
    .then(res => {
      const img1 = res.data;
      this.setState({ img1 });
    });

    axios.get('https://nba-players.herokuapp.com/players/' + assistsPlayer)
    .then(res => {
      const img2 = res.data;
      this.setState({ img2 });
    });

    axios.get('https://nba-players.herokuapp.com/players/' + reboundsPlayer)
    .then(res => {
      const img3 = res.data;
      this.setState({ img3 });
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.points}</Text>
        <Text>{this.state.assists}</Text>
        <Text>{this.state.rebounds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});