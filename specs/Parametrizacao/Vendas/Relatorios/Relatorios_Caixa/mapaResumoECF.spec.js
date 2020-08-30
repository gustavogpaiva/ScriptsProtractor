var ZeedhiAPIConstructor = require('zeedhi-functional-test-api');
var z = new ZeedhiAPIConstructor(browser, protractor);
var loginPage = require('../../../../../page-objects/login.po.js');
var mapaResumoECF = require('../../../../../page-objects/Parametrizacao/Vendas/Relatorios/Relatorios_Caixa/mapaResumoECF.po.js');
var h = require('../../../../../page-objects/helper.po.js');

describe('Testes da Tela Mapa Resumo ECF (Relatório)', function () {

    //executa o login o sistema
    beforeEach(function () {
        loginPage.login();
        h.tela('Mapa Resumo ECF');
    });

    afterEach(function () {
        h.sairDoSistema();
    });

    it('Gerar Relatório de Mapa Resumo ECF', function () {
        mapaResumoECF.resumoECF();
    });
});