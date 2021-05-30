import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

var deg_to_rad = Math.PI / 180.0;

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {

		super(scene);
    this.myQuad = new MyQuad(this.scene);
  }
  
	display(){
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0);
    var sca = [
        this.scaleFactor,
        0.0,
        0.0,
        0.0,
        0.0,
        this.scaleFactor,
        0.0,
        0.0,
        0.0,
        0.0,
        this.scaleFactor,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ];


    //face superior
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de y < 0
    this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90 * deg_to_rad, 1, 0 , 0);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de y > 0
    this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(90 * deg_to_rad, 1, 0, 0);
        this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de x < 0
    this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
        this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de x > 0
    this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
        this.myQuad.display();
    this.scene.popMatrix();
    //face inferior
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
      this.myQuad.display();
    this.scene.popMatrix();

    }

}


