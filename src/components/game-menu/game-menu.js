import { Card } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './game-menu.css';

function GameMenu(props) {
    return (
        <div className='difficulty-selection'>
            <Card.Group>
                <Card onClick={() => props.updateSelectedDifficulty('easy')}>
                    <Card.Content>
                        <Card.Header>Easy</Card.Header>
                    </Card.Content>
                </Card>
                <Card onClick={() => props.updateSelectedDifficulty('Medium')}>
                    <Card.Content>
                        <Card.Header>Medium</Card.Header>
                    </Card.Content>
                </Card>
                <Card onClick={() => props.updateSelectedDifficulty('Hard')}>
                    <Card.Content>
                        <Card.Header>Hard</Card.Header>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
}

export default GameMenu;