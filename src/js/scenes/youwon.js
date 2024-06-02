import { Scene, Actor, Color, Sprite } from "excalibur"; 
import { Resources } from '../resources.js'; // Zorg ervoor dat je het pad naar je resources bestand correct hebt ingesteld

export class YouWonScene extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            pos: engine.screen.center, 
            width: engine.drawWidth,
            height: engine.drawHeight
        });

        const backgroundImage = new Sprite(Resources.Youwon); // Zorg ervoor dat je 'Resources.YouWonBackground' vervangt door de juiste bron voor je achtergrondafbeelding
        background.graphics.add(backgroundImage);

        this.add(background);
    }
}
