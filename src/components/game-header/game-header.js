import { Header } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './game-header.css';

function GameHeader(props) {
    return (
        <div className="game-header">
            <Header as='h1' icon textAlign='center'>
                <Header.Content>Memory Game</Header.Content>
            </Header>
        </div>
    );
}

export default GameHeader;