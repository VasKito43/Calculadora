import { Digito , Controle, Operação} from "./calculadora";
import CpuA3 from "./cpuA3";
import TecladoA3 from "./tecladoA3";
import TelaA3 from "./telaA3";

// memoria calcula e pega o resultado
// mrc pega o valor da memoria e coloca como segundo numero, excluindo qualquer digito que tinha nele
// duas vezes mrc seguidas limpa memoria(usar bandeira)

// implementar porcentagem, memoria, liga e desliga, renicie

const tela = new TelaA3
const cpu = new CpuA3(tela);
const teclado = new TecladoA3(cpu);
// // tela.limpe()
// tela.mostre(Digito.ZERO)
// // tela.limpe()
// tela.mostre(Digito.UM)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.DOIS)
teclado.digiteDigito(Digito.UM)
teclado.digiteDigito(Digito.ZERO)
teclado.digiteDigito(Digito.ZERO)
teclado.digiteOperacao(Operação.MULTIPLICAÇÃO)
teclado.digiteDigito(Digito.DOIS)
// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
teclado.digiteOperacao(Operação.PERCENTUAL)
//teclado.digiteControle(Controle.MEMÓRIA_SOMA)
// teclado.digiteDigito(Digito.SETE)
// teclado.digiteDigito(Digito.SEIS)
// teclado.digiteDigito(Digito.CINCO)
// teclado.digiteDigito(Digito.ZERO)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.TRÊS)
// teclado.digiteDigito(Digito.CINCO)
// teclado.digiteOperacao(Operação.MULTIPLICAÇÃO)

//teclado.digiteOperacao(Operação.SOMA)
//teclado.digiteDigito(Digito.UM)
//teclado.digiteDigito(Digito.CINCO)
//teclado.digiteDigito(Digito.DOIS)

// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.QUATRO)

// tela.limpe()
// teclado.digiteDigito(Digito.TRÊS)
// teclado.digiteOperacao(Operação.RAIZ_QUADRADA)

// teclado.digiteOperacao(Operação.DIVISÃO)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.MEMÓRIA_LEITURA_LIMPEZA)
// teclado.digiteOperacao(Operação.SOMA)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.MEMÓRIA_LEITURA_LIMPEZA)


teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteControle(Controle.MEMÓRIA_SOMA)
// teclado.digiteDigito(Digito.UM)


// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO)


// tela.mostreMemoria()
// tela.mostreErro()

function f(value: unknown){
    console.log()
}