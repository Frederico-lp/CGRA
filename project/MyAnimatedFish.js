import { CGFobject, CGFshader, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyFish } from "./MyFish.js";


var deg_to_rad = Math.PI / 180.0;
var rand = Math.random();
//var slower = true;

/**
 * MyAnimatedFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAnimatedFish extends CGFobject {
	constructor(scene, center, duration) {
        super(scene);

        this.center = center;
        this.duration = duration;

        this.firstFish = new MyFish(scene, [0, 0, 1]);
        this.secondFish = new MyFish(scene, [0.8, 0.8, 0]);

        this.fishTexture = new CGFtexture(this, 'images/fishScales.png');

        this.fishAppearance = new CGFappearance(this);
		this.fishAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.fishAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.fishAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.fishAppearance.setShininess(120);
        this.fishAppearance.setTexture(this.fishTexture);

        this.firstFish.accelerate(0.1);
        this.secondFish.accelerate(0.1);
        
	}
    update (){
        this.firstFish.turn(Math.PI / this.duration);// 2pi / duration * 2(update called 2x second)
        this.secondFish.turn(-Math.PI / this.duration);// 2pi / duration * 2(update called 2x second)

        this.firstFish.update();
        this.secondFish.update();
        
    }

    

    display () {
        
        this.scene.pushMatrix();
        this.scene.translate(this.firstFish.positionX + Math.sin(this.firstFish.angle) * 5, 
                0, this.firstFish.positionZ + Math.cos(this.firstFish.angle) * 5);

        this.scene.translate(this.center[0], this.center[1], this.center[2]);
        this.scene.rotate(45 * deg_to_rad , 0, 1, 0);
        this.firstFish.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.secondFish.positionX + Math.sin(this.secondFish.angle) * 6.5, 
                0, this.secondFish.positionZ + Math.cos(this.secondFish.angle) * 6.5);
                //6 para nao passarem um por cima do outro
        this.scene.rotate(-45 * deg_to_rad , 0, 1, 0);
        this.secondFish.display();
        this.scene.popMatrix();
        
    }

}



