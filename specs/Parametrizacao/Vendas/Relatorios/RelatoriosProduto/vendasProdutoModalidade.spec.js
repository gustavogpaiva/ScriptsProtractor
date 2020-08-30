var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var modalidade = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosProduto/vendasProdutoModalidade.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas de Produto no Período por Modalidade', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas Produto por Modalidade')
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Vendas de Produto no Período por Modalidade', function () {
        modalidade.vendasProdModalidade();
    });
});