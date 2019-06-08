/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices, stacks = 1, radius = 1) {
        super(scene);

        if (slices < 5)
            this.slices = 5;
        else if (slices > 10)
            this.slices = 10;

        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++)
        {
            this.vertices.push(Math.cos(ang) * this.radius, 0, -Math.sin(ang) * this.radius);

            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            
            this.texCoords.push(0.5 + Math.cos(ang) * 0.5, 0.5-Math.sin(ang) * 0.5);
            
            ang+=alphaAng;
        }

        //pico do cone
        this.vertices.push(0,this.stacks, 0);
        this.normals.push(0,this.stacks,0);
        this.texCoords.push(0.5,0.5);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display()
    {
        super.display();
    }
    
    updateBuffers(complexity){
        this.slices = 5 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


