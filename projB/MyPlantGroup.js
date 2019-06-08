/**
 * MyPlantGroup
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPlantGroup extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plants = [];
        this.groupSize = 10;
        this.createPlants();
   }
    
    createPlants(){
        for(var i = 0; i < this.groupSize; i++){
            this.plants.push(new MyLSPlant(this.scene));
        }
    }
	
    display(){

        this.scene.pushMatrix();
        this.scene.translate(-10, 0, 0);

        for(var i = 0; i < this.groupSize; i++){
            
            this.scene.translate(1, 0, -1);
            this.plants[i].display();
        }

        this.scene.popMatrix();
    }
}

