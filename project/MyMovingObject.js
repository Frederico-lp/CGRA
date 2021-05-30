import {CGFobject} from '../lib/CGF.js';
import {MyTriangle} from "./MyTriangle.js";

var deg_to_rad = Math.PI / 180.0;

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene) {
		super(scene);
        this.triangle = new MyTriangle(this.scene);
        this.angle = 0;
        this.addingAngle = 0;
        this.addingVelocity = 0;
        this.velocity = 0;
        //uma so variavel para o 3?
        this.positionX = 0.35;
        this.positionY = 0.35;
        this.positionZ = 0;
	}

    update() {
        this.angle += 0.1 * this.addingAngle;
        this.addingAngle = 0;
        this.positionX += 0.5 * this.velocity * Math.sin(this.angle);
        this.positionZ +=  0.5 * this.velocity * Math.cos(this.angle);
        this.addingVelocity = 0;
    }

    display () {
        this.scene.pushMatrix();
        this.scene.translate(this.positionX, this.positionY, this.positionZ);     
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(-90 * deg_to_rad, 1, 0 , 0);
        this.scene.rotate(-45 * deg_to_rad, 0, 0 , -1);
        this.triangle.display();
        this.scene.popMatrix();
    }

    turn(val) {
        this.addingAngle = val;

    }

    accelerate(val) {
        this.addingVelocity = val;
        this.velocity = this.velocity + this.addingVelocity;
    }

    reset(){
        this.angle = 0;
        this.velocity = 0;
        this.positionX = 0.35;
        this.positionY = 0.35;
        this.positionZ = 0;
    }
}



