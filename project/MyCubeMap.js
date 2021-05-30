import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

var deg_to_rad = Math.PI / 180.0;

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, textures) {
    super(scene);
    this.scene = scene;
    this.myQuad = new MyQuad(scene);
    if (textures != undefined){
      this.textures = textures;
    this.initMaterials();
    }
  }
  
  initMaterials(){
    this.material1 = new CGFappearance(this.scene);
    this.material1.setEmission(1, 1, 1, 1);
    this.material1.setTexture(this.textures[0]);
    //this.material1.setTextureWrap('REPEAT', 'REPEAT');

    this.material2 = new CGFappearance(this.scene);
    this.material2.setEmission(1, 1, 1, 1);
    this.material2.setTexture(this.textures[1]);
    //this.material1.setTextureWrap('REPEAT', 'REPEAT');

    this.material3 = new CGFappearance(this.scene);
    this.material3.setEmission(1, 1, 1, 1);
    this.material3.setTexture(this.textures[2]);
    //this.material1.setTextureWrap('REPEAT', 'REPEAT');

    this.material4 = new CGFappearance(this.scene);
    this.material4.setEmission(1, 1, 1, 1);
    this.material4.setTexture(this.textures[3]);
    //this.material1.setTextureWrap('REPEAT', 'REPEAT');

    this.material5 = new CGFappearance(this.scene);
    this.material5.setEmission(1, 1, 1, 1);
    this.material5.setTexture(this.textures[4]);
    //this.material1.setTextureWrap('REPEAT', 'REPEAT');

    this.material6 = new CGFappearance(this.scene);
    this.material6.setEmission(1, 1, 1, 1);
    this.material6.setTexture(this.textures[5]);
    //this.material1.setTextureWrap('REPEAT', 'REPEAT');
  }

	display(){
    this.scene.pushMatrix();
    //face superior
    this.scene.scale(500, 500, 500);
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(180 * deg_to_rad, 1, 0, 0);
        this.scene.rotate(180 * deg_to_rad, 0, 0, 1);
        this.material1.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de y < 0
    this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90 * deg_to_rad, 1, 0 , 0);
        this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
        this.material2.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de y > 0
    this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(90 * deg_to_rad, 1, 0, 0);
        this.material3.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de x < 0
    this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
        this.material4.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();
    this.scene.popMatrix();
    //face de x > 0
    this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-90 * deg_to_rad, 0, 1, 0);
        //this.scene.rotate(90 * deg_to_rad, 1, 0 , 0);
        this.material5.apply();
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.myQuad.display();
    this.scene.popMatrix();
    //face inferior
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.material6.apply();
      //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.myQuad.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
    }

}


