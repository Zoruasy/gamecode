import { Engine, DisplayMode, Color } from "excalibur";
import { StartGame } from './scenes/startgame.js';
import { MainGame } from './scenes/maingame.js';
import { GameOver } from './scenes//gameover.js';
import { Resources, ResourceLoader } from './resources.js';

const options = { 
    width: 1200,
    height: 600,
    displayMode: DisplayMode.FullScreen, 
    backgroundColor: Color.White 
};

export class Game extends Engine {
    constructor() {
        super(options);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.add('startgame', new StartGame());
        this.add('maingame', new MainGame());
      this.add('gameover', new GameOver());
        this.goToScene('startgame');
    }
}

new Game();
