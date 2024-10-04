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

    recebaDigito(digito: Digito): void {
        this.armazeneDigito(digito)
        this.tela?.mostre(digito)
    }
    recebaOperacao(operação: Operação): void { //vereficar qual operaçaão
        if (operação == undefined) {
            this.operacao = operação
        } else {
            Controle.IGUAL
        }
    }
    recebaControle(controle: Controle): void {
        switch(controle){
            case Controle.ATIVAÇÃO_LIMPEZA_ERRO:
            this.tela?.limpe()
            this.tela?.mostre(Digito.ZERO)
            break
            case Controle.IGUAL:
            
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
    calculeResultado(operação: Operação){
        switch(operação){
            case Operação.SOMA:
                if (this.digitos.length < 2){
                    this.digitos[1] = this.digitos[0]
                } else {
                    this.digitos[0] = this.digitos[0] + this.digitos[1]
                }
                
            break

            case Operação.SUBTRAÇÃO:
                if (this.digitos.length < 2){
                    this.digitos[1] = this.digitos[0]
                } else {
                    this.digitos[0] = this.digitos[0] - this.digitos[1]
                }
            break

            case Operação.MULTIPLICAÇÃO:
                if (this.digitos.length < 2){
                    this.digitos[1] = this.digitos[0]
                } else {
                    this.digitos[0] = this.digitos[0] * this.digitos[1]
                }
            break

            case Operação.DIVISÃO:
                if (this.digitos[1] != 0) {
                    if (this.digitos.length < 2){
                        this.digitos[1] = this.digitos[0]
                        this.digitos[0] = this.digitos[0] / this.digitos[0]**2
                    } else{
                        this.digitos[0] = this.digitos[0] / this.digitos[1]
                    }
                    
                } else{
                   console.log("erro")//mudar futuralmente     
                }
                
            break
            
            case Operação.RAIZ_QUADRADA:
                this.digitos[0] =  Math. sqrt(this.digitos[0])
            break

            case Operação.PERCENTUAL:
                this.digitos[0] = this.digitos[0] / 100
            break
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