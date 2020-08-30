var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../page-objects/login.po.js');
var manutecao = require('../../../../page-objects/Parametrizacao/Vendas/Operacional/manutencaoLancamentoCaixa.po.js');
var h = require('../../../../page-objects/helper.po.js');

describe('Testes da Tela Manutenção dos Lançamentos de Caixa', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Manutenção dos Lançamentos do Caixa');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Manutenção dos Lançamentos de Caixa', function () {
        manutecao.lancamento();
        //não é possivel validar, foi aberto issue para adição de validação
    });
});