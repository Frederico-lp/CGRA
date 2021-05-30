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

    this.tangramTex = new CGFappearance(this.scene);
    this.tangramTex.setAmbient(0.1, 0.1, 0.1, 1);
    this.tangramTex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tangramTex.setSpecular(0.1, 0.1, 0.1, 1);
    this.tangramTex.setShininess(10.0);
    this.tangramTex.loadTexture('images/tangram.png');
    this.tangramTex.setTextureWrap('REPEAT', 'REPEAT');
}

	display()
  {
    this.scene.pushMatrix();
    this.tangramTex.apply();
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
    this.scene.pushMatrix();
      this.scene.multMatrix(rot); 
      this.diamond.display();
    this.scene.popMatrix();


    //triangulo medio
    this.scene.pushMatrix();
      this.scene.translate(0.4, -2, 0);
      this.scene.rotate(-135 * deg_to_rad, 0, 0, 1);
      this.triangle.display();
    this.scene.popMatrix();


    //triangulo grande
    this.scene.texCoords = [1.0, 1.0, 0.50, 0.50, 1.0, 0.0, 1.0, 1.0, 0.50, 0.50, 1.0, 0.0];
		this.triangle_big.updateTexCoords(this.scene.texCoords);
    this.scene.pushMatrix();
    this.scene.translate(0.4, -3.4, 0);
    this.scene.rotate(45 * deg_to_rad , 0, 0, 1);
    this.triangle_big.display();
    this.scene.popMatrix();
    
    
    //segundo triangulo grande
    this.scene.texCoords = [1.0, 0.0, 0.50, 0.50, 0.0, 0.0, 1.0, 0.0, 0.50, 0.50, 0.0, 0.0];
		this.triangle_big.updateTexCoords(this.scene.texCoords);
    this.scene.pushMatrix();
      this.scene.translate(-2.4, -3.4, 0);
      this.scene.rotate(225 * deg_to_rad, 0, 0, 1);
      this.triangle_big.display();
    this.scene.popMatrix();


    //triangulo pequeno
    this.scene.texCoords = [0.0, 0.0, 0.25, 0.25, 0.0, 0.5, 0.0, 0.0, 0.25, 0.25, 0.0, 0.5];
    this.triangle_small.updateTexCoords(this.scene.texCoords);
    this.scene.pushMatrix();
    this.scene.translate(-1.3, -2.3, 0);
    this.scene.rotate(45 * deg_to_rad, 0, 0, 1);
    this.triangle_small.display();
    this.scene.popMatrix();
    
    
    //segundo triangulo pequeno
    this.scene.texCoords = [0.25, 0.75, 0.50, 0.50, 0.75, 0.75, 0.25, 0.75, 0.50, 0.50, 0.75, 0.75];
    this.triangle_small.updateTexCoords(this.scene.texCoords);
    this.scene.pushMatrix();
      this.scene.translate(1.1, -2.7, 0);
      this.scene.rotate(-135 * deg_to_rad, 0, 0, 1);
      this.triangle_small.display();
    this.scene.popMatrix();
    
    
    //paralelograma
    this.scene.pushMatrix();
      this.scene.translate(1.8, -3.4, 0);
      this.scene.rotate(-135 * deg_to_rad, 0, 0, 1);
      this.scene.scale(1, -1, 1);
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


