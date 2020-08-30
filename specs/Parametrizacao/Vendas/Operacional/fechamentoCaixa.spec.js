var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fechamento = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/fechamentoCaixa.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Fechamento de Caixa', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        //paramGerais.tela('Parâmetros Gerais');	
    });
    beforeEach(function () {
        browser.get(browser.params.applicationUrl + '/man/#/man#operation%2Fvnd00600_fechamentocaixa');
    });

    afterAll(function () {
        h.sairDoSistema();

    });

    it('Fechamento de Caixa', function () {
        fechamento.caixa();
    });

});