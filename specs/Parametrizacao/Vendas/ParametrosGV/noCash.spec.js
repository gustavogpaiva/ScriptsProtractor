var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var nCash = require('../../../../page-objects/Parametrizacao/Vendas/ParametrosGV/noCash.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela No Cash', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();	
        h.tela('No Cash');
    });
    
    afterEach(function () {
      h.sairDoSistema();
    });

    it('No Cash', function () {
        nCash.nocash();
    });
});
