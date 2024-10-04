import { Controle, Cpu, Digito, Operação, Teclado } from "./calculadora";
import CpuA3 from "./cpuA3";

export default class TecladoA3 implements Teclado{
    cpu: CpuA3 | undefined

    constructor(cpu:CpuA3){
        this.definaCpu(cpu)
    }

    digiteDigito(digito: Digito): void {
        this.cpu?.recebaDigito(digito)
    }
    digiteOperacao(operação: Operação): void {
        this.cpu?.recebaOperacao(operação)
    }
    digiteControle(controle: Controle): void {
        this.cpu?.recebaControle(controle)
    }
    definaCpu(cpu: CpuA3 | undefined): void {
        this.cpu = cpu
    }
    obtenhaCpu(): CpuA3 | undefined{
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