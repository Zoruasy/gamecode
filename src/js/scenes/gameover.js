import { Scene, Color, Actor, vec } from "excalibur";
import { Resources } from '../resources.js';

export class GameOver extends Scene {
    onInitialize(engine) {
        // Background
        const background = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight
        });
        background.graphics.use(Resources.YouLost.toSprite());
        this.add(background);

        // Game Over Logo
        const gameOverLogo = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 250),
            width: 200,
            height: 100
        });
        gameOverLogo.graphics.use(Resources.GameOver.toSprite());
        gameOverLogo.anchor.setTo(0.5, 0.5);
        this.add(gameOverLogo);

        // Restart Image
        const restartImage = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 + 50),
            width: 200,
            height: 50
        });
        restartImage.graphics.use(Resources.Restart.toSprite());
        restartImage.anchor.setTo(0.5, 0.5);
        this.add(restartImage);

        // Click event to go to start game scene
        restartImage.on('pointerup', () => {
            engine.goToScene('startgame');
        });

        // Hover effect
        restartImage.on('pointerenter', () => {
            // Verander de kleur van de afbeelding wanneer de muis erover beweegt
            restartImage.color = Color.LightGray;
        });

        restartImage.on('pointerleave', () => {
            // Reset de kleur van de afbeelding wanneer de muis de afbeelding verlaat
            restartImage.color = Color.White;
        });

        
    }
}
