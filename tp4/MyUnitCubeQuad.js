import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

var deg_to_rad = Math.PI / 180.0;

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
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
    this.material1.setAmbient(1, 0.3, 0.5, 1.0);
    this.material1.setDiffuse(1, 0.3, 0.5, 1.0);
    this.material1.setSpecular(1, 1, 1, 1.0);
    this.material1.setShininess(10.0);
    this.material1.setTexture(this.textures[1]);
    this.material1.setTextureWrap('REPEAT', 'REPEAT');

    this.material2 = new CGFappearance(this.scene);
    this.material2.setAmbient(1, 0.3, 0.5, 1.0);
    this.material2.setDiffuse(1, 0.3, 0.5, 1.0);
    this.material2.setSpecular(1, 1, 1, 1.0);
    this.material2.setShininess(10.0);
    this.material2.setTexture(this.textures[1]);
    this.material2.setTextureWrap('REPEAT', 'REPEAT');

    this.material3 = new CGFappearance(this.scene);
    this.material3.setAmbient(1, 0.3, 0.5, 1.0);
    this.material3.setDiffuse(1, 0.3, 0.5, 1.0);
    this.material3.setSpecular(1, 1, 1, 1.0);
    this.material3.setShininess(10.0);
    this.material3.setTexture(this.textures[2]);
    this.material3.setTextureWrap('REPEAT', 'REPEAT');

    this.material4 = new CGFappearance(this.scene);
    this.material4.setAmbient(1, 0.3, 0.5, 1.0);
    this.material4.setDiffuse(1, 0.3, 0.5, 1.0);
    this.material4.setSpecular(1, 1, 1, 1.0);
    this.material4.setShininess(10.0);
    this.material4.setTexture(this.textures[3]);
    this.material4.setTextureWrap('REPEAT', 'REPEAT');

    this.material5 = new CGFappearance(this.scene);
    this.material5.setAmbient(1, 0.3, 0.5, 1.0);
    this.material5.setDiffuse(1, 0.3, 0.5, 1.0);
    this.material5.setSpecular(1, 1, 1, 1.0);
    this.material5.setShininess(10.0);
    this.material5.setTexture(this.textures[0]);
    this.material5.setTextureWrap('REPEAT', 'REPEAT');

    this.material6 = new CGFappearance(this.scene);
    this.material6.setAmbient(0, 0.3, 0.5, 1.0);
    this.material6.setDiffuse(0, 0.3, 0.5, 1.0);
    this.material6.setSpecular(1, 1, 1, 1.0);
    this.material6.setShininess(10.0);
    this.material6.setTexture(this.textures[5]);
    this.material6.setTextureWrap('REPEAT', 'REPEAT');
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
        this.material1.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.myQuad.display();
    this.scene.popMatrix();
    //face de y < 0
    this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(90 * deg_to_rad, 1, 0 , 0);
        this.material2.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.myQuad.display();
    this.scene.popMatrix();
    //face de y > 0
    this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(90 * deg_to_rad, 1, 0, 0);
        this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
        this.material3.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.myQuad.display();
    this.scene.popMatrix();
    //face de x < 0
    this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
        this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
        this.material4.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.myQuad.display();
    this.scene.popMatrix();
    //face de x > 0
    this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
        this.material5.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.myQuad.display();
    this.scene.popMatrix();
    //face inferior
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(180 * deg_to_rad, 1, 0 , 0);
      this.material6.apply();
      this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
      this.scene.myQuad.display();
    this.scene.popMatrix();
    }

}


