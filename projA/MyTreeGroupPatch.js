/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTreeGroupPatch extends CGFobject
{
    constructor(scene, nRow, nCol)
    {
        super(scene);
        this.scene = scene;

        this.nRow = nRow;
        this.nCol = nCol;
        this.rows = [];

        for (var i = 0; i < this.nRow; i++)
        {
            this.rows.push(new MyTreeRowPatch(scene, nCol));
        }
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(-20, 0, -8);
        this.scene.scale(3, 3, 3);
        for (var i = 0; i < this.nRow; i++)
        {
            this.scene.pushMatrix();
            this.scene.translate(0,0, 2*i);
            this.rows[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}