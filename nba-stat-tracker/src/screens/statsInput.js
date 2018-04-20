import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button, TouchableOpacity, Modal, ScrollView } from 'react-native';
import axios from 'axios';

export default class StatsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      selectedBtn: null,
      modalVisible: false,
      question: null,
      msg1: null,
      msg2: null,
      msg3: null
    };
  }

  componentDidMount() {
    axios.get('https://nba-players.herokuapp.com/players-stats-teams/' + this.props.navigation.state.params.team)
    .then(res => {
      const players = res.data.map(player => player.name);
      var stats = [];
      for (i=0; i<players.length; i++) {
        let p = new player(players[i]);
        stats.push(p);
      }
      this.setState({ stats });
    });
  }

  modalClosedHandler = () => {
    this.setState({
      modalVisible: false
    });
  }

  btnSelectedHandler = button => {
    let question;
    
    switch (button) {
      case "2pt":
        question = "Who scored 2 points?";
        break;
      case "3pt":
        question = "Who scored 3 points?";
        break;
      case "assist":
        question = "Who assisted?";
        break;
      case "ftMade":
        question = "Who scored the free throw";
        break;
      case "ftMissed":
        question = "Who missed the free throw?";
        break;
      case "block":
        question = "Who blocked the shot?";
        break;
      case "steal":
        question = "Who stole the ball?";
        break;
      case "turnover":
        question = "Who lost the ball?";
        break;
      case "rebound":
        question = "Who got the rebound?";
        break;
      case "foul":
        question = "Who committed the foul?";
        break;
      default:
        break;
    }

    this.setState({
      selectedBtn: button,
      question,
      modalVisible: true
    });
  }

  playerSelectedHandler = player => {
    let msg;
    let question = null;
    let stats = this.state.stats.map((p) => {
      // Find the correct player
      if (p.name === player) {
        switch (this.state.selectedBtn) {
          case "2pt":
            p.points += 2;
            msg = p.name + " scored 2 points";
            this.btnSelectedHandler("assist");
            break;
          case "3pt":
            p.points += 3;
            msg = p.name + " scored 3 points";
            this.btnSelectedHandler("assist");
            break;
          case "assist":
            p.assists += 1;
            msg = p.name + " got the assist";
            break;
          case "ftMade":
            p.ftMade += 1;
            p.points += 1;
            msg = p.name + " made a free throw";
            this.btnSelectedHandler("assist");
            break;
          case "ftMissed":
            p.ftMissed += 1;
            msg = p.name + " missed a free throw";
            break;
          case "block":
            p.blocks += 1;
            msg = p.name + " blocked a shot";
            break;
          case "steal":
            p.steals += 1;
            msg = p.name + " stole the ball";
            break;
          case "turnover":
            p.turnovers += 1;
            msg = p.name + " lost the ball";
            break;
          case "rebound":
            p.rebounds += 1;
            msg = p.name + " grabbed a rebound";
            break;
          case "foul":
            p.fouls += 1;
            msg = p.name + " committed a foul";
            break;
          default:
            break;
        }
      }
      return p;
    }); 

    let modalVisible = this.state.selectedBtn === '2pt' || this.state.selectedBtn === '3pt' || this.state.selectedBtn === 'ftMade' ? true : false;
    let selectedBtn = this.state.selectedBtn === '2pt' || this.state.selectedBtn === '3pt' || this.state.selectedBtn === 'ftMade' ? 'assist' : this.state.selectedBtn;
    
    this.setState({ 
      stats, 
      msg1: msg,
      msg2: this.state.msg1,
      msg3: this.state.msg2,
      modalVisible,
      selectedBtn 
    });
  }
  
  renderPlayers() {
    const players = this.state.stats.map(player =>  player.name);
    return players.map(player => {
      return (
        <Button key={player} title={player} onPress={() => this.playerSelectedHandler(player)}/>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Modal
        visible={this.state.modalVisible}
        onRequestClose={() => this.setState({modalVisible: false})} animationType={"slide"}
        transparent={false}>
          <View style={styles.modal}>
            <Text style={{fontSize: 25}}>{this.state.question}</Text>
            <ScrollView style={styles.players}>
              {this.renderPlayers()}
            </ScrollView>
            <View style={styles.cancel}>
              <Button title="Cancel" onPress={this.modalClosedHandler} color="red"/>
            </View>
          </View>
        </Modal>
        <View style={styles.buttons}>
          <Button title="View Stats" onPress={() => navigate('StatsOutput', { stats: this.state.stats })}/>
          <Button title="End Game" onPress={() => navigate('TopPerformers', { stats: this.state.stats })}/>
        </View>
        <View style={styles.output}>
          <Text style={{fontSize: 20, color: 'red', textAlign: 'center'}}>{this.state.msg1}</Text>
          <Text style={{fontSize: 15, color: 'red', textAlign: 'center'}}>{this.state.msg2}</Text>
          <Text style={{fontSize: 10, color: 'red', textAlign: 'center'}}>{this.state.msg3}</Text>
        </View>
        <View style={styles.input}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("2pt")}>
              <Text style={styles.buttonContent}>2pt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("3pt")}>
              <Text style={styles.buttonContent}>3pt</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("ftMade")}>
              <Text style={styles.buttonContent}>FT Made</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("ftMissed")}>
              <Text style={styles.buttonContent}>FT Miss</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("block")}>
              <Text style={styles.buttonContent}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("steal")}>
              <Text style={styles.buttonContent}>Steal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("turnover")}>
              <Text style={styles.buttonContent}>Turnover</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("rebound")}>
              <Text style={styles.buttonContent}>Rebound</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => this.btnSelectedHandler("foul")}>
              <Text style={styles.buttonContent}>Foul</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function player(name, points=0, assists=0, rebounds=0, steals=0, blocks=0, turnovers=0, ftMade=0, ftMissed=0, fouls=0) {
  this.name = name;
  this.points = points;
  this.assists = assists;
  this.rebounds = rebounds;
  this.steals = steals;
  this.blocks = blocks;
  this.turnovers = turnovers;
  this.ftMade = ftMade;
  this.ftMissed = ftMissed;
  this.fouls = fouls;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center'
  },
  players: {
    maxHeight: '85%',
  },
  cancel: {
    position: 'absolute',
    bottom: 20
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