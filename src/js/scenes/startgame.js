import { Scene, Actor, vec } from "excalibur";
import { Resources } from '../resources.js';

export class StartGame extends Scene {
    onInitialize(engine) {
        // Background
        const background = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight
        });
        background.graphics.use(Resources.Background.toSprite());
        this.add(background);

        // Game Logo
        const gameLogo = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 250),
            width: 200,
            height: 100
        });
        gameLogo.graphics.use(Resources.GameLogo.toSprite());
        gameLogo.anchor.setTo(0.5, 0.5);
        this.add(gameLogo);

        // Start Button
        const startButton = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 + 50),
            width: 200,
            height: 50
        });
        startButton.graphics.use(Resources.Button.toSprite());
        startButton.anchor.setTo(0.5, 0.5);
        this.add(startButton);

        // Click event to go to main game scene
        startButton.on('pointerup', () => {
            engine.goToScene('maingame');
        });

        // Ensure the button is interactive
        startButton.enableCapturePointer = true;
        startButton.pointer.useGraphicsBounds = true;

        // Hover effect
        startButton.on('pointerenter', () => {
            startButton.graphics.opacity = 0.7; // Change opacity on hover
        });

        startButton.on('pointerleave', () => {
            startButton.graphics.opacity = 1; // Reset opacity on leave
        });
    }
}
