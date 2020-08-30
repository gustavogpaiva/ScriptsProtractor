var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var cancelamentoIten = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoItens.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Cancelamento de Itens', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cancelamento de Itens');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cancelamento de Itens', function () {
        cancelamentoIten.cancelaItens();
    });
});