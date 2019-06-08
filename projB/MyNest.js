/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyNest extends CGFobject {
	constructor(scene) {
		super(scene);
        this.complexity = 30;
        this.radius = 0.5;
        this.branches = [];
        this.eggs = [];

        this.egg =  new MySphere(this.scene, 0.4, 10, 10);
        
        this.MaterialTrunk = new CGFappearance(this.scene);
        this.MaterialTrunk.loadTexture("images/treeTex.jpg");

        this.eggTex = new CGFappearance(this.scene);
        this.eggTex.loadTexture("images/eggTex.jpg");

        this.createObjects();
	}
	
    display()
    {
        this.MaterialTrunk.apply();
        this.scene.pushMatrix();

        for(var i = 0; i < this.complexity; i++)
        {  
            this.scene.rotate(2*Math.PI/this.complexity, 0, 1, 0);
            this.scene.translate(this.radius, 0, 0);
            
            this.drawBranch(i, -1);
            this.drawBranch(i, 1);

            this.scene.translate(-this.radius, 0, 0);
        }
        this.scene.popMatrix();

        this.displayEggs();  
    }

    createObjects()
    {
        for(var i = 1; i <= this.complexity; i++)//trunks
        {
            this.branches.push(new MyCylinder(this.scene, 8, 2, 0.1));
        }

        for(var i = 0; i <= 5; i++)//eggs
        {
            this.eggs.push(new MySphere(this.scene, 0.4, 10, 10));
        }
    }

    drawBranch(i, orientation){
        this.scene.pushMatrix();
        this.scene.rotate(orientation*Math.PI/3, 1, 0, 0);
        this.branches[i].display();
        this.scene.popMatrix();
    }

    displayEggs()
    {
        this.eggTex.apply(); 
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 0);

        for(var i = 0; i <= 5; i++)
        {
            this.scene.rotate(2*Math.PI/5, 0, 1, 0);
            this.scene.translate(0.5, 0, 0);
            this.eggs[i].display();
            this.scene.translate(-0.5, 0, 0);
        }

        this.scene.popMatrix();
    }

}

