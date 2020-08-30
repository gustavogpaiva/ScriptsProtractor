var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fechamento = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/fechamentoCupom.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Fechamento de Cupom', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Fechamento de Cupom');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Fechamento de Cupom', function () {
        fechamento.cupom();
        //fechamento.visualizaCupom();
        expect(browser.getCurrentUrl()).toBe('https://manage.teknisa.com/man/#/man#operation%2Fger97101_fechamento_cupom');
    });
    //na base do saas ainda nao existe cupons para validação 
});