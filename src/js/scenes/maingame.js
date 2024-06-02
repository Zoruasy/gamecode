import { Scene, Label, Color, Vector, Timer, Actor } from "excalibur";
import { Dragon } from '../dragon.js';
import { Spaceship } from '../spaceship.js';
import { Resources } from '../resources.js';
import { Animated } from '../animated.js';


export class MainGame extends Scene {
    onInitialize(engine) {
        this.score = 0;
        this.dragonBulletCount = 1; // Initial bullet count for the dragon
        this.timeLimit = 120; // 2 minuten in seconden
        this.currentTime = this.timeLimit; // Huidige tijd begint bij de tijdslimiet
        this.dragonUntargetable = false; // Draak is in het begin targetable
        engine.physics.gravity = new Vector(0, 0);

        // Score label aanmaken
        this.scoreLabel = new Label({
            pos: new Vector(100, 100),
            text: 'Score: 0',
            fontSize: 24,
            fontFamily: 'Arial',
            color: Color.White
        });

        // Tijdslimiet label aanmaken
        this.timeLabel = new Label({
            pos: new Vector(100, 130),
            fontSize: 18,
            fontFamily: 'Arial',
            color: Color.White
        });

        // Create and add the background actor first
        const background = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight
        });

        const backgroundSprite = Resources.Background.toSprite();
        backgroundSprite.width = engine.drawWidth;
        backgroundSprite.height = engine.drawHeight;

        background.graphics.use(backgroundSprite);
        this.add(background);

        // Create the dragon actor
        const dragon = new Dragon(engine.halfDrawWidth, engine.drawHeight - 100);
        this.add(dragon);

        const spawnTimer = new Timer({
            fcn: () => this.spawnAnimatedObject(),
            interval: 8000, // Spawn after 8 seconds
            repeats: true 
        });
        this.add(spawnTimer);
        spawnTimer.start();

        // Add collision detection between dragon and animated objects
        this.on('collisionstart', (evt) => {
            if ((evt.actor1 instanceof Dragon && evt.actor2 instanceof Animated) ||
                (evt.actor1 instanceof Animated && evt.actor2 instanceof Dragon)) {
                evt.actor2.kill(); // Remove the animated object
            }
        });

        // Add a timer to spawn new enemy spaceships regularly
        const spaceshipSpawnTimer = new Timer({
            fcn: () => this.spawnSpaceship(),
            interval: 5000, // every 5 seconds (increase this to spawn less frequently)
            repeats: true
        });
        this.add(spaceshipSpawnTimer);
        spaceshipSpawnTimer.start();

        this.add(this.scoreLabel);
        this.add(this.timeLabel);

        // Update the score label to ensure it starts at 0
        this.updateScoreLabel();
        this.updateTimeLabel();

        // Voorkom dat de initialize-methode opnieuw wordt aangeroepen
        this.initialized = true;

        // Start de timer voor de tijdslimiet
        this.timeLimitTimer = new Timer({
            fcn: () => {
                this.currentTime--; // Verminder de huidige tijd elke seconde
                this.updateTimeLabel(); // Update het tijdslimiet label
                if (this.currentTime <= 0) {
                    this.endGame(); // Einde van de game wanneer de tijd om is
                }
            },
            interval: 1000, // Elke seconde
            repeats: true
        });
        this.add(this.timeLimitTimer);
        this.timeLimitTimer.start();
    }

    updateScoreLabel() {
        this.scoreLabel.text = 'Score: ' + this.score;
    }

    updateTimeLabel() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timeLabel.text = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    spawnSpaceship() {
        const x = Math.random() * this.engine.drawWidth;
        const y = Math.random() * this.engine.drawHeight / 2;
        const spaceship = new Spaceship(x, y);
        this.add(spaceship);
    }

    spawnAnimatedObject() {
        const x = Math.random() * this.engine.drawWidth;
        const y = Math.random() * this.engine.drawHeight / 2;
        const animatedObject = new Animated(x, y);
        this.add(animatedObject);
    }

    increaseScore() {
        this.score += 1;
        this.updateScoreLabel();
    }

    makeDragonUntargetable() {
        this.dragonUntargetable = true; // Draak wordt untargetable
        setTimeout(() => {
            this.dragonUntargetable = false; // Draak wordt na 8 seconden weer targetable
        }, 8000);
    }

    endGame() {

        const youWonScene = new youwon();

        this.engine.goToScene(youwon);
    }

    onPostUpdate(engine, delta) {
        
        this.initialized = false;
    }
}
