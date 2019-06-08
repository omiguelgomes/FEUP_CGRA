/**
 * MyFireplace
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyFireplace extends CGFobject
{
    constructor(scene)
    {
        super(scene);
        this.scene = scene;

        this.logs = [];

        for (var i = 0; i < 3; i++)
        {
            this.logs.push(new MyCylinder(this.scene, 10, 2 , 0.3));
        }

        this.fire = new MyCone(this.scene, 10, 1, 1);

        this.scene.trunk = new CGFappearance(this.scene);
        this.scene.trunk.setAmbient(1, 1, 1, 1);
        this.scene.trunk.setDiffuse(1, 1, 1, 1);
        this.scene.trunk.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.trunk.setShininess(10.0);
        this.scene.trunk.loadTexture('tree_tex.png');

        this.scene.flames = new CGFappearance(this.scene);
        this.scene.flames.setAmbient(1, 1, 1, 1);
        this.scene.flames.setDiffuse(0.1, 0.1, 0.1, 0.1);
        this.scene.flames.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.flames.setShininess(10.0);
        this.scene.flames.loadTexture('fire_tex.png');
    }

    display()
    {   
        this.scene.pushMatrix();
        this.scene.translate(5, 0, 0);
        for (var i = 0; i < 3; i++)
        {
            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2,1,0,0);
            this.scene.translate(0,-1,0);
            this.scene.translate(2*i*0.3, 0, 0);
            this.scene.trunk.apply();
            this.logs[i].display();
            this.scene.popMatrix();
        }


        this.scene.pushMatrix();
        this.scene.translate(2*0.3, 2*0.3 - 0.1 , 0);
        this.scene.flames.apply();
        this.fire.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }
}