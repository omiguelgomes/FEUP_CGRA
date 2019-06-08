/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
    constructor(scene) 
    {
        super(scene);

        this.body = new MyHouseBody(this.scene);
        this.roof = new MyPyramid(this.scene, 4, 4);
        this.pilar = new MyPrism(this.scene, 7, 1, 1);

        this.scene.pilarTex = new CGFappearance(this.scene);
        this.scene.pilarTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.pilarTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.pilarTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.pilarTex.setShininess(10.0);
        this.scene.pilarTex.loadTexture('marble_tex.png');

        this.scene.roofTex = new CGFappearance(this.scene);
        this.scene.roofTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.roofTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.roofTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.roofTex.setShininess(10.0);
        this.scene.roofTex.loadTexture('roof.jpg');

        this.scene.wallMaterial = new CGFappearance(this.scene);
        this.scene.wallMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.wallMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.wallMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.wallMaterial.setShininess(10.0);
        this.scene.wallMaterial.loadTexture('house_wall_tex.jpg');

    }

    display()
    {
        
        //body
        this.scene.wallMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(4, 4, 4);
        this.scene.translate(0, 0.5, 0);
        this.body.display();

        //roof
        this.scene.roofTex.apply();
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(1, 2, 1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0, 0.5, 0);
        this.roof.display(); 

        //pillars
        this.scene.pilarTex.apply();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.scale(1/4, 1/8, 1/4);
        this.scene.scale(0.7, 5, 0.7);

        this.scene.translate(2.5, 0, 2.5);
        this.pilar.display();

        this.scene.translate(0, 0, -5);
        this.pilar.display();

        this.scene.translate(-5, 0, 0);
        this.pilar.display();

        this.scene.translate(0, 0, 5);
        this.pilar.display();

        

        this.scene.popMatrix();
        
    }
}