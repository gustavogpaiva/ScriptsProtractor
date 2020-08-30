var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var observacaoCancelamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/observacaoCancelamento.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Observação de Cancelamento', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Observação de Cancelamento');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Observação de Cancelamento', function () {
        observacaoCancelamento.obsCancelamento();
    });
});