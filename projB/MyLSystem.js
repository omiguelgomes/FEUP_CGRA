/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSystem extends CGFobject {
	constructor(scene) {
        super(scene);
        this.depth = 0;
        this.scene.lightningTex = new CGFappearance(this.scene);
        this.scene.lightningTex.loadTexture('images/lightningTexture.jfif');
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar()
    }

    // cria o lexico da gramática
    

    doGenerate () {
        this.generate(
            this.axiom,
            {
                 "F": [ this.ruleF ],
                 "X": this.XRules
            },
            this.angle,
            this.iterations,
            this.scaleFactor
        );
    }


    // gera o sistema L com os par�metros atuais da cena
    generate(_axiom, _productions, _angle, _iterations, _scale){
        // copia o axioma da cena para iniciar a sequência de desenvolvimento
        this.axiom = _axiom;

        // cria as producoes
        this.productions=_productions;

        // angulo de rotacao
        this.angle = _angle * Math.PI / 180.0;

        // numero de iteracoes
        this.iterations = _iterations;

        // escalamento dos elementos dependente do numero de iteracoes
        this.scale = Math.pow(_scale, this.iterations-1);

        this.iterate();
     }

  
    // desenvolve o axioma ao longo de uma sequência de desenvolvimento com um determinado número de iterações
    iterate(){
        var i, j;
        for (i=0; i < this.iterations; i++){
            var newString = "";

            // substitui cada um dos caracteres da cadeia de caracteres de acordo com as produções
            for (j=0; j<this.axiom.length; ++j){
                var axiomProductions=this.productions[this.axiom[j]];
                // aplicar producoes
                if (axiomProductions === undefined){
                    // caso nao se aplique nenhuma producao deixa estar o caracter original
                    newString += this.axiom[j];
                }else if (axiomProductions.length == 1) {
                    // caso apenas exista uma producao, aplica-a
                    newString += axiomProductions[0];
                } else {
                    // sistema estocastico - varias producoes sao aplicaveis - seleciona aleatoriamente
                    newString += axiomProductions[Math.floor(Math.random() * axiomProductions.length)];                    
                }
            }    
            this.axiom = newString;
        }
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.translateArguments[0], this.translateArguments[1], this.translateArguments[2]);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.rotate(this.rotateArguments[0], this.rotateArguments[1], this.rotateArguments[2], this.rotateArguments[0]);
        this.scene.lightningTex.apply();

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; ++i){

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
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}