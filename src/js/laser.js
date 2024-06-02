import { Actor, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from "./resources";
import { Dragon } from "./dragon";

export class Laser extends Actor {
    constructor(x, y, direction) {
        super({
            pos: new Vector(x, y),
            vel: direction.normalize().scale(450), 
            width: 1,  // Make the laser thinner
            height: 2, // Make the laser shorter
            collisionType: CollisionType.Passive 
        });

        // Set a custom collision shape
        this.collider.set(Shape.Box(this.width, this.height));
        this.initialized = false; 
    }

    onInitialize(engine) {
        if (!this.initialized) { 
            this.initialized = true; 
            this.on('collisionstart', (event) => this.hitSomething(event));

           
            const laserSprite = Resources.Laser.toSprite();
            laserSprite.scale = new Vector(0.01, 0.04);
            this.graphics.use(laserSprite);
        }
    }

    onPreUpdate(engine, delta) {
       
        if (this.pos.x < 0 || this.pos.x > engine.drawWidth || this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }

    hitSomething(event) {
        if (event.other instanceof Dragon) {
            event.other.kill(); 
            this.kill();
            event.other.scene.engine.goToScene('gameover');
        }
    }
}
