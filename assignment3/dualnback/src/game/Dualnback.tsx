import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import './Dualnback.css';
import Game from "./Game";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export interface IState {
  gameRunning: boolean;
  gridSize: number;
  score: number;
}
var connection = new WebSocket('ws://localhost:8080');
class Dualnback extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);


    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0,
    };

    this.sendScore = this.sendScore.bind(this)

    this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  public render() {
    return (
      <div className="Dualnback">
        

        <Container>
        <Button color="primary" className={this.state.gameRunning ? 'hidden' : ''} onClick={this.sendScore}>Send Score</Button>
          <Link to="/login">Login</Link>
          <div>
          <Link to="/highscores">Highscores</Link>
          </div>

          <Row>
            <Col xs="3">
              <input type="range" min="3" max="5" className="slider" value={this.state.gridSize} onInput={this.setGridSize} onChange={this.setGridSize} />
            </Col>
            <Col xs="6">
              <Game rows={this.state.gridSize} columns={this.state.gridSize} running={this.state.gameRunning} onScoreChange={this.onScoreChange} />
            </Col>
            <Col xs="3">
              <Row>
                <Col xs="12">
                  <Button color="primary" className={this.state.gameRunning ? 'hidden' : ''} onClick={this.onPlay}>Play</Button>
                  <Button color="primary" className={!this.state.gameRunning ? 'hidden' : ''} onClick={this.onPause}>Pause</Button>
                </Col>
              </Row>
              <Row>
                <p>{this.state.score}</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  private sendScore(e: any) {  
    var user = localStorage.getItem('currentUser');

    connection.send(JSON.stringify({score: this.state.score, token: user}))
  }

  private setGridSize(e: any) {
    this.setState({ gridSize: e.target.value });
  }

  private onPlay(e: any) {
    this.setState({ gameRunning: true });
  }

  private onPause(e: any) {
    this.setState({ gameRunning: false });
  }

  private onScoreChange(prevScore: number, nextScore: number) {
    this.setState({ score: nextScore });
  }
}

export default Dualnback;
