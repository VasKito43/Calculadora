import { Digito , Controle, Operação} from "./calculadora";
import CpuA3 from "./cpuA3";
import TecladoA3 from "./tecladoA3";
import TelaA3 from "./telaA3";



//liga e desliga, renicie, erro, 8 digitos
// manter m na tela quando executa operação, salvar na copia

const tela = new TelaA3
const cpu = new CpuA3(tela);
const teclado = new TecladoA3(cpu);
tela.mostre(Digito.ZERO)


// 2+9raiz = 5
// 9 raiz mostra 3

// 2+9 = (11)
// 3 = (12)


// // tela.limpe()
// tela.mostre(Digito.ZERO)
// // tela.limpe()
// tela.mostre(Digito.UM)
// teclado.digiteDigito(Digito.UM)

// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
teclado.digiteDigito(Digito.DOIS)
teclado.digiteOperacao(Operação.SOMA)
teclado.digiteDigito(Digito.NOVE)
teclado.digiteOperacao(Operação.RAIZ_QUADRADA)
// teclado.digiteOperacao(Operação.RAIZ_QUADRADA)
teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteDigito(Digito.TRÊS)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteDigito(Digito.ZERO)
// teclado.digiteDigito(Digito.ZERO)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteDigito(Digito.SETE)
// teclado.digiteDigito(Digito.SEIS)
// teclado.digiteDigito(Digito.CINCO)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteDigito(Digito.TRÊS)
// teclado.digiteControle(Controle.MEMÓRIA_SOMA)
// teclado.digiteDigito(Digito.CINCO)
// teclado.digiteOperacao(Operação.MULTIPLICAÇÃO)

// teclado.digiteOperacao(Operação.DIVISÃO)
// teclado.digiteDigito(Digito.ZERO)
// teclado.digiteDigito(Digito.CINCO)
// teclado.digiteDigito(Digito.DOIS)

// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteDigito(Digito.QUATRO)

// tela.limpe()
// teclado.digiteDigito(Digito.TRÊS)
// teclado.digiteOperacao(Operação.RAIZ_QUADRADA)

// teclado.digiteOperacao(Operação.DIVISÃO)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO)
// teclado.digiteDigito(Digito.UM)
// teclado.digiteControle(Controle.MEMÓRIA_LEITURA_LIMPEZA)
// teclado.digiteControle(Controle.MEMÓRIA_SOMA)

// teclado.digiteDigito(Digito.UM)

// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.SEPARADOR_DECIMAL)
// teclado.digiteDigito(Digito.DOIS)
// teclado.digiteControle(Controle.MEMÓRIA_SOMA)

// teclado.digiteControle(Controle.IGUAL)
// teclado.digiteControle(Controle.ATIVAÇÃO_LIMPEZA_ERRO)
// teclado.digiteDigito(Digito.DOIS)

// teclado.digiteControle(Controle.DESATIVAÇÃO)

