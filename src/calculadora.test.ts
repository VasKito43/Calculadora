import { Sinal, Digito, Controle, Operação } from "./calculadora"
import CpuA3 from "./cpuA3"
import TelaX0Teste from "./telaX0Teste"


describe("Testando minha calculadora", ()=> { 
    let tela: TelaX0Teste = new TelaX0Teste
    let cpu: CpuA3 = new CpuA3(tela)
    cpu.definaTela(tela)

    //Teste Bruno
    test("Testar 123+456", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("579")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Bruno
    test("Testar 12+34+56", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.UM, Digito.DOIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.TRÊS, Digito.QUATRO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("102")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Bruno
    test("Testar 456-123", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("333")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Bruno
    test("Testar 65-43-21", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.SEIS, Digito.CINCO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
        [Digito.QUATRO, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
        [Digito.DOIS, Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("1")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    
    //Teste Bruno
    test("Testar 1420/5", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.UM, Digito.QUATRO, Digito.DOIS, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.DIVISÃO);
        [Digito.CINCO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("284")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Bruno
    test("Testar 12*3", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.UM, Digito.DOIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
        [Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("36")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 12*3*3", ()=>{ 
        cpu.reinicie();
        [Digito.UM, Digito.DOIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
        [Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
        [Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("108")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 1420/5 = /4", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.UM, Digito.QUATRO, Digito.DOIS, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.DIVISÃO);
        [Digito.CINCO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.DIVISÃO);
        [Digito.QUATRO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("71")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 12*3*3", ()=>{
        cpu.reinicie();
        [Digito.NOVE].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.RAIZ_QUADRADA);
        expect(tela.digitos).toBe("3")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    
    //Teste Eduardo
    test("Testar 100%", ()=>{
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.PERCENTUAL);
        expect(tela.digitos).toBe("0")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 123-456", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
        [Digito.QUATRO, Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("333")
        expect(tela.sinal).toBe(Sinal.NEGATIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 4.56+1.23", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.QUATRO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });        
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });  
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("5.79")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 4.56 x 1.23", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.QUATRO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });        
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });  
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("5.6088")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 4.56-1.23", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.QUATRO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });        
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });  
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("3.33")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 4.56/1.2", ()=>{
        cpu.reinicie();
        tela.limpe();

        [Digito.QUATRO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.CINCO, Digito.SEIS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.DIVISÃO);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });        
        cpu.recebaControle(Controle.SEPARADOR_DECIMAL);
        [Digito.DOIS].forEach((element) => {
            cpu.recebaDigito(element);
        });  
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("3.8")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 100+10%", ()=>{
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
            [Digito.UM, Digito.ZERO].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        expect(tela.digitos).toBe("110")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 100-10%", ()=>{
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
            [Digito.UM, Digito.ZERO].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        expect(tela.digitos).toBe("90")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 100*10%", ()=>{
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
            [Digito.UM, Digito.ZERO].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        expect(tela.digitos).toBe("10")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 100/10%", ()=>{
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.DIVISÃO);
            [Digito.UM].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        expect(tela.digitos).toBe("10000")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 123 M+ + 1", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA)
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("124")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 123 M+ 1", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("1")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 123 M+ 1 + 1", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("2")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 123 M+ + 1 M+", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA);
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA);
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("124")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Gabriel
    test("Testar 123 = 1 =", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("1")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })

    //Teste Eduardo
    test("Testar 123 M+ + 1 MRC", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA);
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA);
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("246")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })
    
    //Teste Gabriel
    test("Testar 123 M+ + 1 MRC 1", ()=>{
        cpu.reinicie();
        tela.limpe();
        [Digito.UM, Digito.DOIS, Digito.TRÊS].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_SOMA);
        cpu.recebaOperacao(Operação.SOMA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.MEMÓRIA_LEITURA_LIMPEZA);
        [Digito.UM].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("124")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeTruthy()
        expect(tela.error).toBeFalsy()
    })
    
})