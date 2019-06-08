/**
 * MyHillGroup
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyHillGroup extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.scene = scene;

        this.voxelHill = new MyVoxelHill(scene, 4);
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.rotate(2*Math.PI/30 , 0, 1, 0);
        for(var i = 0; i < 18; i++)
        {    
        this.scene.rotate(2*Math.PI/20 , 0, 1, 0);
        this.scene.translate(25, 0, 0);
        this.voxelHill.display();
        this.scene.translate(-25, 0, 0);
        }
        this.scene.popMatrix();
    }
}