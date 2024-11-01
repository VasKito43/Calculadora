import { flag } from "arg";
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
    private erro: boolean = false
    private memoriaTelaAtivada: boolean = false

    constructor(tela: Tela) {
        this.definaTela(tela);
    }
    
    recebaDigito(digito: Digito): void {
        if (this.erro === false && this.digitos.length < 8){
            if (this.memoriaAtivada === true){
                this.limpaDigitos()
                this.tela?.limpe()
                this.memoriaAtivada = false
                if (this.numeros.length === 1){
                    this.numeros = []
                } else {
                    this.numeros.pop()
                }}
            this.armazeneDigito(digito);
            this.tela?.mostre(digito);
        }}

    recebaOperacao(operação: Operação): void {
        if (this.erro === false){

            if (this.operacao[1] !== undefined && operação !== Operação.PERCENTUAL && this.controles[1] !== Controle.IGUAL) {
                this.calculeResultado();
                this.mostraResultado();
                
            }
            
            this.operacao[0] = this.operacao[1]
            this.operacao[1] = (operação)
    
            if (this.separadorDecimal === false) {
                    this.adicionaNumeroOperando()

            } else {
                this.adicionaNumeroOperandoSeparadorDecimal()
            }
    
            this.limpaDigitos()
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
                            switch (this.operacao[0]){
                                case Operação.MULTIPLICAÇÃO:
                                    this.numeros[1] = this.numeros[1].dividedBy(100);
                                    this.numeros[0] = this.numeros[0].times(this.numeros[1]);
                                    break
                                case Operação.SUBTRAÇÃO:
                                    this.numeros[1] = this.numeros[1].dividedBy(100);
                                    this.numeros[1] = this.numeros[1].times(this.numeros[0])
                                    this.numeros[0] = this.numeros[0].minus(this.numeros[1]);
                                    break
                                case Operação.DIVISÃO:
                                    this.numeros[1] = this.numeros[1].dividedBy(100);
                                    this.numeros[0] = this.numeros[0].div(this.numeros[1])
                                    break
                                case Operação.SOMA:
                                    this.numeros[1] = this.numeros[1].dividedBy(100);
                                    this.numeros[1] = this.numeros[1].times(this.numeros[0])
                                    this.numeros[0] = this.numeros[0].plus(this.numeros[1]);
                                    break
                            }}}
                    break;
        }}}

    recebaControle(controle: Controle): void {
        if (this.erro === false || controle === Controle.ATIVAÇÃO_LIMPEZA_ERRO){

            this.controles[0] = this.controles[1]
            this.controles[1] = controle
            switch (controle) {
                case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                    this.reinicie()
                    this.tela?.mostreErro()
                    break;
                case Controle.IGUAL:
                    if (this.memoriaAtivada === false){
                        this.calculeResultado();
                    }
                    if (this.operacao[1] === undefined && this.numeros.length === 2){
                        this.numeros[0] = this.numeros[1]
                    }
                    if (this.numeros.length !== 0){
                        this.mostraResultado();
                    }
                    this.memoriaAtivada = false
                    break;
                case Controle.SEPARADOR_DECIMAL:
                    if (!this.separadorDecimal) {
                        this.adicionaNumeroOperando()
                        this.separadorDecimal = true;
                        this.limpaDigitos()
                        this.tela?.mostreSeparadorDecimal();
                    }
                    break;
                case Controle.MEMÓRIA_SOMA:
                    if (this.operacao[1] === undefined){
                        if (this.separadorDecimal === true){
                            this.adicionaNumeroOperandoSeparadorDecimal()
                        } else{
                            this.adicionaNumeroOperando()
                        }
                        this.limpaDigitos()
                    }else {
                        this.calculeResultado()
                    }
                    this.memoria = this.memoria.plus(this.numeros[0])
                    this.memoriaAtivada = true
                    this.AtivadorMemoriaTela();
                    break
                case Controle.MEMÓRIA_SUBTRAÇÃO:
                    if (this.operacao[1] === undefined){
                        if (this.separadorDecimal === true){
                            this.adicionaNumeroOperandoSeparadorDecimal()
                        } else{
                            this.adicionaNumeroOperando()
                        }
                        this.limpaDigitos()
                    }else {
                        this.calculeResultado()
                    }
                    this.memoria = this.memoria.minus(this.numeros[0])
                    this.memoriaAtivada = true
                    this.AtivadorMemoriaTela()
                    break
                case Controle.MEMÓRIA_LEITURA_LIMPEZA:
                    if (this.numeros.length === 0){
                        this.numeros[0] = this.memoria
                    } else {
                        this.numeros[1] = this.memoria
                    }
                    this.limpaDigitos()
                    if (this.controles[0] === Controle.MEMÓRIA_LEITURA_LIMPEZA && this.controles[1] === Controle.MEMÓRIA_LEITURA_LIMPEZA){
                        this.memoria = new Decimal(0)
                        this.desativadorMemoriaTela()
                        this.calculeResultado()
                    }
                    break
                case Controle.DESATIVAÇÃO:
                    this.reinicie()
                    this.tela?.limpe()
                    break
            }}}

    reinicie(): void {
        this.digitos = [];
        this.numeros = [];
        this.memoria = new Decimal(0);
        this.controles = [undefined, undefined];
        this.operacao = [undefined, undefined];
        this.separadorDecimal = false;
        this.memoriaAtivada = false;
        this.erro = false;
        this.desativadorMemoriaTela()
        this.tela?.limpe()
        this.tela?.mostre(Digito.ZERO)
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
            } else {
                this.adicionaNumeroOperandoSeparadorDecimal()
            }
            this.limpaDigitos()
        }
        
        if (this.numeros.length > 0) {
            if (this.numeros.length < 2 && this.operacao[1] === Operação.DIVISÃO) {
                let multiplicador = new Decimal(1).div(this.numeros[0].pow(2))
                this.numeros[1] = this.numeros[0];
                this.numeros[0] = this.numeros[0].times(multiplicador)
            } else if (this.numeros.length < 2) {
                this.numeros[1] = this.numeros[0];
            } else{
                switch (this.operacao[1]) {
                    case Operação.SOMA:
                            this.numeros[0] = this.numeros[0].plus(this.numeros[1]);
                        break;
        
                    case Operação.SUBTRAÇÃO:
                            this.numeros[0] = this.numeros[0].minus(this.numeros[1]);
                        break;
        
                    case Operação.MULTIPLICAÇÃO:
                            this.numeros[0] = this.numeros[0].times(this.numeros[1]);
                        break;
        
                    case Operação.DIVISÃO:

                        if(this.numeros[1] === new Decimal(0)) {
                            this.ativaErro()
                            this.numeros[0] = new Decimal(0)
                            this.numeros[1] = new Decimal(0)
                        } else {
                            this.numeros[0] = this.numeros[0].div(this.numeros[1]);
                        }
                        break;
    }}}}

    private mostraResultado(): void {
        let digitosMap = [
            Digito.ZERO,
            Digito.UM,
            Digito.DOIS,
            Digito.TRÊS,
            Digito.QUATRO,
            Digito.CINCO,
            Digito.SEIS,
            Digito.SETE,
            Digito.OITO,
            Digito.NOVE
        ];
        this.tela?.limpe();
        if (this.numeros[0].isNegative()) {
            this.tela?.mostreSinal(Sinal.NEGATIVO);
        } else{
            this.tela?.mostreSinal(Sinal.POSITIVO);
        }

        let numeroString = this.numeros[0].toString();
        if (numeroString.replace("-", "").replace(".", "").length > 8) {
            let quantidadeLimite = 8
            if (numeroString.includes("-")){
                quantidadeLimite += 1
            }
            if(numeroString.replace("-", "").slice(0,8).includes(".")){
                quantidadeLimite += 1
            }
            numeroString = numeroString.slice(0, quantidadeLimite)
            this.ativaErro()
        } 

        for (let i = 0; i < numeroString.length; i++) {
        
            if (numeroString[i] === ".") {
                this.tela?.mostreSeparadorDecimal();
            } else {
                this.tela?.mostre(digitosMap[Number(numeroString[i])]);
            }
            console.log(this.numeros)
        }}

    private adicionaNumeroOperando() {
        if (this.numeros.length === 2){
            this.numeros.pop()
        }
        if (this.digitos.join('') === ""){
            this.numeros.push(new Decimal(0));
        }else{
            this.numeros.push(new Decimal(this.digitos.join('')));
        }}

    private adicionaNumeroOperandoSeparadorDecimal(){
        this.numeros[0] = this.numeros[0].plus(new Decimal(this.digitos.join('')).dividedBy(Decimal.pow(10, this.digitos.length)));
        this.separadorDecimal = false;
    }

    private limpaDigitos(){
        this.digitos = [];
    }

    private ativaErro(){
        this.erro = true;
        this.tela?.mostreErro();
    }
    private AtivadorMemoriaTela(){
        if (this.memoriaTelaAtivada === false){
            this.tela?.mostreMemoria()
            this.memoriaTelaAtivada = true
        }}
    private desativadorMemoriaTela(){
        if (this.memoriaTelaAtivada === true){
            this.tela?.mostreMemoria()
            this.memoriaTelaAtivada = false
        }
    }
}
 