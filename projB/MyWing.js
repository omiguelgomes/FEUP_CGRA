/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWing extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.anterior = new MySphere(this.scene, 0.5, 10, 10);
        this.posterior = new MySphere(this.scene, 0.4, 10, 10);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 0.6);
        this.anterior.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/3, 0, 0, 1);
        this.scene.scale(1.2, 0.2, 0.6);
        this.scene.translate(0.3, 1.5, 0);
        
        this.posterior.display();
        this.scene.popMatrix();
    }       
}