var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var vendas = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasNivelProduto.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas por Nível de Produto', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas por Nível de Produto');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Vendas por Nível de Produto', function () {
        vendas.vendasNivelProd();
    });
});