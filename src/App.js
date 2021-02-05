import './App.css';

import { Component } from 'react';

import GameMenu from './components/game-menu/game-menu';
import GameHeader from './components/game-header/game-header';
import GameBoard from './components/game-board/game-board';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDifficult: '',
      displayGameBoard: false
    };
  }

  updateSelectedDifficulty(difficulty) {
    this.setState({
      selectedDifficult: difficulty,
      displayGameBoard: true
    });
  }

  resetGameboard() {
    this.setState({
      selectedDifficult: '',
      displayGameBoard: false
    });
  }

  render() {

    let element;
    if (this.state.displayGameBoard) {
      element = <GameBoard difficulty={this.state.selectedDifficult} onNewGameClick={this.resetGameboard.bind(this)} />;
    } else {
      element = <GameMenu updateSelectedDifficulty={this.updateSelectedDifficulty.bind(this)} />;
    }

    return (
      <div className="App" >
        <GameHeader />
        {element}
      </div>
    );
  }
}

export default App;
