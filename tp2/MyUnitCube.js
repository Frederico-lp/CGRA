import {CGFobject} from '../lib/CGF.js';
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            //face inferior do cubo (z = -0.5)
			-0.5, -0.5, -0.5, //0
             0.5, -0.5, -0.5, //1
             0.5,  0.5, -0.5, //2
            -0.5,  0.5, -0.5, //3
            //face superior do cubo (z = 0.5)
			-0.5, -0.5,  0.5, //4
             0.5, -0.5,  0.5, //5
             0.5,  0.5,  0.5, //6
            -0.5,  0.5,  0.5, //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //face inferior (z negativo)
            0, 1, 2,
			2, 3, 0, 

            //face lateral (x negativo)
            3, 4, 0,
            3, 7, 4,

            //face lateral (y positivo)
            3, 2, 6,
            3, 6, 7,

            //face lateral (x positivo)
            2, 1, 5,
            2, 5, 6,

            //face lateral (y negativo)
            1, 0, 4,
            1, 4, 5,

            //face superior(z positivo)
            6, 5, 4,
            4, 7, 6
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
