import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MyPlane } from "../tp5/MyPlane.js";
import { MyPillar } from "./MyPillar.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyAlgae } from "./MyAlgae.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";


var deg_to_rad = Math.PI / 180.0;

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();

        this.selectedTexture = 0;

        //Camera variables
        this.fov = 2;
        this.position = vec3.fromValues(2, 2, 2);
        this.target = vec3.fromValues(0, 2, 0);
    }
    
    
    checkKeys()  {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            this.movingObject.accelerate(0.02 * this.speedFactor);
            this.fish.accelerate(0.02 * this.speedFactor);
            keysPressed=true;

        }
        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            this.movingObject.accelerate(-0.02 * this.speedFactor);
            this.fish.accelerate(-0.02 * this.speedFactor);            
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            this.movingObject.turn(Math.PI / 4);
            this.fish.turn(Math.PI / 4);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            this.movingObject.turn(-Math.PI / 4);
            this.fish.turn(-Math.PI / 4);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            this.movingObject.reset();
            this.fish.reset();
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            this.fish.depth(0.1);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            this.fish.depth(-0.1);
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyC")) {
            text+=" C ";
            this.fish.setRockFlag();
            keysPressed=true;
        }
        if (keysPressed)
            console.log(text);
  }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);
        
        //MyCubeMap Textures
        this.textureC1 = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
        this.textureC2 = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        this.textureC3 = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.textureC4 = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.textureC5 = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.textureC6 = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.cubeTextures = [this.textureC1, this.textureC2, this.textureC3, this.textureC4, this.textureC5, this.textureC6];

        //sphere texture
        this.globe = new CGFtexture(this, 'images/earth.jpg');
        
        //fish texture
        this.fishTexture = new CGFtexture(this, 'images/fishScales.png');

        //pillar texture
        this.pillarTexture = new CGFtexture(this, 'images/pillarAlgae.jpg')

        //Sea Floor appearance and textures
        this.seaAppearance = new CGFappearance(this);
		this.seaAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.seaAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.seaAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.seaAppearance.setShininess(120);

        this.sandTexture = new CGFtexture(this, "images/sand.png");
        this.sandBumpMap = new CGFtexture(this, "images/sandMap.png");

        this.seaAppearance.setTexture(this.sandTexture);
		this.seaAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sandShader = new CGFshader(this.gl, "shaders/seaFloor.vert", "shaders/seaFloor.frag");
        this.sandShader.setUniformsValues({ uSampler2: 1, offset: 0.2});
        
        //Water appearance and textures
        this.waterAppearance = new CGFappearance(this);
		this.waterAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.waterAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.waterAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.waterAppearance.setShininess(120);
        
        this.waterTexture = new CGFtexture(this, "images/pier.jpg");
        this.waterBumpMap = new CGFtexture(this, "images/distortionmap.png");

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.fish = new MyFish(this, [1, 0, 0]);
        this.movingObject = new MyMovingObject(this);
        this.cubeMap = new MyCubeMap(this, this.cubeTextures);
        this.cylinder = new MyCylinder(this, 8);
        this.seaFloor = new MyPlane(this, 20, 0, 1, 0);
        this.waterSurface = new MyPlane(this, 20, 0, 1, 0);
        this.pillar = new MyPillar(this, 200);
        this.pebble = new MyRockSet(this);
        this.algae = new MyAlgae(this);
        this.animatedFishes = new MyAnimatedFish(this, [0, 0, 0], 10);

        this.waterAppearance.setTexture(this.waterTexture);
		this.waterAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.waterShader = new CGFshader(this.gl, "shaders/water.vert", "shaders/water.frag");
        this.waterShader.setUniformsValues({ uSampler2: 2, timeFactor: 0});

        //sphere appearance and texture
        this.globe = new CGFtexture(this, 'images/earth.jpg');

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.setTexture(this.globe);


        //fish appearance and texture
        this.fishTexture = new CGFtexture(this, 'images/fishScales.png');

        this.fishAppearance = new CGFappearance(this);
		this.fishAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.fishAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.fishAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.fishAppearance.setShininess(120);
        this.fishAppearance.setTexture(this.fishTexture);

        this.pillarAppearance = new CGFappearance(this);
        this.pillarAppearance.setAmbient(0.4, 0.4, 0.3, 1);
		this.pillarAppearance.setDiffuse(0.7, 0.8, 0.7, 1);
		this.pillarAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.pillarAppearance.setShininess(120);
        this.pillarAppearance.setTexture(this.pillarTexture);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMovingObject = false;
        this.displayFish = true;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.objectComplexity = 0.5;
        this.scaleFactor = 1;
        this.speedFactor = 1;

    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(this.fov, 0.1, 500, this.position, this.target);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update();
        this.fish.update();
        this.animatedFishes.update();
        this.waterShader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }

    updateObjectComplexity(){
        this.cylinder.updateBuffers(this.objectComplexity);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.setDefaultAppearance();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // Draw Sea Floor
        this.sandBumpMap.bind(1);
        this.seaAppearance.apply();
        this.setActiveShader(this.sandShader);
        this.pushMatrix();
            this.scale(50, 50, 50);
            this.rotate(-90 * deg_to_rad, 1, 0, 0);
            this.seaFloor.display();
        this.popMatrix();

        this.setActiveShader(this.defaultShader);

        // Draw WATER
        this.waterBumpMap.bind(2);
        this.waterAppearance.apply();
        this.setActiveShader(this.waterShader);
        this.pushMatrix();
            this.scale(50, 50, 50);
            this.translate(0, 0.2, 0);
            this.rotate(90 * deg_to_rad, 1, 0, 0);
            this.waterSurface.display();
        this.popMatrix();

        this.setActiveShader(this.defaultShader);
        this.setDefaultAppearance();

        // Draw CubeMap
        this.pushMatrix();
            this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
            this.cubeMap.display();
        this.popMatrix();

        // Draw Fish
        if (this.displayFish) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.fishAppearance.apply();
            this.fish.display();
            this.popMatrix();
        }

        //Draw Moving Object
        if (this.displayMovingObject) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }

        //Draw Sphere
        if (this.displaySphere) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.sphereAppearance.apply();
            //This sphere does not have defined texture coordinates
            this.incompleteSphere.display();
            this.popMatrix();
        }

        //Draw Cylinder
        if (this.displayCylinder) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.cylinder.display();
            this.popMatrix();
        }

        //pillars
        this.pushMatrix();
        this.translate(5, -5, 10);
        this.scale(1, 30, 1);
        this.pillarAppearance.apply();
        this.pillar.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(5, -15, -10);
        this.scale(1, 30, 1);
        this.pillarAppearance.apply();
        this.pillar.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20, -5, 20);
        this.scale(1, 30, 1);
        this.pillarAppearance.apply();
        this.pillar.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20, -5, -20);
        this.scale(1, 30, 1);
        this.pillarAppearance.apply();
        this.pillar.display();
        this.popMatrix();

        //pebbles
        for (let index = 0; index < 5; index++) {
            this.pushMatrix();
            this.translate(index * 20 - 32, 100, index * 20 - 24);
            this.scale(10, 10, 10);
            this.pebble.display();
            this.popMatrix();
        }

        //algae
        for (let index = 0; index < 10; index++) {
            this.pushMatrix();
            this.translate(index * 20, 50, index * 30 - 10);
            this.scale(5, 5, 5);
            this.algae.display();
            this.popMatrix();
        }


        

        //animated fishes
        this.pushMatrix();
        this.animatedFishes.display();
        this.popMatrix();



    
    }
}