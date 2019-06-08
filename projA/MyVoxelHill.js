/**
 * MyVoxelHill
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVoxelHill extends CGFobject {
    constructor(scene, stacks) 
    {
        super(scene);
        this.stacks = stacks;
        this.trees = [];
        this.ucq = new MyUnitCubeQuad(this.scene);
        this.createTrees();
    }

    createTrees(){
        for(var i = 0; i < 20; i++){
            var treeTopRadius = Math.random()*0.8 + 0.5;
            var trunkRadius = treeTopRadius/2;
            var treeTopHeight = Math.random()*0.9 + 1;
            var trunkHeight = treeTopHeight/2;
            
            this.tree = new MyTree(this.scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius);
            this.trees.push(this.tree);

        }
}

    display()
    {
        
        for(var i = 0; i < this.stacks; i++)
        {
            var num = 2*i + 1;
    
            for(var j = 0; j < num; j++)
            {
                this.scene.pushMatrix();
                this.scene.translate(-i+ j,this.stacks-i,-i);
                this.ucq.display();

                //Create trees once every 4 blocks
                if((i*j)%4 == 0){
                this.scene.translate(0, 0.5, 0);
                //create pseudorandom tree
                this.trees[(i+j)%20].display();
                }

                this.scene.popMatrix();
            }

            for(var j = 0; j < num; j++)
            {
                this.scene.pushMatrix();
                this.scene.translate(-i,this.stacks-i,-i + j);
                this.ucq.display();

                if((i+j)%4 == 0){
                this.scene.translate(0, 0.5, 0);
                this.trees[(i*j)%20].display();
                }

                this.scene.popMatrix();
    
                this.scene.pushMatrix();
                this.scene.translate(i,this.stacks-i,-i + j);
                this.ucq.display();

                if((i+j)%4 == 0){
                    this.scene.translate(0, 0.5, 0);
                    this.trees[(i*j)%20].display();
                    }
                this.scene.popMatrix();
            }
    
            for(var j = 0; j < num; j++)
            {
                this.scene.pushMatrix();
                this.scene.translate(-i+ j,this.stacks-i,i);
                this.ucq.display();

                if((i+j)%4 == 0){
                    this.scene.translate(0, 0.5, 0);
                    this.trees[(i*j)%20].display();
                    }   
                this.scene.popMatrix();
            }
    
        }    
    }
}