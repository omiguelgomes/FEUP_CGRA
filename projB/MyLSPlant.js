/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.angle = 25;
        this.iterations = 3;
        this.scaleFactor = 0.5;
        this.rotateArguments = [0, 0, 0, 1];
        this.translateArguments = [0, 0, 0];
        
        this.axiom = "X";
        this.ruleF = "FF";
        this.XRules = ["F[-X][X]F[-X]+X", "F[-X][x]+X", "F[+X]-X", "F[/X][X]F[\\X]+X",
                     "F[\X][X]/X", "F[/X]\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X"];
        this.init();
        this.doGenerate();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    }

}