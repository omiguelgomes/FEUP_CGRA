/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTree extends CGFobject
{
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius)
        {
            super(scene);

            this.trunkHeight = trunkHeight;
            this.trunkRadius = trunkRadius;
            this.treeTopHeight = treeTopHeight;
            this.treeTopRadius = treeTopRadius;

            this.cylinder = new MyCylinder(this.scene, 10, this.trunkHeight, this.trunkRadius);
            this.cone = new MyCone(this.scene, 10, this.treeTopHeight, this.treeTopRadius);

            this.scene.trunk = new CGFappearance(this.scene);
            this.scene.trunk.setAmbient(1, 1, 1, 1);
            this.scene.trunk.setDiffuse(1, 1, 1, 1);
            this.scene.trunk.setSpecular(0.1, 0.1, 0.1, 1);
            this.scene.trunk.setShininess(10.0);
            this.scene.trunk.loadTexture('tree_tex.png');

            this.scene.leaves = new CGFappearance(this.scene);
            this.scene.leaves.setAmbient(1, 1, 1, 1);
            this.scene.leaves.setDiffuse(1, 1, 1, 1);
            this.scene.leaves.setSpecular(0.1, 0.1, 0.1, 1);
            this.scene.leaves.setShininess(10.0);
            this.scene.leaves.loadTexture('leaves_tex.png');
        }

        display()
        {
            this.scene.pushMatrix();
            this.scene.translate(0,this.trunkHeight,0);
            this.scene.leaves.apply();
            this.cone.display();
            this.scene.popMatrix();

            this.scene.trunk.apply();
            this.cylinder.display();
        }

        //tem que se ter normais para os objs compostos?
        enableNormalViz()
        {
            this.cone.enableNormalViz();
            this.cylinder.enableNormalViz();
        }

        disableNormalViz()
        {
            this.cone.disableNormalViz();
            this.cylinder.disableNormalViz();
        }
}