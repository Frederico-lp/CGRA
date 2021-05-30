import { CGFobject, CGFshader, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyRock } from "./MyRock.js"


var deg_to_rad = Math.PI / 180.0;
var rand = Math.random();

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param color - Vector that contains color to use for fish head and fins
 */
export class MyRockSet extends CGFobject {
	constructor(scene) {
        super(scene);

        this.rock = new MyRock(scene, 16, 8);
        this.rockAppearance = new CGFappearance(scene);
        this.rockAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setShininess(120);
        
       
        
	}

    

    display () {
        this.scene.pushMatrix();
        //this.scene.translate(6, 6, 6);


        this.rockAppearance.apply();
        //this.scene.translate(0, 0, -5);

        this.scene.pushMatrix();
        this.scene.translate(0, -9.9, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.scale(1, 0.5, 1);
        this.rock.display();
        this.scene.popMatrix();

        if(rand > 0.3){
            this.scene.pushMatrix();
            //rand = Math.floor(1+ Math.random()*5);
            this.scene.translate(0, -9.9, -0.3);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.scale(0.7, 0.3, 1);
            this.rock.display();
            this.scene.popMatrix();
        }

        if(rand > 0.5){
            this.scene.pushMatrix();
            this.scene.translate(-0.5, -9.9, 0.2);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.scale(0.4, 1, 1);
            this.rock.display();
            this.scene.popMatrix();
        }


        if(rand < 0.5){
            this.scene.pushMatrix();
            this.scene.translate(0, -9.9, 0.5);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.scale(1, 0.5, 1.2);
            this.rock.display();
            this.scene.popMatrix();
        }

        if(rand < 0.8){
            this.scene.pushMatrix();
            this.scene.translate(0.5, -9.9, -0.2);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.scale(0.5, 0.5, 1.2);
            this.rock.display();
            this.scene.popMatrix();
        }

        if(rand > 0.2){
            this.scene.pushMatrix();
            this.scene.translate(0.2, -9.9, -0.4);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.scale(0.5, 0.5, 1.2);
            this.rock.display();
            this.scene.popMatrix();
        }
        


        this.scene.popMatrix();
        
    }

}



