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
            if (this.numeros.length === 1){
                this.numeros = []
            } else {
                this.numeros.pop()
            }
        }
        this.armazeneDigito(digito);
        this.tela?.mostre(digito);
    }

    recebaOperacao(operação: Operação): void {

        if (this.operacao[1] !== undefined && operação !== Operação.PERCENTUAL) {
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
        this.memoriaAtivada = false
        this.controles[1] = undefined
        switch (operação) {
            case Operação.RAIZ_QUADRADA:
                this.tela?.limpe();
                this.numeros[0] = this.numeros[0].sqrt();
                this.mostraResultado();
                break;
            case Operação.PERCENTUAL:
                if (this.numeros.length > 0){
                    if (this.numeros.length === 1) {
                        this.numeros[0] = new Decimal(0)
                        this.mostraResultado();
                    }
                    if (this.numeros.length > 1){
                        if (this.operacao[0] === Operação.MULTIPLICAÇÃO) {
                            this.numeros[1] = this.numeros[1].dividedBy(100);
                            this.numeros[0] = this.numeros[0].times(this.numeros[1]);
                            break
                            this.mostraResultado();
                            
                        }
                        if (this.operacao[0] === Operação.SUBTRAÇÃO) {
                            this.numeros[1] = this.numeros[1].dividedBy(100);
                            this.numeros[1] = this.numeros[1].times(this.numeros[0])
                            this.numeros[0] = this.numeros[0].minus(this.numeros[1]);
                        }
                        if (this.operacao[0] === Operação.DIVISÃO) {
                            this.numeros[1] = this.numeros[1].dividedBy(100);
                            this.numeros[0] = this.numeros[0].div(this.numeros[1])
                        }
                        if (this.operacao[0] === Operação.SOMA) {
                            this.numeros[1] = this.numeros[1].dividedBy(100);
                            this.numeros[1] = this.numeros[1].times(this.numeros[0])
                            this.numeros[0] = this.numeros[0].plus(this.numeros[1]);
                            
                        }
                            
                        }}
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
                // this.calculeResultado();

                if (this.operacao[1] === undefined && this.numeros.length === 2){
                    this.numeros[0] = this.numeros[1]
                }
                // this.memoriaAtivada = false
                if (this.numeros.length !== 0){
                    this.mostraResultado();
                }
                this.memoriaAtivada = false
                // this.controles[1] = undefined
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
                    if (this.separadorDecimal === true){
                        this.numeros[0] = this.numeros[0].plus(new Decimal(this.digitos.join('')).dividedBy(Decimal.pow(10, this.digitos.length)));
                        this.separadorDecimal = false;
                    } else{
                        this.adicionaNumeroOperando()
                    }
                    this.memoria = this.memoria.plus(this.numeros[0])
                    this.digitos = []
                    this.memoriaAtivada = true
                }else {//************************************* */
                    this.calculeResultado()
                    this.memoria = this.memoria.plus(this.numeros[0])
                    this.memoriaAtivada = true
                }
                this.tela?.mostreMemoria()
                break
            case Controle.MEMÓRIA_SUBTRAÇÃO:
                if (this.operacao[1] === undefined){
                    if (this.separadorDecimal === true){
                        this.numeros[0] = this.numeros[0].plus(new Decimal(this.digitos.join('')).dividedBy(Decimal.pow(10, this.digitos.length)));
                        this.separadorDecimal = false;
                    } else{
                        this.adicionaNumeroOperando()
                    }
                    this.memoria = this.memoria.minus(this.numeros[0])
                    this.digitos = []
                    this.memoriaAtivada = true
                }else {
                    this.calculeResultado()
                    this.memoria = this.memoria.minus(this.numeros[0])
                    this.memoriaAtivada = true
                }
                break
            case Controle.MEMÓRIA_LEITURA_LIMPEZA:
                if (this.numeros.length === 0){
                    this.numeros[0] = this.memoria
                } else {
                    this.numeros[1] = this.memoria
                }
                this.digitos = []
                // this.memoriaAtivada = true
                if (this.controles[0] === Controle.MEMÓRIA_LEITURA_LIMPEZA && this.controles[1] === Controle.MEMÓRIA_LEITURA_LIMPEZA){
                    this.memoria = new Decimal(0)
                    this.calculeResultado()
                }
                // this.calculeResultado()
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
        } else{
            this.tela?.mostreSinal(Sinal.POSITIVO);
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
        console.log(this.numeros)
        console.log(this.operacao)
        console.log(this.memoria)
        console.log(this.memoriaAtivada)
        console.log(this.digitos)
        console.log(this.controles)
    }

    private adicionaNumeroOperando() {
        if (this.numeros.length === 2){
            this.numeros.pop()
        }
        this.numeros.push(new Decimal(this.digitos.join('')));
    }

    private adicionaMemoriaDigitos(){
        this.digitos = []
        let memoriaString = this.memoria.toString();
        for (let i = 0; i < memoriaString.length; i++) {
            switch (memoriaString[i]) {
                case "0":
                    this.digitos.push(Digito.ZERO);
                    break;
                case "1":
                    this.digitos.push(Digito.ZERO);
                    break;
                case "2":
                    this.digitos.push(Digito.ZERO);
                    break;
                case "3":
                    this.digitos.push(Digito.ZERO);
                    break;
                case "4":
                    this.digitos.push(Digito.ZERO);
                    break;
                case "5":
                    this.digitos.push(Digito.ZERO);
                    break;
                case "6":
                    this.digitos.push(Digito.ZERO)
                    break;
                case "7":
                    this.digitos.push(Digito.ZERO)
                    break;
                case "8":
                    this.digitos.push(Digito.ZERO)
                    break;
                case "9":
                    this.digitos.push(Digito.ZERO)
                    break;
                case ".":
                    this.tela?.mostreSeparadorDecimal();
                    break;
            }
        }
    }
}
 