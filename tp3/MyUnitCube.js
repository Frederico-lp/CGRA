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
            //x = 0.5
             0.5,  0.5,  0.5, // 8
             0.5,  0.5, -0.5, // 9
             0.5, -0.5, -0.5, // 10
             0.5, -0.5,  0.5, // 11
            //x = -0.5
            -0.5, -0.5, -0.5, // 12
            -0.5,  0.5, -0.5, // 13
            -0.5,  0.5,  0.5, // 14
            -0.5, -0.5,  0.5, // 15 
            //y = 0.5
            -0.5,  0.5, -0.5, // 16
             0.5,  0.5, -0.5, // 17
             0.5,  0.5,  0.5, // 18
            -0.5,  0.5,  0.5, // 19
            // y = -0.5
            -0.5, -0.5,  0.5, // 20
             0.5, -0.5,  0.5, // 21
             0.5, -0.5, -0.5, // 22
            -0.5, -0.5, -0.5, // 23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //face inferior (z negativo)
            2, 1, 0,
			0, 3, 2, 

            //face superior(z positivo)
            4, 5, 6,
            6, 7, 4,

            //face lateral (x positivo)
            8, 11, 10,
            10, 9, 8,

            //face lateral (x negativo)
            14, 13, 12,
            12, 15, 14,

            //face lateral (y positivo)
            18, 17, 16,
            16, 19, 18,

            //face lateral (y negativo)
            20, 23, 22,
            22, 21, 20,

		];

        this.normals = [
            //z = -0.5
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            //z = 0.5
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            //x = 0.5
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            //x = -0.5
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            //y = 0.5
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            //y = -0.5
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
