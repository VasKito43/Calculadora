import { Controle, Cpu, Digito, Operação, Teclado, Tela } from "./calculadora";
import TelaA3 from "./telaA3";



export default class CpuA3 implements Cpu{
    tela: Tela | undefined
    digitos: Digito[] = []
    numeros: number[] = [] //trocar digito por numero
    operacao: Operação | undefined = undefined

    constructor(tela:Tela){
        this.definaTela(tela)
    }

    recebaDigito(digito: Digito): void {//vereficação do zero
        this.armazeneDigito(digito)
        this.tela?.mostre(digito)

    }
    recebaOperacao(operação: Operação): void { //vereficar qual operaçaão
        // preparar para verificar opações com um numero (raiz, percentual)
        this.operacao = operação
        this.numeros.push(Number(this.digitos.join('')))
        this.digitos = []

        
    }
    recebaControle(controle: Controle): void {
        switch(controle){
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
                this.tela?.limpe()
                this.tela?.mostre(Digito.ZERO)
                break
            case Controle.IGUAL: //vereficar quando ocorrer erro(divisao por zero)
                this.calculeResultado()
                this.tela?.limpe()
                this.mostraResultado()
            
            console.log()
        }
        
    }
    reinicie(): void { //ac
        throw new Error("Method not implemented.");
    }
    definaTela(tela: Tela | undefined): void {
        this.tela = tela
    }
    obtenhaTela(): Tela | undefined {
        return this.tela
    }
    armazeneDigito(digito: Digito){
        if (this.digitos.length === 0) {
                this.tela?.limpe()
            } 
            this.digitos.push(digito)
    }
    calculeResultado(){
        if (Number(this.digitos.join('')) !== 0){
            this.numeros.push(Number(this.digitos.join('')))
            this.digitos = []
        }
        switch(this.operacao){
            case Operação.SOMA:
                if (this.numeros.length < 2){
                    this.numeros[1] = this.numeros[0]
                } else {
                    this.numeros[0] = this.numeros[0] + this.numeros[1]
                }
                
            break

            case Operação.SUBTRAÇÃO:
                if (this.numeros.length < 2){
                    this.numeros[1] = this.numeros[0]
                } else {
                    this.numeros[0] = this.numeros[0] - this.numeros[1]
                }
            break

            case Operação.MULTIPLICAÇÃO:
                if (this.numeros.length < 2){
                    this.numeros[1] = this.numeros[0]
                } else {
                    this.numeros[0] = this.numeros[0] * this.numeros[1]
                }
            break

            case Operação.DIVISÃO:
                if (this.numeros[1] != 0) {
                    if (this.numeros.length < 2){
                        this.numeros[1] = this.numeros[0]
                        this.numeros[0] = this.numeros[0] / this.numeros[0]**2
                    } else{
                        this.numeros[0] = this.numeros[0] / this.numeros[1]
                    }
                    
                } else{
                   console.log("erro")//mudar futuralmente     
                }
                
            break
            
        }
    }

    mostraResultado(){
        let numeroString = this.numeros[0].toString()
        for (let i = 0; i < numeroString.length; i++){
            switch(numeroString[i]){
                case "0":
                    this.tela?.mostre(Digito.ZERO)
                    break
                case "1":
                    this.tela?.mostre(Digito.UM)
                    break
                case "2":
                    this.tela?.mostre(Digito.DOIS)
                    break
                case "3":
                    this.tela?.mostre(Digito.TRÊS)
                    break
                case "4":
                    this.tela?.mostre(Digito.QUATRO)
                    break
                case "5":
                    this.tela?.mostre(Digito.CINCO)
                    break
                case "6":
                    this.tela?.mostre(Digito.SEIS)
                    break
                case "7":
                    this.tela?.mostre(Digito.SETE)
                    break
                case "8":
                    this.tela?.mostre(Digito.OITO)
                    break
                case "9":
                    this.tela?.mostre(Digito.NOVE)
                    break
            }
        }
    }


//------------------------------------------------------

    // tela = new TelaA3
    // digitos: Digito[];
    // operacao: Operação;

    // constructor() {
    //     this.digitos = [];
    //     this.tela
    //     this.operacao = Operação.SOMA // soma apenas como atributo inicial
    // }
    

    // recebaDigito(digito: Digito): void {
    //     this.armazenarNumero(digito)
    //     this.tela.mostre(digito)
    // }
    // recebaOperacao(operação: Operação): void {
    //     this.operacao = operação
    // }
    // recebaControle(controle: Controle): void {
    //     if (controle === Controle.ATIVAÇÃO_LIMPEZA_ERRO){
    //         console.log("tratar ativação limpeza erro")
    //     }
    // }
    // reinicie(): void {
    //     throw new Error("Method not implemented.");
    // }
    // armazenarNumero(digito: Digito): void{
    //     if (this.digitos.length === 0) {
    //         this.tela.limpe()
    //         this.digitos.push(digito)
    //     } else {
    //         this.digitos.push(digito)
            
    //     }
    // }

}