import { Actor, Vector, Animation } from "excalibur";
import { Resources } from './resources';

export class Animated extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 64, 
            height: 64, 
        });

        const animation = new Animation({
            frames: [
                { graphic: Resources.Fly01.toSprite(), duration: 100 },
                { graphic: Resources.Fly02.toSprite(), duration: 100 },
                { graphic: Resources.Fly03.toSprite(), duration: 100 },
                { graphic: Resources.Fly04.toSprite(), duration: 100 },
                { graphic: Resources.Fly05.toSprite(), duration: 100 },
                { graphic: Resources.Fly06.toSprite(), duration: 100 },
                { graphic: Resources.Fly07.toSprite(), duration: 100 }
            ],
            loop: true 
        });

        this.graphics.use(animation);
    }

    onInitialize(engine) {
        // Set the initial velocity of the animated sprite
        this.vel = new Vector(100, 0); // Move to the right at 100 pixels per second
    }

    update(engine, delta) {
        super.update(engine, delta);

        // Update the position based on velocity
        this.pos.x += this.vel.x * delta / 1000; // Convert velocity from pixels per second to pixels per millisecond

        // Update animation position to match actor's position
        this.graphics.x = this.pos.x;
        this.graphics.y = this.pos.y;
    }
}
