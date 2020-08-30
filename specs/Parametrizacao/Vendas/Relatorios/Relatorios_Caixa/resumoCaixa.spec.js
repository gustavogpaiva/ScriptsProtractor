var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var resumoCaixa = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/resumoCaixa.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Resumo do Caixa (Relatório)', function () {
    
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Resumo do Caixa');
    });
    
    afterEach(function () {
        h.sairDoSistema();
    });
    
    it('Relatório de Resumo do Caixa (Resumo da Movimentação do Caixa (RMC))', function () {
        resumoCaixa.resCaixaRMC();
    });
    
    /*it('Relatório de Resumo do Caixa (Comparativo Fechamento Caixa (RFC))', function(){
        resumoCaixa.resCaixaRFC();
    });
    
    it('Relatório de Resumo do Caixa (Comparativo Fechamento Caixa (RFC - NFC-e/SAT))', function(){
        resumoCaixa.resCaixaRfcNFCSAT();
    });
    
    it('Relatório de resumo do Caixa (Resumo da Movimentação do Caixa (RMC - NFCe/SAT))',function(){
        resumoCaixa.resCaixaRmcNFCESAT();
    });   
    
    o teste não consegue executar os 4 its quando gera relatorio birt
    */
});