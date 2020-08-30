var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var transferencia = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/transferenciaMovimentacao.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da tela de Transferência de Movimentação', function () {

    beforeEach(function () {
        loginPage.login();
        h.tela('Transferência de Movimentação');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Transferência de Movimentação', function () {
        transferencia.saldo();
    });
    //precisa ter vendas pra funcionar
});