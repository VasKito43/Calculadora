import { Controle, Cpu, Digito, Operação, Sinal, Teclado, Tela } from "./calculadora";
import TelaA3 from "./telaA3";
import Decimal from 'decimal.js';

export default class CpuA3 implements Cpu {
    private tela: Tela | undefined;
    private digitos: Digito[] = [];
    private numeros: Decimal[] = [];
    private memoria: Decimal = new Decimal(0);
    private controles: Controle[] | undefined[] = [undefined, undefined];
    private operacao: Operação[] | undefined[] = [undefined, undefined];
    private separadorDecimal: boolean = false;
    private memoriaAtivada: boolean = false;

    constructor(tela: Tela) {
        this.definaTela(tela);
    }

    recebaDigito(digito: Digito): void {
        if (this.memoriaAtivada === true){
            this.digitos = []
            this.tela?.limpe()
            this.memoriaAtivada = false
        }
        this.armazeneDigito(digito);
        this.tela?.mostre(digito);
        console.log(this.digitos)
    }

    recebaOperacao(operação: Operação): void {
        if (this.operacao[1] !== undefined) {
            this.calculeResultado();
            this.mostraResultado();
        }
        this.operacao[0] = this.operacao[1]
        this.operacao[1] = (operação)

        if (this.separadorDecimal === false) {
            if (this.digitos.length !== 0){
                this.adicionaNumeroOperando()
            }
        } else {
            this.numeros[0] = this.numeros[0].plus(new Decimal(this.digitos.join('')).dividedBy(Decimal.pow(10, this.digitos.length)));
            this.separadorDecimal = false;
        }

        this.digitos = [];
        switch (operação) {
            case Operação.RAIZ_QUADRADA:
                this.tela?.limpe();
                this.numeros[0] = this.numeros[0].sqrt();
                this.mostraResultado();
                break;
        }
    }

    recebaControle(controle: Controle): void {
        this.controles[0] = this.controles[1]
        this.controles[1] = controle
        switch (controle) {
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                this.tela?.limpe();
                this.tela?.mostre(Digito.ZERO);
                break;
            case Controle.IGUAL:
                if (this.memoriaAtivada === false){
                    this.calculeResultado();
                }
                this.memoriaAtivada = false
                if (this.numeros.length !== 0){
                    this.mostraResultado();
                }
                break;
            case Controle.SEPARADOR_DECIMAL:
                if (!this.separadorDecimal) {
                    this.adicionaNumeroOperando()
                    this.separadorDecimal = true;
                    this.digitos = [];
                    this.tela?.mostreSeparadorDecimal();
                }
                break;
            case Controle.MEMÓRIA_SOMA:
                if (this.operacao[1] === undefined){
                    this.memoria = this.memoria.plus(new Decimal(this.digitos.join('')))
                    this.memoriaAtivada = true
                }else {
                    this.calculeResultado()
                    this.memoria = this.memoria.plus(this.numeros[0])
                    this.memoriaAtivada = true
                }
                break
            case Controle.MEMÓRIA_SUBTRAÇÃO:
                if (this.operacao[1] === undefined){
                    this.memoria = this.memoria.minus(new Decimal(this.digitos.join('')))
                    this.memoriaAtivada = true
                }else {
                    this.calculeResultado()
                    this.memoria = this.memoria.minus(this.numeros[0])
                    this.memoriaAtivada = true
                }
                break
        }
    }

    reinicie(): void {
        throw new Error("Method not implemented.");
    }

    definaTela(tela: Tela | undefined): void {
        this.tela = tela;
    }

    obtenhaTela(): Tela | undefined {
        return this.tela;
    }

    private armazeneDigito(digito: Digito): void {
        if (this.digitos.length === 0 && this.separadorDecimal === false) {
            this.tela?.limpe();
        }
        this.digitos.push(digito);
    }

    private calculeResultado() {
        
        if (this.digitos.length > 0 && new Decimal(this.digitos.join('')).toNumber() !== 0) {
            if (!this.separadorDecimal) {
                this.adicionaNumeroOperando()
                // console.log(this.numeros)
            } else {
                this.numeros[0] = this.numeros[0].plus(new Decimal(this.digitos.join('')).dividedBy(Decimal.pow(10, this.digitos.length)));
                this.separadorDecimal = false;
            }
            this.digitos = [];
        }
    
        
        if (this.numeros.length > 0) {
            switch (this.operacao[1]) {
                case Operação.SOMA:
                    if (this.numeros.length < 2) {
                        this.numeros[1] = this.numeros[0];
                    } else {
                        this.numeros[0] = this.numeros[0].plus(this.numeros[1]);
                    }
                    break;
    
                case Operação.SUBTRAÇÃO:
                    if (this.numeros.length < 2) {
                        this.numeros[1] = this.numeros[0];
                    } else {
                        this.numeros[0] = this.numeros[0].minus(this.numeros[1]);
                    }
                    break;
    
                case Operação.MULTIPLICAÇÃO:
                    if (this.numeros.length < 2) {
                        this.numeros[1] = this.numeros[0];
                    } else {
                        this.numeros[0] = this.numeros[0].times(this.numeros[1]);
                    }
                    break;
    
                case Operação.DIVISÃO:
                    if (this.numeros.length >= 2 && !this.numeros[1].equals(0)) {
                        this.numeros[0] = this.numeros[0].div(this.numeros[1]);
                    } else {
                        console.log("Erro: Divisão por zero!");
                    }
                    break;

            }
        } else {
            console.log("Erro: Nenhum número para calcular!");
        }
    }
    

    private mostraResultado(): void {
        this.tela?.limpe();
        if (this.numeros[0].isNegative()) {
            this.tela?.mostreSinal(Sinal.NEGATIVO);
        }

        let numeroString = this.numeros[0].toString();
        for (let i = 0; i < numeroString.length; i++) {
            switch (numeroString[i]) {
                case "0":
                    this.tela?.mostre(Digito.ZERO);
                    break;
                case "1":
                    this.tela?.mostre(Digito.UM);
                    break;
                case "2":
                    this.tela?.mostre(Digito.DOIS);
                    break;
                case "3":
                    this.tela?.mostre(Digito.TRÊS);
                    break;
                case "4":
                    this.tela?.mostre(Digito.QUATRO);
                    break;
                case "5":
                    this.tela?.mostre(Digito.CINCO);
                    break;
                case "6":
                    this.tela?.mostre(Digito.SEIS);
                    break;
                case "7":
                    this.tela?.mostre(Digito.SETE);
                    break;
                case "8":
                    this.tela?.mostre(Digito.OITO);
                    break;
                case "9":
                    this.tela?.mostre(Digito.NOVE);
                    break;
                case ".":
                    this.tela?.mostreSeparadorDecimal();
                    break;
            }
        }
        // console.log(this.numeros[0].toString());
        console.log(this.operacao)
        console.log(this.memoria)
        console.log(this.controles)
    }

    private adicionaNumeroOperando() {
        this.numeros.push(new Decimal(this.digitos.join('')));
    }
}
 