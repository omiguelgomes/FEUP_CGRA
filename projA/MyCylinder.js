/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, radius = 1) 
    {
        super(scene);

        //slices = nr faces
        if (slices < 5)
            this.slices = 5;
        else if (slices > 10)
            this.slices = 10;

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
        var alphaAng = 2*Math.PI / this.slices; //angulo entre as faces do prisma

        for (var i = 0; i < this.slices; i++)
        {
            var senAng = Math.sin(ang);
            var senAng_Alpha = Math.sin(ang+alphaAng);
            var cosAng = Math.cos(ang);
            var cosAng_Alpha = Math.cos(ang+alphaAng);

            this.vertices.push(cosAng * this.radius, 0, -senAng * this.radius);
            this.texCoords.push(0,1);
            this.vertices.push(cosAng_Alpha * this.radius, 0, -senAng_Alpha * this.radius); //pontos base c/ y=0
            this.texCoords.push(1,1);

            this.vertices.push(cosAng * this.radius, this.stacks, -senAng * this.radius);
            this.texCoords.push(0,0);
            this.vertices.push(cosAng_Alpha * this.radius, this.stacks, -senAng_Alpha * this.radius); //pontos topo c/ y=1
            this.texCoords.push(1,0);

            // square normal computation
            var normal= [
                cosAng,
                0,                        
                -senAng
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

            //normal values for next face(avoid using previous angle)
            var normalNext = [
                Math.cos(ang + alphaAng),
                0,
                -Math.sin(ang + alphaAng)];

            // push normal once for each vertex of this square
            this.normals.push(...normal);
            this.normals.push(...normalNext);
            this.normals.push(...normal);
            this.normals.push(...normalNext);

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