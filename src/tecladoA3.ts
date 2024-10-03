import { Controle, Digito, Operação, Teclado } from "./calculadora";
import CpuA3 from "./cpuA3";

export default class TecladoA3 implements Teclado{
    cpu = new CpuA3

    constructor() {
        this.cpu
    }

    digiteDigito(digito: Digito): void {
        this.cpu.recebaDigito(digito)
    }
    digiteOperacao(operação: Operação): void {
        this.cpu.recebaOperacao(operação)
    }
    digiteControle(controle: Controle): void {
        throw new Error("Method not implemented.");
    }
    

}