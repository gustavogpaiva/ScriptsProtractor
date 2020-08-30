var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var manutencao = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/CreditoPessoal/manutencaoContaClienteConsumidorFamilia.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Manutencao Conta Cliente Consumidor por Familia', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Manutenção Conta Cliente/Consumidor por Família');
    });

    afterEach(function () {
       h.sairDoSistema();
    });

    it('Manutencao Conta Cliente Consumidor por Familia', function () {
        manutencao.contaManutencao();
    });
});