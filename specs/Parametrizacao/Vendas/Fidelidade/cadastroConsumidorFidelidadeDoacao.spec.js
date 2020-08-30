var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var fidelidade = require('../../../../page-objects/Parametrizacao/Vendas/Fidelidade/cadastroConsumidorFidelidadeDoacao.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da tela Cadastro de Consumidores Fidelidade Para Doação ', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Cadastro de Consumidores Fidelidade Para Doação');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Cadastro Camapanha de Fidelidade', function () {
        fidelidade.cadFidelidade();
        //esta suite não possuí informações necessarias pra ser completa ainda script básico
        // (26/09/2018)

    });
});