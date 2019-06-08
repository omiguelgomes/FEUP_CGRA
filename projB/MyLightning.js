/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);

        this.angle = 25;
        this.iterations = 3;
        this.scaleFactor = 1;//temp para teste, deve ser 0.5
        this.rotateArguments = [5/6*Math.PI, 0, 0,1];
        this.translateArguments = [-5, 35, -29];
        this.duration = 1000; //ms

        this.axiom = "X";
        this.ruleF = "FF";
        this.XRules = ["F[-X][X]F[-X]+FX", "F[+X][-F]X[+X][-FX]", "-F[X-][X]FF[-X]+XF"];//adicionar mais regras

        this.initGrammar();
        this.doGenerate();
        this.startAnimation();

        this.timePerIteration = this.duration/this.axiom.length;

    }

    initGrammar(){
        this.grammar = {
            "F": new MyRectangle(this.scene, 0.2, 1),
            "X": new MyRectangle(this.scene, 0.2, 1)
        };
    }

    update(){
        this.currentDate = new Date();
        this.currentTime = this.currentDate.getTime();
        this.elapsedTime = this.currentTime - this.startTime;
        
        if(this.depth < this.axiom.length){
        this.depth = Math.ceil(this.elapsedTime/this.timePerIteration);            
        }
        else{
            this.depth = this.axiom.length;
            this.scene.displayLSLightning = false;
        }
    }

    startAnimation(){
        this.startDate = new Date();
        this.startTime = this.startDate.getTime();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.translateArguments[0], this.translateArguments[1], this.translateArguments[2]);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.rotate(this.rotateArguments[0], this.rotateArguments[1], this.rotateArguments[2], this.rotateArguments[0]);
        this.scene.lightningTex.apply();

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; i++){

            // verifica se sao caracteres especiais
            switch(this.axiom[i].charCodeAt(0)){
                case 43:
                    // roda a esquerda, z (+)
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;
                    
                case 45:
                    // roda a direita, z (-)
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case 92:
                    // roda a esquerda, x (\)
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case 47:
                    // roda a esquerda, x (/)
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case 94:
                    // roda a esquerda, y (^)
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case 38:
                    // roda a esquerda, y (&)
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;
                
                case 91:
                    // push ([)
                    this.scene.pushMatrix();
                    break;

                case 93:
                    // pop (])
                    this.scene.popMatrix();
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];
                    
                    if ( primitive )
                    {
                        if(i < this.depth) //only displays up untill depth
                        {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                        }
                    }
                    break;
            }
        }
        this.scene.popMatrix(); 
        this.update();
    }
}