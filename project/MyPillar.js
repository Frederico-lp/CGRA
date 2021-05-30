import {CGFobject} from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 */
 export class MyPillar extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords=[];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var textmap = 0;
        var textmapadd = 1/this.slices;

        for(var i = 0; i <= this.slices; i++){


            var sinAng=Math.sin(ang); // valor para z
            var cosAng=Math.cos(ang); // valor para x

            this.vertices.push(cosAng, 0, -sinAng); // ZX plane face
            this.texCoords.push(textmap, 1);
            this.vertices.push(cosAng, 1, -sinAng); // Y=1 plane face
            this.texCoords.push(textmap, 0);
            this.normals.push(cosAng, 0, -sinAng, cosAng, 0, -sinAng);

            if (i!==0){
                this.indices.push((i*2), (i*2+1), (i*2-1));
                this.indices.push((i*2), (2*i-1), (2*i-2));
            }
            ang+=alphaAng;
            textmap+=textmapadd;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(30 * complexity);
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    setFillMode() {
        this.primitiveType=this.scene.gl.TRIANGLES;
    }

    setLineMode()
    {
        this.primitiveType=this.scene.gl.LINE_STRIP;
    };
}
