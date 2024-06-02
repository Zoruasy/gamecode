import { Actor, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from "./resources";
import { Dragon } from "./dragon";

export class Laser extends Actor {
    constructor(x, y, direction) {
        super({
            pos: new Vector(x, y),
            vel: direction.normalize().scale(450), // Adjust the velocity as needed
            width: 1,  // Make the laser thinner
            height: 2, // Make the laser shorter
            collisionType: CollisionType.Passive // Set collision type to Passive if it doesn't need to react to other bullets
        });

        // Set a custom collision shape
        this.collider.set(Shape.Box(this.width, this.height));
        this.initialized = false; // Add a flag to track initialization
    }

    onInitialize(engine) {
        if (!this.initialized) { // Check if already initialized
            this.initialized = true; // Set initialized flag to true
            this.on('collisionstart', (event) => this.hitSomething(event));

            // Use a sprite or a simple shape for the laser
            const laserSprite = Resources.Laser.toSprite();
            laserSprite.scale = new Vector(0.01, 0.04); // Adjust the scale as needed
            this.graphics.use(laserSprite);
        }
    }

    onPreUpdate(engine, delta) {
        // Remove the laser if it goes out of bounds
        if (this.pos.x < 0 || this.pos.x > engine.drawWidth || this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }

    hitSomething(event) {
        if (event.other instanceof Dragon) {
            event.other.kill(); // Remove the dragon
            this.kill(); // Remove the laser
            event.other.scene.engine.goToScene('gameover'); // Transition to the game over scene
        }
    }
}
