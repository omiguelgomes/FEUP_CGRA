/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
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
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this);
        this.cubeMap = new MyCubeMap(this);
        this.hillGroup = new MyHillGroup(this);
        this.fireplace = new MyFireplace(this);
        this.treeGroup = new MyTreeGroupPatch(this, 3, 3);
        this.treeRow = new MyTreeRowPatch(this, 5);

        this.lightMode = {'Day': 0, 'Night': 1};

        //Objects connected to MyInterface
        this.displayCubeMap = true;
        this.displayHouse = true;
        this.displayHillGroup = true;
        this.displayFireplace = true;
        this.displayTextures = true;
        this.displayTreeGroup = true;
        this.displayTreeRow = true;
        this.selectedMode = 0;
    }
    initLights() {
        //luz solar
        this.lights[0].setPosition(10, 50, 1, 1);
        this.lights[0].setDiffuse(0.8, 0.7, 0.1, 1);
        this.lights[0].setSpecular(0.8, 0.7, 0.1, 1)
        this.lights[0].setConstantAttenuation(0.3);
        this.lights[0].update();

        //luz lunar
        this.lights[1].setPosition(10, 50, 1, 1);
        this.lights[1].setDiffuse(0.02, 0.16, 0.53, 1);
        this.lights[1].setSpecular(0.02, 0.16, 0.53, 1)
        this.lights[1].setConstantAttenuation(0.5);
        this.lights[1].update();

        //luz fogueira
        this.lights[2].setPosition(5, 0.5, 0, 1);
        this.lights[2].setDiffuse(0.91, 0.27, 0.05, 1);
        this.lights[2].setConstantAttenuation(1);
        this.lights[2].setLinearAttenuation(1);
        this.lights[2].setQuadraticAttenuation(1);
        this.lights[2].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(20, 50, 20), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.1, 0.2, 0.4, 1.0);
        this.setDiffuse(0.1, 0.2, 0.4, 1.0);
        this.setSpecular(0.1, 0.2, 0.4, 1.0);
        this.setShininess(10.0);
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
        this.setGlobalAmbientLight(0.5,0.5,0.5, 0.5);

        if(this.selectedMode == 0)
        {
            this.lights[1].disable();
            this.lights[1].update();
            this.lights[2].disable();
            this.lights[1].update();

            this.lights[0].enable();
            this.lights[0].update();

        } else
        {
            this.lights[0].disable();
            this.lights[0].update();

            this.lights[1].enable();
            this.lights[1].update();
            this.lights[2].enable();
            this.lights[2].update();
        }

        // Draw axis
        //this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.enableTextures(this.displayTextures);

        if(this.displayCubeMap)
            this.cubeMap.display();

        if(this.displayHouse)
            this.house.display();

        if(this.displayHillGroup)
            this.hillGroup.display();
        
        if(this.displayFireplace)
            this.fireplace.display();

        if(this.displayTreeGroup)
            this.treeGroup.display();

        if(this.displayTreeRow)
            this.pushMatrix();
            this.translate(-5, 0, 10);
            this.scale(3, 3, 3);
            this.treeRow.display();
            this.scale(1/3, 1/3, 1/3);
            this.translate(0, 0, -20);
            this.scale(3, 3, 3);
            this.treeRow.display();
            this.popMatrix();
        
        // ---- END Primitive drawing section
    }
}

    
