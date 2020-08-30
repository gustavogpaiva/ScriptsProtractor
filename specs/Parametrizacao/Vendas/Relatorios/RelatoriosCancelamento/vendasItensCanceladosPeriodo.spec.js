var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var intensCancelados = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/RelatoriosCancelamento/vendasItensCanceladosPeriodo.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Vendas Itens Cancelados no Periodo', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Vendas/Itens Cancelados no Período');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Vendas itens Cancelados no Periodo', function () {
        intensCancelados.cancelaItensPer();
    });
});