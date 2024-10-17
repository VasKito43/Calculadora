import { Digito, Tela } from "./calculadora";

export default class TelaA3 implements Tela{
    mostre(digito: Digito): void {
        switch (digito){
            case Digito.ZERO: 
            console.log(`
0000
0  0
0  0
0  0
0000`);
            break

            case Digito.UM: 
            console.log(`
   1
   1   
   1   
   1   
   1`);
            break
            case Digito.DOIS: 
            console.log(`
2222
   2
2222
2   
2222`);
            break
            case Digito.TRÊS: 
            console.log(`
3333
   3
3333
   3
3333`);
            break
            case Digito.QUATRO: 
            console.log(`
4  4
4  4
4444
   4
   4`);
            break
            case Digito.CINCO: 
            console.log(`
5555
5   
5555
   5
5555`);
            break
            case Digito.SEIS: 
            console.log(`
6666
6   
6666
6  6
6666`);
            break
            case Digito.SETE: 
            console.log(`
7777
   7
   7
   7
   7`);
            break
            case Digito.OITO: 
            console.log(`
8888
8  8
8888
8  8
8888`);
            break
            case Digito.NOVE: 
            console.log(`
9999
9  9
9999
   9
9999`);
            break

        }
        // console.log(digito);
    }
    mostrePonto(): void{
      console.log(`
  **
  **`);
    }
    limpe(): void {
      process.stdout.write('\x1Bc');
    }
    
}