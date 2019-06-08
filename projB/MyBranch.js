/**
 * MyBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBranch extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cylinder = new MyCylinder(this.scene, 8, 2, 0.4);
        
        this.MaterialTrunk = new CGFappearance(this.scene);
        this.MaterialTrunk.loadTexture("images/treeTex.jpg");
	}
	
    display()
    {
        this.MaterialTrunk.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.4, 1, 0.4);
        this.cylinder.display();   
        this.scene.popMatrix();
    }

}

