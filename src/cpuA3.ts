import { Controle, Cpu, Digito, Operação, Teclado } from "./calculadora";
import TelaA3 from "./telaA3";


export default class CpuA3 implements Cpu{
    tela = new TelaA3
    digitos: Digito[];
    operacao: Operação;

    constructor() {
        this.digitos = [];
        this.tela
        this.operacao = Operação.SOMA // soma apenas como atributo inicial
    }
    

    recebaDigito(digito: Digito): void {
        this.armazenarNumero(digito)
        this.tela.mostre(digito)
    }
    recebaOperacao(operação: Operação): void {
        this.operacao = operação
    }
    recebaControle(controle: Controle): void {
        if (controle === Controle.ATIVAÇÃO_LIMPEZA_ERRO){
            console.log("tratar ativação limpeza erro")
        }
    }
    reinicie(): void {
        throw new Error("Method not implemented.");
    }
    armazenarNumero(digito: Digito): void{
        if (this.digitos.length === 0) {
            this.tela.limpe()
            this.digitos.push(digito)
        } else {
            this.digitos.push(digito)
            
        }
    }

}