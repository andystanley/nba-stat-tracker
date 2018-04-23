import React, { Component } from 'react';
import { ScrollView, Alert, StyleSheet, Text, View, Image, Button,TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      team: ''
    };
  }

  componentDidMount() {
    axios.get('https://nba-players.herokuapp.com/teams')
    .then(res => {
      const teams = res.data;
      this.setState({ teams });
    });
  }

  static navigationOptions = {
    title: 'Home'
  };

  formatTeam(team) {
    switch (team) {
      case "tor":
        return "Toronto Raptors"
        break;
      case "gsw":
        return "Golden State Warriors"
        break;
      case "lac":
        return "Los Angeles Clippers"
        break;
      case "lal":
        return "Los Angeles Lakers"
        break;
      case "pho":
        return "Phoenix Suns"
        break;
      case "sac":
        return "Sacramento Kings"
        break;
      case "dal":
        return "Dallas Mavericks"
        break;
        case "hou":
        return "Houston Rockets"
        break;
      case "mem":
        return "Memphis Grizzlies"
        break;
      case "nor":
        return "New Orleans Pelicans"
        break;
      case "sas":
        return "San Antonio Spurs"
        break;
        case "den":
        return "Denver Nuggets"
        break;
      case "min":
        return "Minnesota Timberwolves"
        break;
      case "okc":
        return "Oklahoma City Thunder"
        break;
      case "por":
        return "Portland Trailblazers"
        break;
      case "uth":
        return "Utah Jazz"
        break;
      case "bos":
        return "Boston Celtics"
        break;
      case "bro":
        return "Brooklyn Nets"
        break;
      case "nyk":
        return "New York Knicks"
        break;
      case "phi":
        return "Philadelphia 76ers"
        break;
      case "chi":
        return "Chicago Bulls"
        break;
        case "cle":
        return "Cleveland Cavaliers"
        break;
      case "det":
        return "Detroit Pistons"
        break;
      case "ind":
        return "Indiana Pacers"
        break;
        case "mil":
        return "Milwaukee Bucks"
        break;
      case "atl":
        return "Atlanta Hawks"
        break;
        case "cha":
        return "Charlotte Hornets"
        break;
      case "mia":
        return "Miami Heat"
        break;
      case "orl":
        return "Orlando Magic"
        break;
        case "was":
        return "Washington Wizards"
        break;
      default:
        break;
    }
  }
  renderTeams() {
    return this.state.teams.map((team) => {
      return (
        <TouchableOpacity key={team} onPress={() => this.setState({ team })}>
          <Text style={styles.team}>{this.formatTeam(team)}</Text>
        </TouchableOpacity>
      );
    });
  }

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
        <ScrollView style={styles.teams}>{this.renderTeams()}</ScrollView>
        <View style={styles.footer}>
          <Button 
            title="Continue" 
            onPress={() => navigate('StatsInput', { team: this.state.team })}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 10
  },
  teams: {
    width: '100%',
    marginBottom: 20
  },
  footer: {
    bottom: 20,
  },
  logo: {
    maxHeight: 255,
    maxWidth: 375,
  },
  title: {
    fontSize: 40,
    color: 'red',
    marginTop: -40,
  },
  team: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 5
  }
});