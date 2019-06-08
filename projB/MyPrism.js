/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPrism extends CGFobject {
    constructor(scene, slices, stacks = 1, radius = 1) 
    {
        super(scene);

        //slices = nr faces
        this.slices = slices;

        //stacks = nr de objetos na vertical
        this.stacks = stacks;
        this.radius = radius;
		this.initBuffers();
	}
    initBuffers()
     {
         //-----declaracao-----
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        var ang = 0;
        var alphaAng = 2*Math.PI / this.slices; //angulo entre as faces do prism

        for (var i = 0; i < this.slices; i++)
        {
            var senAng = Math.sin(ang);
            var senAng_Alpha = Math.sin(ang+alphaAng);
            var cosAng = Math.cos(ang);
            var cosAng_Alpha = Math.cos(ang+alphaAng);

            this.vertices.push(cosAng * this.radius, 0, -senAng * this.radius);
            this.texCoords.push(0, 1);
            this.vertices.push(cosAng_Alpha * this.radius, 0, -senAng_Alpha * this.radius); //pontos base c/ y=0
            this.texCoords.push(1, 1);

            this.vertices.push(cosAng * this.radius, this.stacks, -senAng * this.radius);
            this.texCoords.push(0, 0);
            this.vertices.push(cosAng_Alpha * this.radius, this.stacks, -senAng_Alpha * this.radius); //pontos topo c/ y=1
            this.texCoords.push(1, 0);

            // square normal computation
            var normal= [
                senAng_Alpha-senAng,
                0,                        
                cosAng_Alpha-cosAng
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );

            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(4*i, (4*i+1) , (4*i + 3) );
            this.indices.push(4*i, (4*i + 3) , (4*i + 2));

            ang += alphaAng;  
        }
        
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    display()
    {
        super.display();
    }
    
    updateBuffers(complexity)
    {
        this.slices = 5 + Math.round(5 * complexity); //complexity varies 0-1, so slices varies 0-10

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
