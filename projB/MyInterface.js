/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
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
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
        }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        //object toggles
        this.gui.add(this.scene, 'displayHouse').name("Display house");
        this.gui.add(this.scene, 'displayAxis').name("Display axis");
        this.gui.add(this.scene, 'displayCubeMap').name("Display cubeMap");
        this.gui.add(this.scene, 'displayBird').name("Display bird");
        this.gui.add(this.scene, 'displayPlantGroup').name("Display plants");
        this.gui.add(this.scene, 'birdCamera').name("Bird view");
        this.gui.add(this.scene, 'displayNest').name("Display nest");

        //slider velocidade
        this.gui.add(this.scene, 'birdSpeed', 0.1, 3.0).name("I am speed");
        this.gui.add(this.scene, 'birdScaleFactor', 1, 5.0).name("Bird scale factor");

        //slider scale bird
        
       
        var obj = this;

        this.initKeys();
        return true;
    }
        
}