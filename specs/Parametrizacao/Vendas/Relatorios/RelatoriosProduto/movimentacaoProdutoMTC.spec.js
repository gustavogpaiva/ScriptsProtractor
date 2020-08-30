var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var mtc = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/movimentacaoProdutoMTC.po.js');
var h = require('../../../../../page-objects/helper.po.js');
var j = require('../../../../../json/leitorJson.po.js');

describe('Testes do relatório da tela Movimentação de Produtos MTC', function () {
	//executa o login o sistema
    beforeAll(function () { 
        loginPage.login();
        h.tela('Movimentação de Produtos MTC');
    });
	
	//sai do sistema
    afterAll(function(){
    	h.sairDoSistema();
    });
    
    it('Emitir um relatório da unidade para um período com produtos movimentados', function(){
    	expect(mtc.emiteRelatorio(j.getValor('periodoComVenda'), j.getValor('nivelAgrupador'), j.getValor('selecaoProdutos'), j.getValor('nivelProdutos'), j.getValor('produtoInicialcadLoja'), j.getValor('produtoFinalcadLoja'))).toBe(true);
    });

    it('Verificar se os produtos estão sendo exibidos uma vez', function(){
        expect(mtc.verificarProdutos()).toBe(true);
    });

    it('Verificar se o rank dos produtos estão classificados pelo valor total', function(){
        expect(mtc.verificarRank()).toBe(true);
    });

    it('Verificar se o valor unitário médio dos produtos estão sendo exibidos', function(){
        expect(mtc.verificarValorUnitMedio()).toBe(true);
    });
});