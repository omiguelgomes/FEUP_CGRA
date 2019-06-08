/**
 * MyBackgroundCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBackgroundCube extends CGFobject {
    constructor(scene) 
    {
        super(scene);

        this.quad = new MyQuad(this.scene);

        this.scene.backgroundMaterial = new CGFappearance(this.scene);
        this.scene.backgroundMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.backgroundMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.backgroundMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.backgroundMaterial.setShininess(10.0);
        this.scene.backgroundMaterial.loadTexture('cloudTexture.png');

    }

    display()
    {
        this.scene.backgroundMaterial.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);  
        
        this.scene.pushMatrix();
        this.scene.scale(100, 100, 100);

        //frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5); 
        this.quad.display();
        this.scene.popMatrix();
    
        //tras
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        //esquerda
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        //direita
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        //cima
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0   );
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        //baixo
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}