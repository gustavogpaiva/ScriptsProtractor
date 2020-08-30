var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var ajusSalMen = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/ajusteSaldoMensal.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Ajusta Saldo Mensal', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Ajusta Saldo Mensal');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Ajuste de Saldo Mensal', function () {
        expect(ajusSalMen.saldoMensal()).toContain('Ajuste de Saldo foi realizado com sucesso.');
    });

    fit('Ajuste com Campos em Branco', function () {
        expect(ajusSalMen.ajustaBranco()).toContain('Campo obrigatório');
    });
});