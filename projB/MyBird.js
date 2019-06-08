/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
    constructor(scene, isKiwi) 
    {
        super(scene);

        this.head = new MySphere(this.scene, 0.7, 10, 10);
        this.body = new MySphere(this.scene, 0.7, 10, 10);
        this.neck = new MyCylinder(this.scene, 5, 0.7, 0.2);
        this.beak = new MyCone(this.scene, 10, 0.6, 0.2);
        this.eyes = new MySphere(this.scene, 0.2, 10, 10);
        this.legs = new MyLeg(this.scene, 4);
        this.wing = new MyWing(this.scene);

        this.branches = [];
        this.branchesXCoord = [];
        this.branchesYCoord = [];
        this.branchesZCoord = [];

        this.orientation = 0; //degrees in relation to y axis(radians)
        this.isKiwi = isKiwi;
        this.ascending = true; //boolean for oscilation animation
        this.wingAngle = Math.PI/4; //angle for wing flapping

        //Branch catch vars
        this.tryingToCatch = false;
        this.descTryingToCatch = false; //descending when trying to catch branch
        this.hasBranch = false;
        this.droppingBranch = false;
        this.branchCaught = -1;

        this.createBranches();

        //Initial pos
        this.initialX = 2;
        this.initialY = 6;
        this.initialZ = 0;

        this.x = this.initialX;
        this.y = this.initialY;
        this.z = this.initialZ;


        //Textures
        this.scene.birdBodyTex = new CGFappearance(this.scene);
        this.scene.birdBodyTex.loadTexture('images/featherTexture.jpg');

        this.scene.birdLegTex = new CGFappearance(this.scene);
        this.scene.birdLegTex.loadTexture('images/birdLegTex.jpg');

        this.scene.birdHeadTex = new CGFappearance(this.scene);
        this.scene.birdHeadTex.loadTexture('images/birdHeadTex.jpg');
        
        this.scene.birdBeakTex = new CGFappearance(this.scene);
        this.scene.birdBeakTex.loadTexture('images/birdBeakTex.jpg');

        this.scene.birdWingTex = new CGFappearance(this.scene);
        this.scene.birdWingTex.loadTexture('images/birdWingTex.jpg');

        this.scene.birdEyeTex = new CGFappearance(this.scene);
        this.scene.birdEyeTex.loadTexture('images/birdEyeTex.jpg');

        this.scene.kiwiTex = new CGFappearance(this.scene);
        this.scene.kiwiTex.loadTexture('images/kiwiTex.jpg');

        this.scene.kiwiSkinTex = new CGFappearance(this.scene);
        this.scene.kiwiSkinTex.loadTexture('images/kiwiSkinTex.jpg');
        
    }

    display()   
    {

        if(this.isKiwi){
            this.scene.birdHeadTex = this.scene.kiwiTex;
            this.scene.birdBodyTex = this.scene.kiwiTex;
        }
        
        //movement translation/rotate
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        
        
        //myScene scale
        this.scene.pushMatrix();
        this.scene.scale(0.6*this.scene.birdScaleFactor, 0.6*this.scene.birdScaleFactor, 0.6*this.scene.birdScaleFactor);


        //draw wings
        this.scene.birdWingTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5, -0.5, -1);
        this.scene.rotate(-this.wingAngle + Math.PI/3, 0, 0, 1);
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, -0.5, -1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-this.wingAngle + Math.PI/3, 0, 0, 1);
        this.wing.display();
        this.scene.popMatrix();

        //draw head
        this.scene.birdHeadTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.head.display();

        //draw beak
        this.scene.birdBeakTex.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0.5, 0);
        this.beak.display();
        this.scene.popMatrix();

        //draw eyes
        this.scene.birdEyeTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.2, 0.2);
        this.eyes.display();
        this.scene.translate(-1, 0, 0);
        this.eyes.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        //draw body
        this.scene.birdBodyTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -1, -1);
        this.scene.scale(1, 1, 1.7);
        this.body.display();
        this.scene.popMatrix();

        //draw neck
        this.scene.birdLegTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.3);
        this.neck.display();
        this.scene.popMatrix();

        //draw legs
        this.scene.birdLegTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.25, -2.1, -1.5);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();

        //draw branches
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(1, 0, 0);
        this.displayBranches();  
        this.scene.popMatrix();
       }

    
    //movement funcs
    turn(v){
        if(v > 0){
            this.orientation += Math.PI/20;
        }
        if(v <= 0){
            this.orientation -= Math.PI/20;
        }
    }

    accelerate(v)
    {
        if (v *  this.scene.birdSpeed < 0)
        {
            this.scene.birdSpeed += 5 * v;
        }
        else
        {
            this.scene.birdSpeed += v;
        }

        if (this.scene.birdSpeed > 3)
        {
            this.scene.birdSpeed = 3;
        }
    }

    //update funcs
    update()
    {
        this.updatePos();

        if(!this.tryingToCatch && !this.droppingBranch)
        {
            this.updateOsc();//oscilation
            this.updateWings();
        }

        if(this.tryingToCatch || this.droppingBranch)
        {
            this.updateCatchPos();
        }

        if(this.hasBranch)
        {
            this.updateBranch();
        }
    }

    updatePos()
    {

        if(this.staysInScene(this.x, this.scene.birdSpeed*Math.sin(this.orientation)))
        {
            this.x += this.scene.birdSpeed*Math.sin(this.orientation);
        }

        else
        {
            this.x -= this.x/Math.abs(this.x);
            this.scene.birdSpeed = 0;
        }
        
        if(this.staysInScene(this.z, this.scene.birdSpeed*Math.sin(this.orientation)))
        {
            this.z += this.scene.birdSpeed*Math.cos(this.orientation);
        }

        else
        {
            this.z -= this.z/Math.abs(this.z);
            this.scene.birdSpeed = 0;
        }
    }

    updateOsc()
    {
        if(this.ascending){
            this.y += 0.03;
            this.ascending = this.y < this.initialY + 0.3;
        }
        else{
            this.y += -0.03;
            this.ascending = this.y < this.initialY - 0.3;
        }
    }

    updateWings()
    {
        if(this.ascending){
            this.wingAngle += 0.05;
        }
        else{
            this.wingAngle -= 0.05;
        }
    }

    staysInScene(pos)
    {
        if(pos < 30 && pos > -30){//30 -> scene boundaries
            return true;
        }
        return false;
    }

    //branch related funcs
    createBranches(){
        this.branchNr = 5;

        for(var i = 0; i < this.branchNr; i++)
        {
            this.branches.push(new MyBranch(this.scene));
            this.branchesXCoord.push(Math.random()*30-15);
            this.branchesYCoord.push(0.5);
            this.branchesZCoord.push(Math.random()*-10);
        }

    }

    displayBranches(){
        for(var i = 0; i < this.branches.length; i++)
        {   
            this.scene.pushMatrix();
            this.scene.translate(this.branchesXCoord[i], this.branchesZCoord[i], -this.branchesYCoord[i]);

            if(this.branchCaught == i)
            {
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.rotate(Math.PI/2, 0, 0, 1);
                this.scene.rotate(this.orientation, 0, 0, 1);
            }
            
            this.branches[i].display();
            this.scene.popMatrix();
        }
    }

    tryToCatch()
    {
        if(!this.hasBranch)
        {
            for(var i = 0; i < this.branches.length; i++)
            {
                if(this.z - this.branchesZCoord[i] <= 3 && this.x - this.branchesXCoord[i] <= 3)
                {
                    this.branchCaught = i;
                    this.hasBranch = true;
                }
            }
        }
    }

    updateCatchPos()
    {
        if(this.descTryingToCatch && this.y > 2)
        {
            this.y -= 0.3;
        }

        if(this.descTryingToCatch && this.y <= 2)
        {
            if(!this.hasBranch)
            {
                this.descTryingToCatch = false;
                this.tryToCatch();
            }

            else
            {
                this.branchCaught = -1;
                this.droppingBranch = false;
            }
        }

        if(!this.descTryingToCatch && this.y <= this.initialY)
        {
            this.y += 0.3;
        }

        if(!this.descTryingToCatch && this.y >= this.initialY)
        {
            this.tryingToCatch = false;
            this.droppingBranch = false;
        }
    }

    updateBranch()
    {
        this.branchesXCoord[this.branchCaught] = this.x - 1;
        this.branchesYCoord[this.branchCaught] = this.y - 1;
        this.branchesZCoord[this.branchCaught] = this.z + 0;
    }

}