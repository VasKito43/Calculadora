import { Digito , Controle, Operação} from "./calculadora";
import CpuA3 from "./cpuA3";
import TecladoA3 from "./tecladoA3";
import TelaA3 from "./telaA3";

const tela = new TelaA3
const cpu = new CpuA3(tela);
const teclado = new TecladoA3(cpu)
// // tela.limpe()
// tela.mostre(Digito.ZERO)
// // tela.limpe()
// tela.mostre(Digito.UM)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteOperacao(Operação.SOMA)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.DOIS)

// tela.limpe()
teclado.digiteDigito(Digito.TRÊS)
// teclado.digiteOperacao(Operação.RAIZ_QUADRADA)

teclado.digiteOperacao(Operação.DIVISÃO)
teclado.digiteDigito(Digito.DOIS)
teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO)


function f(value: unknown){
    console.log()
}