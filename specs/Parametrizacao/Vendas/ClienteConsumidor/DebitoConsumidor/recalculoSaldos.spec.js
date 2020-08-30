var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var calculosSaldos = require('../../../../../page-objects/Parametrizacao/Vendas/ClienteConsumidor/DebitoConsumidor/recalculoSaldos.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Recalculos de Saldos', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Recálculo de Saldos');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Recalculos de Saldos', function () {
        expect(calculosSaldos.calcularSaldos()).toContain('Saldos Alterados com Sucesso!');
    });

    it('Recálculo com campos em branco', function () {
        expect(calculosSaldos.calculaBranco()).toContain('Preencha os campos necessários');
    });
});