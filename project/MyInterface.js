import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys() {
        // create reference from screen to the GUI
        this.scene.gui = this;
        // disable the process Keyboard function
        this.processKeyboard = function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };


isKeyPressed(keyCode) {
  if( (this.activeKeys[keyCode] === true) && (keyCode == "keyL" || keyCode == "keyP")) {
    this.activeKeys[keyCode] = false;
    return true;
    }  
    return this.activeKeys[keyCode] || false;
}


    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayFish').name('Display Fish');
        this.gui.add(this.scene, 'displayMovingObject').name('Display Moving Object');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayCylinder').name('Display Cylinder');

        //Sliders
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name("Speed");
        this.gui.add(this.scene, 'objectComplexity', 0.01, 1.0).onChange(this.scene.updateObjectComplexity.bind(this.scene)).name('Cylinder slides');
        
        
        
        this.initKeys();
        return true;
    }
}