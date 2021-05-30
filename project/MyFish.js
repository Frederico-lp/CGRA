import { CGFobject, CGFshader, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyRock } from "./MyRock.js"


var deg_to_rad = Math.PI / 180.0;

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param color - Vector that contains color to use for fish head and fins
 */
export class MyFish extends CGFobject {
	constructor(scene, color) {
        super(scene);

        this.color = color;
        
        this.triangle = new MyTriangle(this.scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.rock = new MyRock(scene, 16, 8);

        this.tailFlag = true;
        this.tailAngle = 0;
        this.finFlag = true;
        this.finAngle = 0;
        this.rockFlag = false;
        this.turningLeft = false;
        this.turningRight = false;

        this.addingDepth = 0;
        this.addingAngle = 0;
        this.addingVelocity = 0;
        this.angle = 0;
        this.velocity = 0;
        this.positionX = 0;
        this.positionY = 3;
        this.positionZ = 0;


        this.fishScales = new CGFappearance(scene);
        this.fishScales.setAmbient(0.3, 0.3, 0.3, 1);
        this.fishScales.setDiffuse(0.7, 0.7, 0.7, 1);
        this.fishScales.setSpecular(0.0, 0.0, 0.0, 1);
        this.fishScales.setShininess(120);
        this.fishScales.loadTexture('images/scales-backround-rainbow-colors.jpg');
        this.fishScales.setTextureWrap('REPEAT', 'REPEAT');
        //https://www.publicdomainpictures.net/en/view-image.php?image=111369&picture=scales-background-rainbow-colors

       
        this.fishEyes = new CGFappearance(scene);
        this.fishEyes.setAmbient(0.3, 0.3, 0.3, 1);
        this.fishEyes.setDiffuse(0.7, 0.7, 0.7, 1);
        this.fishEyes.setSpecular(0.0, 0.0, 0.0, 1);
        this.fishEyes.setShininess(120);
        this.fishEyes.loadTexture('images/eyes.png');
        this.fishEyes.setTextureWrap('REPEAT', 'REPEAT');
        //https://aboutislam.net/shariah/special-coverage-shariah/hajj-and-umrah/hajj-black-white-dots/

        
        this.rockAppearance = new CGFappearance(scene);
        this.rockAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.rockAppearance.setShininess(120);
        
        this.fishFins = new CGFappearance(scene);
        this.fishFins.setAmbient(this.color[0], this.color[1], this.color[2], 1);
        this.fishFins.setDiffuse(this.color[0], this.color[1], this.color[2], 1);
        this.fishFins.setSpecular(this.color[0], this.color[1], this.color[2], 1);
        this.fishFins.setShininess(120);


        


        this.shader = new CGFshader(this.scene.gl, "shaders/fish.vert", "shaders/fish.frag");
        this.shader.setUniformsValues({ color: this.color });

        this.initBuffers();
	}

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}

    update() {
        this.angle += 0.1 * this.addingAngle;
        this.turningLeft = false;
        this.turningRight = false;
        if(this.addingAngle > 0)
            this.turningLeft = true;
        else if(this.addingAngle < 0)
            this.turningRight = true;

        this.addingAngle = 0;
        this.positionX += 0.5 * this.velocity * Math.sin(this.angle);
        this.positionZ +=  0.5 * this.velocity * Math.cos(this.angle);
        this.positionY += this.addingDepth;
        this.addingDepth = 0;
        this.addingVelocity = 0;

        //fins movement
        if(this.finFlag) this.finAngle+=2;
        else this.finAngle-=2;
        
        if(this.finAngle > 25)
            this.finFlag = false;
        else if(this.finAngle < 0)
            this.finFlag = true;

        //tail movement
        if(this.tailFlag) this.tailAngle+=3 + 3*this.velocity;
        else this.tailAngle-= (3 + 3*this.velocity);
        
        if(this.tailAngle > 15)
            this.tailFlag = false;
        else if(this.tailAngle < -15)
            this.tailFlag = true;

    }

    display () {
        //Makes sure that all parts of the fish are moved and rotated
        this.scene.translate(this.positionX, this.positionY, this.positionZ);     
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.pushMatrix();
        this.fishFins.apply();
        
        //this.scene.setActiveShader(this.shader);

        //Rock
        if(this.rockFlag){
            this.scene.pushMatrix();
            this.scene.translate(0, -0.4, 1.2);
            this.scene.scale(0.2, 0.2, 0.2);
            this.rockAppearance.apply();
            this.rock.display();
            this.fishFins.apply();
            this.scene.popMatrix();
        }
        
        
        //Left fin
        this.scene.pushMatrix();
            this.scene.translate(0.79, 0, -0.2);
            if(!this.turningLeft){
                this.scene.rotate(this.finAngle * deg_to_rad, 0, 1, 1);
            }
            this.turingLeft = false;
            this.scene.rotate(25 * deg_to_rad, 0, 0, 1);
            this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
            this.scene.scale(0.40, 0.40, 0.40);
            this.triangle.display();
        this.scene.popMatrix();


        //Right fin
        this.scene.pushMatrix();
            this.scene.translate(-0.79, 0, -0.2);
            if(!this.turningRight){
                this.scene.rotate(-this.finAngle * deg_to_rad, 0, 1, 1);
            }
            this.turingRight = false;
            this.scene.rotate(-25 * deg_to_rad, 0, 0, 1);
            this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
            this.scene.scale(0.40, 0.40, 0.40);
            this.triangle.display();
        this.scene.popMatrix();


        //Tail
        this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.75);
            this.scene.rotate(-this.tailAngle * deg_to_rad, 0, 1, 0);
            this.scene.rotate(-45 * deg_to_rad, 1, 0, 0);
            this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
            this.scene.translate(1, 1, 0);
            this.scene.scale(0.7, 0.7, 0.7);
            this.triangle.display();
        this.scene.popMatrix();


        //Upper fin
        this.scene.pushMatrix();
            this.scene.translate(0, 1.3, -0.1);
            this.scene.rotate(90 * deg_to_rad, 1, 0, 0);
            this.scene.rotate(90 * deg_to_rad, 0, 1, 0);
            this.scene.scale(0.40, 0.40, 0.40);
            this.triangle.display();
        this.scene.popMatrix();


        //Fish Body
        this.scene.setActiveShader(this.shader);
        this.scene.scale(0.7, 1, 1.2);
        this.fishScales.apply();
        this.sphere.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        //Left Eye
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.2, 0.5);
        this.scene.scale(0.19, 0.19, 0.19);
        this.fishEyes.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //Right Eye
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.2, 0.5);
        this.scene.rotate(180*deg_to_rad, 0, 0, 1);
        this.scene.scale(0.19, 0.19, 0.19);
        this.fishEyes.apply();
        this.sphere.display();
        this.scene.popMatrix();

    

        
    }

    turn(val) {
        this.addingAngle = val;

    }


    accelerate(val) {
        this.addingVelocity = val;
        this.velocity = this.velocity + this.addingVelocity;
    }

    depth(val){
        if(this.positionY > 0.5 && this.positionY < 50)
            this.addingDepth = val;
        else if((this.positionY <= 1 && val > 0) || this.positionY >= 50 && val < 0)
            this.addingDepth = val;

    }

    setRockFlag(){
        if(this.positionY <= 0.5){
            if(this.rockFlag)
                this.rockFlag = false;
            else this.rockFlag = true;
        }
    }


    reset(){
        this.angle = 0;
        this.velocity = 0;
        this.positionX = 0;
        this.positionY = 3;
        this.positionZ = 0;
    }
}



