/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) 
    {
        super(scene);

        this.quad = new MyQuad(this.scene);

        this.scene.topMaterial = new CGFappearance(this.scene);
        this.scene.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.topMaterial.setShininess(10.0);
        this.scene.topMaterial.loadTexture('mineTop.png');

        this.scene.botMaterial = new CGFappearance(this.scene);
        this.scene.botMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.botMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.botMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.botMaterial.setShininess(10.0);
        this.scene.botMaterial.loadTexture('mineBottom.png');

        this.scene.sidesMaterial = new CGFappearance(this.scene);
        this.scene.sidesMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.sidesMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.sidesMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.sidesMaterial.setShininess(10.0);
        this.scene.sidesMaterial.loadTexture('mineSide.png');
    }

    display()
    {
        this.scene.sidesMaterial.apply();
        
        //frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5); 
        this.quad.display();
        this.scene.popMatrix();
    
        //tras
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //esquerda
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        //direita
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //cima
        this.scene.topMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //baixo
        this.scene.botMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}