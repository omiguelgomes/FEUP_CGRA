/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeg extends CGFobject {
    constructor(scene, fingerCount) 
    {
        super(scene);
        this.foot = new MyCylinder(this.scene, 10, 0.8, 0.1);
        this.finger = new MyCylinder(this.scene, 10, 0.2, 0.05);
        this.fingerCount = fingerCount;
    }
    display(){

        //draw feet
        this.foot.display();
        this.displayFingers();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.foot.display();
        this.displayFingers();
        this.scene.popMatrix();


    }

    displayFingers(){
        //draw fingers
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0.1, -0.05);
        this.scene.rotate(-Math.PI/1.6, 0, 0, 1);

        for(var i = 1; i <= this.fingerCount; i++)
        {
        this.scene.rotate(Math.PI/this.fingerCount, 0, 0, 1);
        this.finger.display();
        }

        this.scene.popMatrix();
    }

       
}