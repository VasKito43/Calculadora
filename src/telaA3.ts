import { Digito, Sinal, Tela } from "./calculadora";

// limitar 8 digitos, borda tela, problema numero flutuante

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
   private display: String[][] = [
      [
         "      ",
         "      ",
         "      ",
         "      ",
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
   private copiaDigitosLimpos: String[][]= this.display.slice()
    mostre(digito: Digito): void {
      process.stdout.write('\x1Bc');
      this.display.splice(1, 1);
      this.display.push(this.modelosDigitos[digito])

      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
           linha += this.display[j][i];
         }
         console.log(linha);
       }

    }
    mostreSeparadorDecimal(): void{
      process.stdout.write('\x1Bc');
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            if (i === 4 && j === this.display.length-1){
               this.display[j][i] = this.display[j][i].slice(0, -3) + "██ ";
            }
            linha += this.display[j][i];
         }
         console.log(linha);
       }
    }
    mostreSinal(sinal:Sinal): void {
      process.stdout.write('\x1Bc');
      this.display[0][2] = this.display[0][2].slice(0, -5) + "▬▬▬  "
      // console.log(this.digitos[0][3])
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            linha += this.display[j][i];
         }
         console.log(linha);
       }
    }
    mostreMemoria(): void {
      process.stdout.write('\x1Bc');
      this.display[0][1] = this.display[0][1].slice(0, -4) + "M   "
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            linha += this.display[j][i];
         }
         console.log(linha);
       }
    }
    mostreErro(): void {
      process.stdout.write('\x1Bc');
      this.display[0][3] = this.display[0][3].slice(0, -4) + "E   "
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            linha += this.display[j][i];
         }
         console.log(linha);
       }
    }
    limpe(): void {
      this.display = this.copiaDigitosLimpos.slice()
      process.stdout.write('\x1Bc');
      // console.log("---------------------")
    }
    
}