/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTreeRowPatch extends CGFobject
{
    constructor(scene, nrTrees)
        {
            super(scene);
            this.scene = scene;
            this.nrTrees = nrTrees;
            this.trees = [];
            this.zDisplacments = [];
            this.xDisplacments = [];
            this.createTrees();

        }
        display()
        {
            for(var i = 0; i < this.nrTrees; i++){   

                this.scene.pushMatrix();
                this.scene.translate(this.xDisplacments[i],0,this.zDisplacments[i]);
                this.trees[i].display();
                this.scene.popMatrix();
                }
        }

        createTrees(){
            for(var i = 0; i < this.nrTrees; i++){

                if(i == 0){
                    this.xDisplacments.push((Math.random() * 1));
                    this.zDisplacments.push(Math.random() * 0.5);
                }

                else{
                this.xDisplacments.push((Math.random()) + 1 + this.xDisplacments[i-1]);
                this.zDisplacments.push(Math.random() * 0.5);
                }

                var treeTopRadius = Math.random()*0.8 + 0.5;

                var trunkRadius = treeTopRadius/2;

                var treeTopHeight = Math.random()*0.9 + 1;

                var trunkHeight = treeTopHeight/2;
                
                this.tree = new MyTree(this.scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius);
                
                
                this.trees.push(this.tree);

            } 
        }

        enableNormalViz()
        {
            this.Tree.enableNormalViz();
        }

        disableNormalViz()
        {
            this.Tree.disableNormalViz();
        }
}