/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    constructor(scene) 
    {
        super(scene);

        this.quad = new MyQuad(this.scene);

        this.scene.frontMaterial = new CGFappearance(this.scene);
        this.scene.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.frontMaterial.setShininess(10.0);
        this.scene.frontMaterial.loadTexture('images/cloudySky.jpg');

        this.scene.backMaterial = new CGFappearance(this.scene);
        this.scene.backMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.backMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.backMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.backMaterial.setShininess(10.0);
        this.scene.backMaterial.loadTexture('images/cloudySky.jpg');

        this.scene.upMaterial = new CGFappearance(this.scene);
        this.scene.upMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.upMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.upMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.upMaterial.setShininess(10.0);
        this.scene.upMaterial.loadTexture('images/sky.jpg');

        this.scene.downMaterial = new CGFappearance(this.scene);
        this.scene.downMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.downMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.downMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.downMaterial.setShininess(10.0);
        this.scene.downMaterial.loadTexture('images/floor.jpg');

        this.scene.rightMaterial = new CGFappearance(this.scene);
        this.scene.rightMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.rightMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.rightMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.rightMaterial.setShininess(10.0);
        this.scene.rightMaterial.loadTexture('images/cloudySkyMirror.jpg');

        this.scene.leftMaterial = new CGFappearance(this.scene);
        this.scene.leftMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.leftMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.leftMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.leftMaterial.setShininess(10.0);
        this.scene.leftMaterial.loadTexture('images/cloudySkyMirror.jpg');

    }

    display()
    {
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);  
        
        //fazer o cubo grande, com a base em y=0
        this.scene.pushMatrix();
        this.scene.scale(60, 60, 60);
        this.scene.translate(0, 0.5, 0);

        //tras
        this.scene.backMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5); 
        this.quad.display();
        this.scene.popMatrix();
    
        //frente
        this.scene.frontMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        //direita
        this.scene.rightMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        //esquerda
        this.scene.leftMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        //cima
        this.scene.upMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}