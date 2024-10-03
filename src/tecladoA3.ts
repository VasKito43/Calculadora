import { Controle, Cpu, Digito, Operação, Teclado } from "./calculadora";
import CpuA3 from "./cpuA3";

export default class TecladoA3 implements Teclado{
    cpu!: Cpu

    constructor(cpu:CpuA3){
        this.definaCpu(cpu)
    }

    digiteDigito(digito: Digito): void {
        throw new Error("Method not implemented.");
    }
    digiteOperacao(operação: Operação): void {
        throw new Error("Method not implemented.");
    }
    digiteControle(controle: Controle): void {
        throw new Error("Method not implemented.");
    }
    definaCpu(cpu: Cpu): void {
        this.cpu = cpu
    }
    obtenhaCpu(): Cpu {
        return this.cpu
    }
    // cpu = new CpuA3

    // constructor() {
    //     this.cpu
    // }

    // digiteDigito(digito: Digito): void {
    //     this.cpu.recebaDigito(digito)
    // }
    // digiteOperacao(operação: Operação): void {
    //     this.cpu.recebaOperacao(operação)
    // }
    // digiteControle(controle: Controle): void {
    //     throw new Error("Method not implemented.");
    // }
    

}