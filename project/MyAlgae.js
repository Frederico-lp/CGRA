import { CGFobject, CGFshader, CGFappearance } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";


var deg_to_rad = Math.PI / 180.0;
var rand = Math.random();

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param color - Vector that contains color to use for fish head and fins
 */
export class MyAlgae extends CGFobject {
	constructor(scene) {
        super(scene);

        this.algae = new MyPyramid(scene, 4, 8);
        this.algaeAppearance = new CGFappearance(scene);
        this.algaeAppearance.setAmbient(0, 0.8, 0, 1);
        this.algaeAppearance.setDiffuse(0, 0.8, 0, 1);
        this.algaeAppearance.setSpecular(0, 0.8, 0, 1);
        this.algaeAppearance.setShininess(60);
        
       
        
	}

    

    display () {
        this.scene.pushMatrix();
        //this.scene.translate(6, 6, 6);


        this.algaeAppearance.apply();
        //this.scene.translate(0, 0, -5);

        this.scene.pushMatrix();
        this.scene.translate(0, -9.9, 0);
        this.scene.scale(0.1, 1, 0.1);
        this.scene.scale(1, 0.5 + rand, 1);
        this.algae.display();
        this.scene.popMatrix();

        if(rand > 0.3){
            this.scene.pushMatrix();
            //rand = Math.floor(1+ Math.random()*5);
            this.scene.translate(0, -9.9, 0.2);
            this.scene.scale(0.1, 1, 0.1);
            this.scene.scale(0.7, 1 + rand, 0.7);
            this.algae.display();
            this.scene.popMatrix();
        }

        if(rand > 0.5){
            this.scene.pushMatrix();
            this.scene.translate(-0.2, -9.9, 0.2);
            this.scene.scale(0.1, 1, 0.1);
            this.scene.scale(0.7, 0.5 + rand, 1);
            this.algae.display();
            this.scene.popMatrix();
        }


        if(rand < 0.5){
            this.scene.pushMatrix();
            this.scene.translate(-0.1, -9.9, 0.3);
            this.scene.scale(0.1, 1, 0.1);
            this.scene.scale(0.7, 1 + rand, 0.7);
            this.algae.display();
            this.scene.popMatrix();
        }

        if(rand < 0.8){
            this.scene.pushMatrix();
            this.scene.translate(0.1, -9.9, -0.2);
            this.scene.scale(0.1, 1, 0.1);
            this.scene.scale(0.7, 0.2 + rand, 0.8);
            this.algae.display();
            this.scene.popMatrix();
        }

        if(rand > 0.2){
            this.scene.pushMatrix();
            this.scene.translate(-0.1, -9.9, -0.4);
            this.scene.scale(0.1, 1, 0.1);
            this.scene.scale(0.5, 1.5 + rand, 0.7);
            this.algae.display();
            this.scene.popMatrix();
        }
        


        this.scene.popMatrix();
        
    }

}



