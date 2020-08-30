var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var lojaSemMovimentacao = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/EstatisticasGerais/lojaSemMovimentacao.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

describe('Testes do relatório da tela Lojas Sem Movimentação', function () {

    //executa o login o sistema
    beforeAll(function () { 
        loginPage.login();
        h.tela('Lojas Sem Movimentação');
    });
    //sai do sistema
    afterAll(function(){
    	h.sairDoSistema();
    });

    it('Emitir relatório da unidade para um período sem movimentação', function () {
        expect(lojaSemMovimentacao.emiteRelatorio(j.getValor('periodoSemVenda'), j.getValor('grupoFilial'))).toBe(true);
    });

    it('Exibir lojas sem movimentação', function() {
    	expect(lojaSemMovimentacao.exibeLojas(j.getValor('filial'), j.getValor('cdloja'), j.getValor('grupoFilial'), j.getValor('cidadeFilial'), j.getValor('periodoSemVenda'))).toBe(true);
    });

    it('Emitir relatório da unidade para um período com movimentação', function() {
    	expect(lojaSemMovimentacao.emiteRelatorio(j.getValor('periodoComVenda'), j.getValor('grupoFilial'))).toContain('Não há registros');
    });
});