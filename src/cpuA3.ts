import { flag } from "arg";
import { Controle, Cpu, Digito, Operação, Sinal, Teclado, Tela } from "./calculadora";
import TelaA3 from "./telaA3";
import Decimal from 'decimal.js';

export enum TipoMemoria {
    MAIS,
    MENOS
}

export default class CpuA3 implements Cpu {
    private tela: Tela | undefined;
    private digitos: Digito[] = [];
    private numeros: Decimal[] = [];
    private memoria: Decimal = this.zero();
    private controle: Controle | undefined = undefined;
    private operacao: Operação | undefined = undefined;
    private separadorDecimal: boolean = false;
    private memoriaAtivada: boolean = false;
    private erro: boolean = false;
    private memoriaTelaAtivada: boolean = false;
    private mostrarSegundoNumero: boolean = false;
    private digitosMapa = [
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

    constructor(tela: Tela) {
        this.definaTela(tela);
    }
    
    recebaDigito(digito: Digito): void {
        if (!this.erroAtivado() && this.digitos.length < 8){
            if (this.memoriaAtivada){
                this.limpaDigitos();
                this.limpaTela();
                this.desativaMemoria();
                if (this.apenasUmNumero()){
                    this.limpaNumeros();
                } else {
                    this.retiraUltimoNumero();
                }}
            this.armazeneDigito(digito);
            this.mostraDigito(digito);

        }}

    recebaOperacao(operação: Operação): void {
        if (!this.erroAtivado()){
            if (!this.separadorDecimalAtivado()) {
                    this.adicionaNumeroOperando();
            } else {
                this.adicionaNumeroOperandoSeparadorDecimal();
            }
            
            this.desativaMemoria();
            this.controle = undefined;

            switch (operação) {
                case Operação.RAIZ_QUADRADA:
                    this.limpaTela();
                    if (!this.apenasUmNumero() && !this.segundoNumeroIgualZero()){
                        this.segundoNumeroRecebe(this.numeros[1].sqrt());
                        this.ativarMostrarSegundoNumero();
                    }else{
                        this.primeiroNumeroRecebe(this.numeros[0].sqrt());
                    }
                    this.limpaDigitos();
                    this.mostraResultado();
                    this.desativarMostrarSegundoNumero();
                    break;
                case Operação.PERCENTUAL:
                    if (this.existeNumero()){
                        if (this.apenasUmNumero()) {
                            this.primeiroNumeroRecebe(this.zero());
                            this.mostraResultado();
                        }
                        if (this.numeros.length > 1){
                            switch (this.operacao){
                                case Operação.MULTIPLICAÇÃO:
                                    this.segundoNumeroRecebe(this.numeros[1].dividedBy(100));
                                    break
                                    case Operação.SUBTRAÇÃO:
                                        this.segundoNumeroRecebe(this.numeros[1].dividedBy(100));
                                        this.segundoNumeroRecebe(this.numeros[1].times(this.numeros[0]));
                                        break
                                        case Operação.DIVISÃO:
                                            this.segundoNumeroRecebe(this.numeros[1].dividedBy(100));
                                            break
                                            case Operação.SOMA:
                                                this.segundoNumeroRecebe(this.numeros[1].dividedBy(100));
                                                this.segundoNumeroRecebe(this.numeros[1].times(this.numeros[0]));
                                                break
                                            }}}
                                            break;
                default:
                    if (this.operacao !== undefined){
                        this.calculeResultado();
                        this.mostraResultado();
                    }
                    this.operacao = operação;
                    break;
                                            }

            this.limpaDigitos()
    }}

    recebaControle(controle: Controle): void {
        if (!this.erroAtivado() || controle === Controle.ATIVAÇÃO_LIMPEZA_ERRO){

            switch (controle) {
                case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                    this.reinicie()
                    this.tela?.mostreErro()
                    break;
                case Controle.IGUAL:
                    if (!this.memoriaAtivada){
                        this.calculeResultado();
                    }
                    if (this.operacao === undefined && this.numeros.length === 2){
                        this.primeiroNumeroRecebe(this.numeros[1])
                    }
                    if (this.numeros.length !== 0 && !this.erroAtivado()){
                        this.mostraResultado();
                    }
                    this.desativaMemoria();
                    break;
                case Controle.SEPARADOR_DECIMAL:
                    if (!this.separadorDecimal) {
                        this.adicionaNumeroOperando()
                        this.separadorDecimal = true;
                        this.ativarMostrarSegundoNumero();
                        this.limpaDigitos()
                        this.mostraResultado()
                        this.tela?.mostreSeparadorDecimal();
                        this.desativarMostrarSegundoNumero();
                    }
                    break;
                case Controle.MEMÓRIA_SOMA:
                    this.executaMemoria(TipoMemoria.MAIS)
                    break
                case Controle.MEMÓRIA_SUBTRAÇÃO:
                    this.executaMemoria(TipoMemoria.MENOS)
                    break
                case Controle.MEMÓRIA_LEITURA_LIMPEZA:
                    if (this.numeros.length === 0){
                        this.primeiroNumeroRecebe(this.memoria)
                    } else {
                        this.segundoNumeroRecebe(this.memoria);
                    }
                    this.limpaDigitos()
                    if (this.controle === Controle.MEMÓRIA_LEITURA_LIMPEZA && controle === Controle.MEMÓRIA_LEITURA_LIMPEZA){
                        this.memoria = this.zero()
                        this.desativadorMemoriaTela()
                    }
                    break
                case Controle.DESATIVAÇÃO:
                    this.reinicie()
                    this.limpaTela();
                    break
            }
            this.controle = controle
        }}

    reinicie(): void {
        this.limpaDigitos();
        this.limpaNumeros();
        this.memoria = this.zero();
        this.controle = undefined;
        this.operacao = undefined;
        this.separadorDecimal = false;
        this.desativaMemoria();
        this.erro = false;
        this.desativarMostrarSegundoNumero();
        this.desativadorMemoriaTela()
        this.limpaTela();
        this.tela?.mostre(Digito.ZERO)
    }

    definaTela(tela: Tela | undefined): void {
        this.tela = tela;
    }

    obtenhaTela(): Tela | undefined {
        return this.tela;
    }

    private armazeneDigito(digito: Digito): void {
        if (this.digitos.length === 0 && !this.separadorDecimalAtivado()) {
            this.limpaTela();
        }
        this.digitos.push(digito);
    }

    private calculeResultado() {    
        if (this.digitos.length > 0) {
            if (!this.separadorDecimal) {
                this.adicionaNumeroOperando()
            } else {
                this.adicionaNumeroOperandoSeparadorDecimal()
            }
            this.limpaDigitos()
        }

        if (this.existeNumero()) {
            if (this.apenasUmNumero() && this.operacao === Operação.DIVISÃO) {
                let multiplicador = new Decimal(1).div(this.numeros[0].pow(2))
                this.segundoNumeroRecebe(this.numeros[0]);
                this.primeiroNumeroRecebe(this.numeros[0].times(multiplicador));
            } else if (this.apenasUmNumero()) {
                this.segundoNumeroRecebe(this.numeros[0]);
            } else{
                switch (this.operacao) {
                    case Operação.SOMA:
                        this.primeiroNumeroRecebe(this.numeros[0].plus(this.numeros[1]));
                        break;
        
                    case Operação.SUBTRAÇÃO:
                        this.primeiroNumeroRecebe(this.numeros[0].minus(this.numeros[1]));
                        break;
        
                    case Operação.MULTIPLICAÇÃO:
                        this.primeiroNumeroRecebe(this.numeros[0].times(this.numeros[1]));
                        break;
        
                    case Operação.DIVISÃO:
                        if(this.segundoNumeroIgualZero()) {
                            this.ativaErro()
                            this.primeiroNumeroRecebe(this.zero());
                            this.segundoNumeroRecebe(this.zero());
                        } else {
                            this.primeiroNumeroRecebe(this.numeros[0].div(this.numeros[1]));
                        }
                        break;
    }}}}

    private mostraResultado(): void {
        this.limpaTela();
        let numeroString = ''
        if (this.numeros[0].isNegative()) {
            this.tela?.mostreSinal(Sinal.NEGATIVO);
        } else{
            this.tela?.mostreSinal(Sinal.POSITIVO);
        }
        if (this.mostrarSegundoNumero){
            numeroString = this.numeros[1].toString();
        }else{
            numeroString = this.numeros[0].toString();
        }
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
                this.tela?.mostre(this.digitosMapa[Number(numeroString[i])]);
            }
        } console.log(this.numeros)}

    private adicionaNumeroOperando() {
        if (this.numeros.length === 2){
            this.retiraUltimoNumero();
        }
        if (this.digitos.join('') === ""){
            this.numeros.push(this.zero());
        }else{
            this.numeros.push(new Decimal(this.digitos.join('')));
        }}

    private adicionaNumeroOperandoSeparadorDecimal(){
        this.primeiroNumeroRecebe(this.numeros[0].plus(new Decimal(this.digitos.join('')).dividedBy(Decimal.pow(10, this.digitos.length))));
        this.separadorDecimal = false;
    }

    private executaMemoria(tipo: TipoMemoria){
        if (this.operacao === undefined){
            if (this.separadorDecimalAtivado()){
                this.adicionaNumeroOperandoSeparadorDecimal()
            } else{
                this.adicionaNumeroOperando()
            }
            this.limpaDigitos()
        }else {
            this.calculeResultado()
        }
        if (tipo === TipoMemoria.MAIS){
            this.memoria = this.memoria.plus(this.numeros[0])
        }else if(tipo === TipoMemoria.MENOS){
            this.memoria = this.memoria.minus(this.numeros[0])
        }
        this.ativaMemoria();
        this.AtivadorMemoriaTela();
        this.mostraResultado();
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
            this.tela?.mostreMemoria();
            this.memoriaTelaAtivada = false;
        }
    }
    private limpaTela(){
        this.tela?.limpe();
    }
    private desativaMemoria(){
        this.memoriaAtivada = false;
    }
    private ativaMemoria(){
        this.memoriaAtivada = true;
    }
    private apenasUmNumero(){
        return this.numeros.length === 1;
    }
    private limpaNumeros(){
        this.numeros = [];
    }
    private retiraUltimoNumero(){
        this.numeros.pop();
    }
    private mostraDigito(digito:Digito){
        this.tela?.mostre(digito);
    }
    private separadorDecimalAtivado(){
        return this.separadorDecimal === true;
    }
    private erroAtivado(){
        return this.erro === true;
    }
    private segundoNumeroIgualZero(){
        return this.numeros[1].equals(this.zero());
    }
    private ativarMostrarSegundoNumero(){
        this.mostrarSegundoNumero = true
    }
    private desativarMostrarSegundoNumero(){
        this.mostrarSegundoNumero = false
    }
    private existeNumero(){
        return this.numeros.length > 0
    }
    private primeiroNumeroRecebe(numero: Decimal){
        this.numeros[0] = numero
    }
    private segundoNumeroRecebe(numero: Decimal){
        this.numeros[1] = numero
    }
    private zero(){
        return new Decimal(0)
    }
}
 