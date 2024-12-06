import { Sinal, Digito, Controle, Operação } from "./calculadora"
import CpuA3 from "./cpuA3"
import TelaX0Teste from "./telaX0Teste"


describe("Testando minha calculadora", ()=> { //teste 1
    let tela: TelaX0Teste = new TelaX0Teste
    let cpu: CpuA3 = new CpuA3(tela)
    cpu.definaTela(tela)

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

    test("Testar 12+34+56", ()=>{ // teste 2
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

    test("Testar 456-123", ()=>{ //teste 3
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
    
    test("Testar 65-43-21", ()=>{ //teste 4
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
    
    test("Testar 1420/5", ()=>{ //teste 5
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

    test("Testar 12*3", ()=>{ //teste 6
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
    test("Testar 12*3*3", ()=>{ //teste 7
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
    test("Testar 1420/5", ()=>{ //teste 8
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
    test("Testar 12*3*3", ()=>{ //teste 9
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
    test("Testar 100%", ()=>{ //teste 10
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.PERCENTUAL);
        // cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("0")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    test("Testar 123-456", ()=>{//teste 11
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
    test("Testar 100+10%", ()=>{ //teste 12
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SOMA);
            [Digito.UM, Digito.ZERO].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        // cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("110")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    test("Testar 100-10%", ()=>{ //teste 12 + 1
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.SUBTRAÇÃO);
            [Digito.UM, Digito.ZERO].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        // cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("90")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    test("Testar 100*10%", ()=>{ //teste 14
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.MULTIPLICAÇÃO);
            [Digito.UM, Digito.ZERO].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        // cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("10")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    test("Testar 100/10%", ()=>{ //teste 15
        cpu.reinicie();
        [Digito.UM, Digito.ZERO, Digito.ZERO].forEach((element) => {
            cpu.recebaDigito(element);
        });
        cpu.recebaOperacao(Operação.DIVISÃO);
            [Digito.UM].forEach((element) => {
                cpu.recebaDigito(element);
            }); 
        cpu.recebaOperacao(Operação.PERCENTUAL);
        
        // cpu.recebaControle(Controle.IGUAL);
        expect(tela.digitos).toBe("10000")
        expect(tela.sinal).toBe(Sinal.POSITIVO)
        expect(tela.memoria).toBeFalsy()
        expect(tela.error).toBeFalsy()
    })
    test("Testar 123 M+ + 1", ()=>{//teste 16
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
    test("Testar 123 M+ 1", ()=>{//teste 17
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
    test("Testar 123 M+ 1 + 1", ()=>{//teste 18
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
    test("Testar 123 M+ + 1 M+", ()=>{//teste 18
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
    test("Testar 123 = 1 =", ()=>{//teste 18
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
    test("Testar 123 M+ + 1 MRC", ()=>{//teste 18
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
    
    test("Testar 123 M+ + 1 MRC 1", ()=>{//teste 18
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