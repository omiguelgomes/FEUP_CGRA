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
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyTerrain(this);
        this.cubeMap = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.plantGroup = new MyPlantGroup(this);
        this.bird = new MyBird(this, false);
        this.nest = new MyNest(this);

        //bool toggle objects
        this.displayAxis = true;
        this.displayHouse = true;
        this.displayPlane = false;
        this.displayCubeMap = true;
        this.displayBird = true;
        this.displayLSLightning = false;
        this.displayPlantGroup = true;
        this.displayNest = true; //must start as true

        //Objects connected to MyInterface
        this.birdSpeed = 0.1;
        this.birdScaleFactor = 1;
        this.birdCamera = false;
        this.defaultCamera = this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 20, -20), vec3.fromValues(0, 0, 0));
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = this.defaultCamera;
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    update()
    {
        this.checkKeys();
        this.bird.update();
    }
    
    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW"))
         {
            this.bird.accelerate(0.01);
            }

        if (this.gui.isKeyPressed("KeyS"))
         {
            this.bird.accelerate(-0.01);
            }

        if (this.gui.isKeyPressed("KeyA")) 
        {
            this.bird.turn(1);
            }

        if (this.gui.isKeyPressed("KeyD"))
         {
            this.bird.turn(-1);
            }

        if(this.gui.isKeyPressed("KeyR"))
        {
            this.bird.x = this.bird.initialX;
            this.bird.y = this.bird.initialY;
            this.bird.z = this.bird.initialZ;
            this.bird.orientation = 0;
            this.birdSpeed = 0;
        }

        if(this.gui.isKeyPressed("KeyL"))
        {
            this.lSLightning = new MyLightning(this);
            this.displayLSLightning = true;
        }

        if(this.gui.isKeyPressed("KeyK"))
        {
            this.bird.isKiwi = true;
        }

        if(this.gui.isKeyPressed("KeyP"))
        {
            if(this.bird.hasBranch)
            {
                this.bird.droppingBranch;
            }
            this.bird.tryingToCatch = true;
            this.bird.descTryingToCatch = true;
        }

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

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN object drawing section
        this.plane.display();

        this.top = new MyCylinderBase(this, 10, 2);
        this.pushMatrix();
        this.rotate(Math.PI/2, 1, 0, 0);
        this.top.display();
        this.popMatrix();

        if(this.displayPlane)
        {
            this.pushMatrix();
            this.rotate(-0.5*Math.PI, 1, 0, 0);
            this.scale(60, 60, 1);
            this.plane.display();
            this.popMatrix();
        }

        if(this.displayHouse)
        {
            this.pushMatrix();
            this.translate(10,0.1,-5);
            this.scale(0.5, 0.5, 0.5);
            this.house.display();
            this.popMatrix();
        }

        if(this.birdCamera)
        {
            this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(this.bird.x, this.bird.y - 2, this.bird.z), 
            vec3.fromValues(this.bird.x + Math.sin(this.bird.orientation), this.bird.y - 2, this.bird.z + Math.cos(this.bird.orientation)));
        }

        if(!this.birdCamera)
        {
            this.camera = this.defaultCamera;
        }

        if(this.displayAxis)
        {
            this.axis.display();
        }

        if(this.displayCubeMap)
        {
            this.cubeMap.display();
        }

        if(this.displayBird)
        {
            this.bird.display();
        }

        if(this.displayPlantGroup)
        {
            this.plantGroup.display(); 
        }

        if(this.displayNest)
        {
            this.pushMatrix();
            this.scale(0.5, 0.5, 0.5);
            this.nest.display();
            this.popMatrix();
        }

        if(this.displayLSLightning)
        {
            this.lSLightning.display();
        }
        // ---- END Primitive drawing section
    }
}