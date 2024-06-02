import { Actor, Input, Vector, Timer } from "excalibur";
import { Bullet } from "./bullet";
import { Resources } from './resources';

// Shooting component
class Shooting {
    constructor(actor, shootInterval = 500) {
        this.actor = actor;
        this.shootInterval = shootInterval;
        this.isShooting = false;
        this.shootTimer = new Timer({
            fcn: () => { this.isShooting = false; },
            interval: this.shootInterval,
            repeats: false
        });
    }

    shoot() {
        if (!this.isShooting) {
            const direction = new Vector(-1, 0); // Shoot straight ahead
            const bullet = new Bullet(this.actor.pos.x, this.actor.pos.y, direction);
            this.actor.engine.add(bullet);
            this.isShooting = true;

            // Restart the timer to reset shooting
            this.shootTimer.reset();
            this.actor.engine.add(this.shootTimer);
            this.shootTimer.start();
        }
    }

    initialize(engine) {
        this.engine = engine;
    }
}

export class Dragon extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50
        });
        const dragonSprite = Resources.Dragon.toSprite();
        dragonSprite.scale = new Vector(0.33, 0.33); // Scale the dragon to 1/3 of its original size
        this.graphics.use(dragonSprite);

        // Add Shooting component
        this.shooting = new Shooting(this);
    }

    onInitialize(engine) {
        this.engine = engine;
        this.shooting.initialize(engine);
        this.on('preupdate', this.updateMovement.bind(this));

        // Listen for the 'press' event of the keyboard
        this.engine.input.keyboard.on('press', (evt) => {
            // If the space key is pressed, call the shoot method
            if (evt.key === Input.Keys.Space) {
                this.shooting.shoot();
            }
        });
    }

    updateMovement(evt) {
        const speed = 200; // pixels per second
        let moveDir = new Vector(0, 0);

        if (this.engine.input.keyboard.isHeld(Input.Keys.Left)) {
            moveDir.x -= 1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.Right)) {
            moveDir.x += 1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.Up)) {
            moveDir.y -= 1;
        }
        if (this.engine.input.keyboard.isHeld(Input.Keys.Down)) {
            moveDir.y += 1;
        }

        this.vel = moveDir.scale(speed);
    }
}

// klaar