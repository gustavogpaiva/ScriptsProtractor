var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var teste = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/testeCartaoFidelidade.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Teste de Cartão Fidelidade', function () {

    //executa o login o sistema
    beforeAll(function () {
        loginPage.login();
        h.tela('Teste de Cartões Fidelidade Válidos');
    });

    afterAll(function () {
        h.sairDoSistema();
    });

    it('Cadastro de Cadastro de Beneficio', function () {
        teste.cartaoFidelidade();
        //não da pra validar
    });

});