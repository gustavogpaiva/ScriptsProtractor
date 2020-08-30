var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasProdutoPeriodo.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas de Produtos no Período (Analítico/Sintético por Unidade)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas de Produtos no Período (Analítico/Sintético por Unidade)');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Vendas de Produtos no Período(Analítico/Sintético por Unidade)', function () {
        vendas.vendProdPeriodo();
    });


});