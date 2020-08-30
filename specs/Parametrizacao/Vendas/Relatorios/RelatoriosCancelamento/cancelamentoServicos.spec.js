var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var cancelServicos = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/cancelamentoServicos.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Cancelamento de Serviços', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cancelamento de Serviço');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cancelamento de Serviços', function () {
        cancelServicos.cancelaServicos();
    });
});