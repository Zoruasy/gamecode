import { Actor, Vector, CollisionType, Timer, Shape } from "excalibur";
import { Resources } from './resources';
import { Dragon } from './dragon';
import { Laser } from './laser';

// Health component
class Health {
    constructor(maxHealth) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    takeDamage(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            return true; // Return true if the object is destroyed
        }
        return false; // Return false if the object is still alive
    }
}

export class Spaceship extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            collisionType: CollisionType.Active
        });
        const spaceshipSprite = Resources.Spaceship.toSprite();
        spaceshipSprite.scale = new Vector(0.2, 0.2);
        this.graphics.use(spaceshipSprite);
        this.collider.set(Shape.Box(this.width * 0.5, this.height * 0.5));

        // Add Health component
        this.health = new Health(100);
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.checkCollision(event));
        this.engine = engine;
        this.vel = new Vector(0, 0);

        this.shootTimer = new Timer({
            fcn: () => this.shoot(),
            interval: 1000,
            repeats: true
        });
        this.engine.add(this.shootTimer);
        this.shootTimer.start();
    }

    onPreUpdate(engine, delta) {
        const dragon = this.engine.currentScene.actors.find(actor => actor instanceof Dragon);
        if (dragon) {
            const direction = dragon.pos.sub(this.pos).normalize();
            const speed = 100;
            this.vel = direction.scale(speed);
        }
    }

    checkCollision(event) {
        if (event.other instanceof Laser) {
            const destroyed = this.health.takeDamage(10); // Reduce health by 10 when hit by a laser
            if (destroyed) {
                this.destroy(); // Destroy the spaceship if its health reaches zero
            }
        }
    }

    shoot() {
        if (!this.isKilled()) {
            const dragon = this.engine.currentScene.actors.find(actor => actor instanceof Dragon);
            if (dragon) {
                const direction = dragon.pos.sub(this.pos).normalize();
                const laser = new Laser(this.pos.x, this.pos.y, direction);
                this.engine.add(laser);
            }
        }
    }
}
