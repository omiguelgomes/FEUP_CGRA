/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);
        this.triangle = new MyPrism(this.scene,5);
        
        this.Material = new CGFappearance(this.scene);
        
        this.Material.setAmbient(34/255, 139/255, 34/255, 1);
        this.Material.setDiffuse(34/255, 139/255, 34/255, 1);
        this.Material.setSpecular(34/255, 139/255, 34/255, 1);
        this.Material.setShininess(10.0);
	}
	
    display()
    {
        this.Material.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5);
        this.triangle.display();   
        this.scene.popMatrix();
    }

}

