var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var faturamento = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosFaturamento/faturamentoHoraHora.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Faturamento Hora Hora', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Faturamento Hora Hora');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Faturamento Hora Hora', function () {
        faturamento.faturHora();
    });
});