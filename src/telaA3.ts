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
   private copiaDisplay: String[][]= this.display.slice()
    mostre(digito: Digito): void {
      process.stdout.write('\x1Bc');
      this.display.splice(1, 1);
      this.display.push(this.modelosDigitos[digito].slice())

      console.log("==========================================================================================")
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
           linha += this.display[j][i];
         }
         console.log("||" + linha + "||");

       }
       console.log("==========================================================================================")


    }
    mostreSeparadorDecimal(): void{
      process.stdout.write('\x1Bc');
      
      console.log("==========================================================================================")
      
      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {

            if (i === 4 && j === 8){

               this.display[j][i] = this.display[j][i].slice(0, -3) + "██ ";

            }
            linha += this.display[j][i];
         }
         console.log("||" + linha + "||");


       }
      console.log("==========================================================================================")

    }
    mostreSinal(sinal:Sinal): void {
      process.stdout.write('\x1Bc');
      switch (sinal){
         case Sinal.POSITIVO:
            this.display[0][2] = this.display[0][2].slice(0, -5) + "     "
            break
         case Sinal.NEGATIVO:
            this.display[0][2] = this.display[0][2].slice(0, -5) + "▬▬▬  "
            break
      }
      console.log("==========================================================================================")

      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            linha += this.display[j][i];
         }
         console.log("||" + linha + "||");

       }
      console.log("==========================================================================================")

    }
    mostreMemoria(): void {
      process.stdout.write('\x1Bc');
      this.display[0][1] = this.display[0][1].slice(0, -4) + "M   "
      console.log("==========================================================================================")

      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            linha += this.display[j][i];
         }
         console.log("||" + linha + "||");

       }
       console.log("==========================================================================================")

    }
    mostreErro(): void {
      process.stdout.write('\x1Bc');
      this.display[0][3] = this.display[0][3].slice(0, -4) + "E   "
      console.log("==========================================================================================")

      for (let i = 0; i < 5; i++) {
         let linha = "";
         for (let j = 0; j < this.display.length; j++) {
            linha += this.display[j][i];
         }
         console.log("||" + linha + "||");

       }
       console.log("==========================================================================================")

    }
    limpe(): void {
      this.display = this.copiaDisplay.slice()
      process.stdout.write('\x1Bc');
    }
    
}