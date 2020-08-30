var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var producaoKds = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosKDS/tempoProducaoKDS.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Tempo de Produção KDS', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Tempo de Produção no KDS');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Tempo de Produção no KDS', function () {
        producaoKds.emitirRelatorio();
    });
});