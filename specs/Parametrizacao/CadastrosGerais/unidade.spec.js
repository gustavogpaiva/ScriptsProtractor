var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var unidade = require('../../../../page-objects/Parametrizacao/CadastrosGerais/unidade.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Unidade', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
    });
    beforeEach(function () {
        browser.get(browser.params.applicationUrl + '/cadEst/#/cadEst#ger01700_unidade');
    });

    afterAll(function () {
 
    });

    it('Cadastro de Unidade', function () {
        unidade.cadUnidade();
    });
});
