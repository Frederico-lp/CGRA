import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

var deg_to_rad = Math.PI / 180.0;

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
    this.initMaterials(this.scene);

    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
    this.triangle_big = new MyTriangleBig(this.scene);
    this.triangle_small = new MyTriangleSmall(this.scene);

    this.initBuffers();
  }
  
  initBuffers() 
  {
    this.vertices = [
  
    ];
    this.indices = [

    ];
    this.normals = [

    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  
  initMaterials(scene) {

    //red
    this.red = new CGFappearance(scene);
    this.red.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.red.setDiffuse(1, 0, 0, 1.0);
    this.red.setSpecular(1, 1, 1, 1.0);
    this.red.setShininess(10.0);

    //green
    this.green = new CGFappearance(scene);
    this.green.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.green.setDiffuse(0, 1, 0, 1.0);
    this.green.setSpecular(1, 1, 1, 1.0);
    this.green.setShininess(10.0);

    //blue
    this.blue = new CGFappearance(scene);
    this.blue.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.blue.setDiffuse(0, 0, 1, 1.0);
    this.blue.setSpecular(1, 1, 1, 1.0);
    this.blue.setShininess(10.0);

    //pink
    this.pink = new CGFappearance(scene);
    this.pink.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.pink.setDiffuse(1, 0.6, 1, 1.0);
    this.pink.setSpecular(1, 1, 1, 1.0);
    this.pink.setShininess(10.0);

    //purple
    this.purple = new CGFappearance(scene);
    this.purple.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.purple.setDiffuse(0.5, 0.2, 0.9, 1.0);
    this.purple.setSpecular(1, 1, 1, 1.0);
    this.purple.setShininess(10.0);

    //orange
    this.orange = new CGFappearance(scene);
    this.orange.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.orange.setDiffuse(1, 0.6, 0, 1.0);
    this.orange.setSpecular(1, 1, 1, 1.0);
    this.orange.setShininess(10.0);

    //yellow
    this.yellow = new CGFappearance(scene);
    this.yellow.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.yellow.setDiffuse(1, 1, 0, 1.0);
    this.yellow.setSpecular(1, 1, 1, 1.0);
    this.yellow.setShininess(10.0);
}

	display()
  {
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 0);


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


    var rot = [
      Math.cos(-Math.PI / 2), Math.sin(-Math.PI / 2), 0, 0,
      -Math.sin(-Math.PI / 2), Math.cos(-Math.PI / 2), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];




    //diamante
    if (this.scene.selectCustomMaterial)
      this.scene.customMaterial.apply();
    else
      this.green.apply();
    this.scene.pushMatrix();
      this.scene.multMatrix(rot); 
      this.diamond.display();
    this.scene.popMatrix();


    //triangulo medio
    this.pink.apply();
    this.scene.pushMatrix();
      this.scene.translate(0.4, -2, 0);
      this.scene.rotate(-135 * deg_to_rad, 0, 0, 1);
      this.triangle.display();
    this.scene.popMatrix();


    //triangulo grande
    this.orange.apply();
    this.scene.pushMatrix();
      this.scene.translate(0.4, -3.4, 0);
      this.scene.rotate(45 * deg_to_rad , 0, 0, 1);
      this.triangle_big.display();
    this.scene.popMatrix();


    //segundo triangulo grande
    this.blue.apply();
    this.scene.pushMatrix();
      this.scene.translate(-2.4, -3.4, 0);
      this.scene.rotate(225 * deg_to_rad, 0, 0, 1);
      this.triangle_big.display();
    this.scene.popMatrix();


    //triangulo pequeno
    this.purple.apply();
    this.scene.pushMatrix();
      this.scene.translate(-1.3, -2.3, 0);
      this.scene.rotate(45 * deg_to_rad, 0, 0, 1);
      this.triangle_small.display();
    this.scene.popMatrix();


    //segundo triangulo pequeno
    this.red.apply();
    this.scene.pushMatrix();
      this.scene.translate(1.1, -2.7, 0);
      this.scene.rotate(-135 * deg_to_rad, 0, 0, 1);
      this.triangle_small.display();
    this.scene.popMatrix();
    
    
    //paralelograma
    this.yellow.apply();
    this.scene.pushMatrix();
      this.scene.translate(1.8, -3.4, 0);
      this.scene.rotate(-135 * deg_to_rad, 0, 0, 1);
      this.scene.scale(1, -1, 1)
      this.parallelogram.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }

  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.triangle.enableNormalViz();
    this.triangle_big.enableNormalViz();
    this.triangle_small.enableNormalViz();
    this.parallelogram.enableNormalViz();
  }

  disableNormalViz() {
    this.diamond.disableNormalViz();
    this.triangle.disableNormalViz();
    this.triangle_big.disableNormalViz();
    this.triangle_small.disableNormalViz();
    this.parallelogram.disableNormalViz();
  }
}


