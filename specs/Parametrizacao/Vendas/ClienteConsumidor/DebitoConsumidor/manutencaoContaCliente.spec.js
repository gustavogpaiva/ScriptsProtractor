var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var manutencao = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/manutencaoContaCliente.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Manutenção Conta Cliente/Consumidor', function () {
    
    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Manutenção de Conta Cliente/ Consumidor');
    });
    
    afterEach(function () {
        h.sairDoSistema();
    });
    
    it('Manutenção Conta Cliente/Consumidor', function () {
        expect(manutencao.contaManutencao()).toContain('1 row(s) persisted with success');
    });
});