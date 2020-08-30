var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var relaCuponsSatNfce = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosVenda/relacaoCuponsSatNfce.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Relação Cupons SAT/NFC-e', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Relação Cupons SAT/NFC-e ');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Relação Cupons SAT/NFC-e', function () {
        relaCuponsSatNfce.relatorio();
    });


});