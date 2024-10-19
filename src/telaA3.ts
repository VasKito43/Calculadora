import { Digito, Sinal, Tela } from "./calculadora";

export default class TelaA3 implements Tela{
   private modelosDigitos = {
      [Digito.ZERO]: [
          " █████    ",
          " ██ ██    ",
          " ██ ██    ",
          " ██ ██    ",
          " █████    "
      ],
      [Digito.UM]: [
          "    ██    ",
          "    ██    ",
          "    ██    ",
          "    ██    ",
          "    ██    " 
      ],   
      [Digito.DOIS]: [
          " █████    ",
          "    ██    ",
          " █████    ",
          " ██       ",
          " █████    "
      ],
      [Digito.TRÊS]: [
          " █████    ",
          "    ██    ",
          " █████    ",
          "    ██    ",
          " █████    "
      ],
      [Digito.QUATRO]: [
          " ██ ██    ",
          " ██ ██    ",
          " █████    ",
          "    ██    ",
          "    ██    "
      ],
      [Digito.CINCO]: [
          " █████    ",
          " ██       ",
          " █████    ",
          "    ██    ",
          " █████    "
      ],
      [Digito.SEIS]: [
          " █████    ",
          " ██       ",
          " █████    ",
          " ██ ██    ",
          " █████    "
      ],
      [Digito.SETE]: [
          " █████    ",
          "    ██    ",
          "    ██    ",
          "    ██    ",
          "    ██    "
      ],
      [Digito.OITO]: [
          " █████    ",
          " ██ ██    ",
          " █████    ",
          " ██ ██    ",
          " █████    "
      ],
      [Digito.NOVE]: [
          " █████    ",
          " ██ ██    ",
          " █████    ",
          "    ██    ",
          " █████    "
      ]
  };
   private digitos: String[][] = [
      [
         "      ",
         "  M   ",
         "      ",
         "  E   ",
         "      "
     ],
     [
      "          ",
      "          ",
      "          ",
      "          ",
      "          " 
     ],
     [
      "          ",
      "          ",
      "          ",
      "          ",
      "          " 
      ],
      [
         "          ",
         "          ",
         "          ",
         "          ",
         "          " 
      ],
      [
         "          ",
         "          ",
         "          ",
         "          ",
         "          " 
      ],
      [
         "          ",
         "          ",
         "          ",
         "          ",
         "          " 
      ],
      [
         "          ",
         "          ",
         "          ",
         "          ",
         "          " 
      ],
      [
         "          ",
         "          ",
         "          ",
         "          ",
         "          " 
      ],
      [
         "          ",
         "          ",
         "          ",
         "          ",
         "          " 
      ]
     
   ]
   private copiaDigitosLimpos: String[][]= this.digitos.slice()
    mostre(digito: Digito): void {
      // process.stdout.write('\x1Bc');
      this.digitos.splice(1, 1);
      this.digitos.push(this.modelosDigitos[digito])

      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.digitos.length; j++) {
           linha += this.digitos[j][i];
         }
         console.log(linha);
       }

    }
    mostreSeparadorDecimal(): void{
      // process.stdout.write('\x1Bc');
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.digitos.length; j++) {
            if (i === 4 && j === this.digitos.length-1){
               this.digitos[j][i] = this.digitos[j][i].slice(0, -3) + "██ ";
            }
            linha += this.digitos[j][i];
         }
         console.log(linha);
       }
    }
    mostreSinal(sinal:Sinal): void {
      // process.stdout.write('\x1Bc');
      this.digitos[0][2] = this.digitos[0][2].slice(0, -5) + "▬▬▬  "
      // console.log(this.digitos[0][3])
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.digitos.length; j++) {
            linha += this.digitos[j][i];
         }
         console.log(linha);
       }
    }
    mostreMemoria(): void {
       console.log("memoria")
    }
    mostreErro(): void {
       console.log("")
    }
    limpe(): void {
      this.digitos = this.copiaDigitosLimpos.slice()
      // process.stdout.write('\x1Bc');
      // console.log("---------------------")
    }
    
}