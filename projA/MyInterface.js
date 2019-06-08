/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        this.gui.add(this.scene, 'displayCubeMap').name("Display cube map");
        this.gui.add(this.scene, 'displayHouse').name("Display house");
        this.gui.add(this.scene, 'displayHillGroup').name("Display hill group");
        this.gui.add(this.scene, 'displayFireplace').name("Display fireplace");
        this.gui.add(this.scene, 'displayTextures').name("Display textures");
        this.gui.add(this.scene, 'selectedMode', this.scene.lightMode).name("Light Mode").onChange(this.scene.display());
        this.gui.add(this.scene, 'displayTreeGroup').name("Display Tree Group");
        
        
        var obj = this;

        return true;
    }
}