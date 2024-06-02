import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { Spaceship } from "./spaceship";
import { MainGame } from "./scenes/maingame"; 

export class Bullet extends Actor {
    constructor(x, y, direction) {
        super({
            pos: new Vector(x, y),
            vel: direction.normalize().scale(300),
            width: 10,
            height: 10,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));

        const bulletSprite = Resources.Bullet.toSprite();
        bulletSprite.scale = new Vector(0.08, 0.08);
        this.graphics.use(bulletSprite);
    }

    onPostUpdate(engine, delta) {
        this.pos = this.pos.add(this.vel.scale(delta / 1000));

        if (this.pos.x < 0 || this.pos.x > engine.drawWidth || this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }

    hitSomething(event) {
        if (event.other instanceof Spaceship) {
            const mainGameScene = this.scene;
            if (mainGameScene instanceof MainGame) {
                mainGameScene.increaseScore(); 
            }
            event.other.kill(); 
            this.kill(); // Remove the bullet
        }
    }
}
