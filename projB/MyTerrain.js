/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
    constructor(scene) //Make terrain have a 20x20 centered square in which y = 0
    {
        super(scene);

        this.plane = new Plane(scene, 50);

        //shaders
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag", );

        //tex
        this.terrain = new CGFtexture(this.scene, "images/terrain.jpg");
        this.heightMap = new CGFtexture(this.scene, "images/heightmapFlat.jpg");

        //valores temp (testar)
        this.appearance = new CGFappearance(scene);
		this.appearance.setAmbient(0.2, 0.2, 0.2, 1);
		this.appearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(100);
        this.appearance.setTexture(this.terrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        
        this.shader.setUniformsValues({ uSampler1: 1 });
		this.shader.setUniformsValues({ uSampler2: 2 });
    }

    display()
    {
        this.appearance.apply();
        
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();

        this.terrain.bind(1);
        this.heightMap.bind(2);

        this.appearance.setTexture(this.terrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);
        
        this.scene.pushMatrix();
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}