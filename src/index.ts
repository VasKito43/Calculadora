//index.ts
import { Controle, Digito, Operação } from "./calculadora";
import { TestadorCpu, TestadorTela } from "./caculadoraTestes";
import CpuA3 from "./cpuA3";
import TelaX0Teste from "./telaX0Teste";

// Testando a TELA
const tela1 = new TelaX0Teste();
//new TestadorTela(tela).testeTodosNúmeros();
//new TestadorTela(tela).testeTodosSímbolo();

// Testando a CPU
const cpu = new CpuA3(tela1);
cpu.definaTela(tela1);
//new TestadorCpu(cpu).teste123Soma456();
//new TestadorCpu(cpu).teste12Soma34Soma56();
new TestadorCpu(cpu, false, false).executeTodosTestes();
