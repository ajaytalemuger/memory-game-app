import { Header, Card } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './game-menu.css';

function GameMenu(props) {
    return (
        <div className='difficulty-selection'>
            <Header as='h2' icon textAlign='center' style={{ marginTop: "35px" }}>
                <Header.Content>Select difficulty</Header.Content>
            </Header>
            <Card.Group style={{ justifyContent: 'center', marginTop: "20px" }}>
                <Card onClick={() => props.updateSelectedDifficulty('easy')}>
                    <Card.Content>
                        <Card.Header>Easy</Card.Header>
                    </Card.Content>
                </Card>
                <Card onClick={() => props.updateSelectedDifficulty('medium')}>
                    <Card.Content>
                        <Card.Header>Medium</Card.Header>
                    </Card.Content>
                </Card>
                <Card onClick={() => props.updateSelectedDifficulty('hard')}>
                    <Card.Content>
                        <Card.Header>Hard</Card.Header>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
}

export default GameMenu;