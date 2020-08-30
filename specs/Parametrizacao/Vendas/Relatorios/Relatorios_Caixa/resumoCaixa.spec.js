const loginPage = require('../../../../../page-objects/login.po.js');
const resumoCaixa = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/resumoCaixa.po.js');
const h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Resumo do Caixa (Relatório)', () => {
    
    //executa o login o sistema
    beforeEach(() =>  {
        loginPage.login();
        h.tela('Resumo do Caixa');
    });
    
    afterEach(() => h.sairDoSistema());
    
    it('Relatório de Resumo do Caixa (Resumo da Movimentação do Caixa (RMC))', () => expect(resumoCaixa.emitirRelatorio('caixaRMC')).toBe(true));
    
    it('Relatório de Resumo do Caixa (Comparativo Fechamento Caixa (RFC))', () => expect(resumoCaixa.emitirRelatorio('caixaRFC')).toBe(true));
    
    it('Relatório de Resumo do Caixa (Comparativo Fechamento Caixa (RFC - NFC-e/SAT))', () => expect(resumoCaixa.emitirRelatorio('caixaRfcNFCSAT')).toBe(true));
    
    it('Relatório de resumo do Caixa (Resumo da Movimentação do Caixa (RMC - NFCe/SAT))', () => expect(resumoCaixa.emitirRelatorio('caixaRmcNFCESAT')).toBe(true));
});