import { Component } from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import axios from 'axios';

import 'semantic-ui-css/semantic.min.css';
import './game-board.css';

class GameBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            difficulty: props.difficulty,
            errorScore: 0,
            numberOfCards: 0,
            resolvedCards: [],
            selectedCards: [],
            maxSelectableCards: 0,
            selectedCardValues: {},
            fileId: '',
            watcherFlag: true,
            timerFlag: false,
            timer: 0
        };
    }

    componentDidMount() {
        this.createGameboard();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedCards.length === this.state.maxSelectableCards) {
            let set = new Set();
            for (const cardId of Object.keys(this.state.selectedCardValues)) {
                set.add(this.state.selectedCardValues[cardId]);
            }
            if (set.size > 1) {
                if (this.state.watcherFlag) {
                    this.incrementErrorScore();
                    this.timeoutId = setTimeout(this.clearSelectedCards.bind(this), 2000);
                }
            } else {
                this.addToResolvedCards();
            }
        }
        if (this.state.resolvedCards.length === this.state.numberOfCards && this.state.watcherFlag) {
            clearInterval(this.intervalId);
            this.setState({
                watcherFlag: false
            })
        }
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    createGameboard() {
        axios.put('http://localhost:8000/createGameBoard?difficulty=' + this.state.difficulty)
            .then((response) => {
                const responseData = response.data;
                this.setState({
                    numberOfCards: responseData.numberOfCards,
                    fileId: responseData.fileId,
                    maxSelectableCards: responseData.maxSelectableCards

                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addToResolvedCards() {
        let newResolvedCards = [];
        for (const cardId of Object.keys(this.state.selectedCardValues)) {
            newResolvedCards.push(+(cardId));
        }
        this.setState((state) => {
            const combinedResolvedCards = [...newResolvedCards, ...state.resolvedCards];
            return {
                resolvedCards: combinedResolvedCards,
                selectedCards: [],
                selectedCardValues: {}
            }
        });
    }

    clearSelectedCards() {
        this.setState({
            selectedCards: [],
            selectedCardValues: {},
            watcherFlag: true
        })
    }

    incrementErrorScore() {
        this.setState((state) => {
            return {
                errorScore: state.errorScore + 1,
                watcherFlag: false
            }
        });
    }

    onCardClick(cardId) {
        if (this.state.selectedCards.length < this.state.maxSelectableCards) {
            this.updateCardValue(cardId);
        } else {
            clearTimeout(this.timeoutId);
            this.clearSelectedCards();
            this.updateCardValue(cardId);
        }
    }

    timerIncrement() {
        this.setState((state) => {
            return {
                timer: state.timer + 1
            }
        });
    }

    updateCardValue(cardId) {
        axios.get('http://localhost:8000/getGameCardValue?fileId=' + this.state.fileId + '&cardId=' + cardId)
            .then((response) => {
                let timerFlag = true;
                if (!this.state.timerFlag) {
                    this.intervalId = setInterval(this.timerIncrement.bind(this), 1000);
                    timerFlag = true;
                }
                this.setState((state) => {
                    let selectedCards = [...state.selectedCards];
                    let selectedCardValues = { ...state.selectedCardValues };
                    selectedCards.push(cardId);
                    selectedCardValues[cardId] = response.data.cardValue;
                    return {
                        selectedCards,
                        selectedCardValues,
                        timerFlag
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        let displayBoardElement = (
            <Card.Group>
                {[...Array(this.state.numberOfCards)].map((_, i) => {
                    let cardContent;
                    let style;
                    let clickFunc = () => this.onCardClick(i);
                    if (this.state.selectedCards.includes(i)) {
                        cardContent = <Card.Header content={this.state.selectedCardValues[i]} />
                    } else if (this.state.resolvedCards.includes(i)) {
                        style = { boxShadow: '0px 0px' }
                        clickFunc = () => { }
                    }
                    return (
                        <Card key={i}
                            onClick={clickFunc}
                            style={{ height: "40px", ...style }}>
                            <Card.Content>
                                {cardContent}
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        );

        return (
            <div>
                <div className="score-board">
                    <Grid columns={3} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Button primary style={{ width: "50%" }} onClick={this.props.onNewGameClick}>New Game</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <h1>Timer: {this.state.timer}</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <h1>Error Score: {this.state.errorScore}</h1>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <div className="cards-display-board">
                    {displayBoardElement}
                </div>
            </div>
        );
    }
}

export default GameBoard;